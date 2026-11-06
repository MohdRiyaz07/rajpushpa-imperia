<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_SLASHES);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['success' => false, 'message' => 'Method not allowed.']);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $originHost = strtolower((string) parse_url($origin, PHP_URL_HOST));
    $requestHost = strtolower((string) preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? ''));
    if ($originHost === '' || $requestHost === '' || !hash_equals($requestHost, $originHost)) {
        respond(403, ['success' => false, 'message' => 'Request not allowed.']);
    }
}

$contentType = strtolower(trim(explode(';', $_SERVER['CONTENT_TYPE'] ?? '')[0]));
if ($contentType !== 'application/json') {
    respond(415, ['success' => false, 'message' => 'JSON request body required.']);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 16384) {
    respond(413, ['success' => false, 'message' => 'Request is too large.']);
}

$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody === false ? '' : $rawBody, true);
if (!is_array($data) || json_last_error() !== JSON_ERROR_NONE) {
    respond(400, ['success' => false, 'message' => 'Invalid request body.']);
}

$textField = static function (string $key, int $maxLength) use ($data): ?string {
    $value = $data[$key] ?? null;
    if (!is_string($value)) {
        return null;
    }

    $value = trim((string) preg_replace('/[\x00-\x1F\x7F]/u', ' ', $value));
    if ($value === '' || strlen($value) > $maxLength) {
        return null;
    }

    return $value;
};

if (!empty($data['website'])) {
    respond(422, ['success' => false, 'message' => 'Invalid enquiry.']);
}

$name = $textField('name', 120);
$phone = $textField('phone', 40);
$email = $textField('email', 254);
$configuration = $textField('configuration', 4);
$facing = $textField('preferredFacing', 10);
$enquiryType = $textField('enquiryType', 40);
$details = $data['enquiryDetails'] ?? '';
if (!is_string($details) || strlen($details) > 500) {
    respond(422, ['success' => false, 'message' => 'Invalid enquiry details.']);
}
$details = trim((string) preg_replace('/[\x00-\x1F\x7F]/u', ' ', $details));

$allowedConfigurations = ['1350', '1550', '1720', '2045', '2550', '2880'];
$allowedFacings = ['East', 'West', 'North'];
$allowedTypes = [
    'General Enquiry',
    'Floor Plan Request',
    'Price Sheet Request',
    'Project Details Request',
];
$phoneDigits = is_string($phone) ? preg_replace('/\D/', '', $phone) : '';

if (
    $name === null
    || $phone === null
    || strlen((string) $phoneDigits) < 10
    || strlen((string) $phoneDigits) > 15
    || $email === null
    || filter_var($email, FILTER_VALIDATE_EMAIL) === false
    || $configuration === null
    || !in_array($configuration, $allowedConfigurations, true)
    || $facing === null
    || !in_array($facing, $allowedFacings, true)
    || $enquiryType === null
    || !in_array($enquiryType, $allowedTypes, true)
    || ($data['consent'] ?? null) !== true
) {
    respond(422, ['success' => false, 'message' => 'Please check the enquiry details and try again.']);
}

$rateLimitFile = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR)
    . DIRECTORY_SEPARATOR
    . 'rajpushpa-enquiry-'
    . hash('sha256', __DIR__ . '|' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'))
    . '.json';
$rateLimitHandle = @fopen($rateLimitFile, 'c+');
if ($rateLimitHandle === false || !flock($rateLimitHandle, LOCK_EX)) {
    if (is_resource($rateLimitHandle)) {
        fclose($rateLimitHandle);
    }
    error_log('Rajpushpa enquiry rate limiter is unavailable.');
    respond(503, ['success' => false, 'message' => 'Enquiries are temporarily unavailable. Please try again later.']);
}

$rateLimitRaw = stream_get_contents($rateLimitHandle);
$timestamps = json_decode($rateLimitRaw === false ? '' : $rateLimitRaw, true);
if (!is_array($timestamps)) {
    $timestamps = [];
}
$now = time();
$timestamps = array_values(array_filter(
    $timestamps,
    static fn ($timestamp): bool => is_int($timestamp) && $timestamp > $now - 900
));
if (count($timestamps) >= 5) {
    flock($rateLimitHandle, LOCK_UN);
    fclose($rateLimitHandle);
    respond(429, ['success' => false, 'message' => 'Too many enquiries. Please try again later.']);
}
$timestamps[] = $now;
rewind($rateLimitHandle);
ftruncate($rateLimitHandle, 0);
$written = fwrite($rateLimitHandle, json_encode($timestamps));
fflush($rateLimitHandle);
flock($rateLimitHandle, LOCK_UN);
fclose($rateLimitHandle);
if ($written === false) {
    error_log('Rajpushpa enquiry rate limiter could not write its state.');
    respond(503, ['success' => false, 'message' => 'Enquiries are temporarily unavailable. Please try again later.']);
}

$privateDirectory = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'private';
$autoloadPath = $privateDirectory . DIRECTORY_SEPARATOR . 'vendor'
    . DIRECTORY_SEPARATOR . 'autoload.php';
$configPath = $privateDirectory . DIRECTORY_SEPARATOR . 'enquiry-config.php';
if (!is_file($autoloadPath) || !is_file($configPath)) {
    error_log('Rajpushpa enquiry mailer configuration is missing outside the document root.');
    respond(503, ['success' => false, 'message' => 'Enquiries are temporarily unavailable. Please try again later.']);
}

require $autoloadPath;
$config = require $configPath;
if (
    !is_array($config)
    || !isset($config['smtp_username'], $config['smtp_password'])
    || !is_string($config['smtp_username'])
    || !is_string($config['smtp_password'])
    || filter_var($config['smtp_username'], FILTER_VALIDATE_EMAIL) === false
    || $config['smtp_password'] === ''
) {
    error_log('Rajpushpa enquiry mailer configuration is invalid.');
    respond(503, ['success' => false, 'message' => 'Enquiries are temporarily unavailable. Please try again later.']);
}

try {
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.com';
    $mail->SMTPAuth = true;
    $mail->Username = $config['smtp_username'];
    $mail->Password = $config['smtp_password'];
    $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
    $mail->CharSet = PHPMailer\PHPMailer\PHPMailer::CHARSET_UTF8;
    $mail->XMailer = '';
    $mail->setFrom(
        $config['smtp_username'],
        is_string($config['from_name'] ?? null) ? $config['from_name'] : 'Rajapushpa Imperia Website'
    );
    $mail->addAddress('ravindra@hyderabadpropertyconsultants.com');
    $mail->addReplyTo($email, $name);
    $mail->Subject = 'New property enquiry: ' . $name;
    $mail->Body = implode("\n", [
        'Hello,',
        '',
        'A new enquiry was submitted through the Rajapushpa Imperia website.',
        '',
        'Enquirer: ' . $name,
        'Phone number: ' . $phone,
        'Email address: ' . $email,
        'Apartment size: ' . $configuration . ' square feet',
        'Preferred facing: ' . $facing,
        'Enquiry type: ' . $enquiryType,
        '',
        'Additional message:',
        $details !== '' ? $details : 'No additional request details were provided.',
        '',
        'Reply to this email to contact the enquirer.',
    ]);
    $mail->send();
} catch (Throwable $error) {
    error_log('Rajpushpa enquiry email failed: ' . $error->getMessage());
    respond(502, ['success' => false, 'message' => 'We could not send your enquiry. Please try again.']);
}

respond(200, ['success' => true, 'message' => 'Enquiry accepted for delivery.']);
