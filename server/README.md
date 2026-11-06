# Enquiry email endpoint deployment

The React form posts to `/api/enquiry.php`. The endpoint sends mail through Hostinger SMTP to the fixed recipient `ravindra@hyderabadpropertyconsultants.com`. Visitor email is used only as Reply-To. The separate sticky WhatsApp chat is unchanged.

## Hostinger setup

Use PHP 8.1 or newer. Keep the mailer dependency and SMTP configuration outside `public_html`:

1. Create `/home/ACCOUNT/private` (the directory parallel to `public_html`).
2. Copy `server/composer.json` to `/home/ACCOUNT/private/composer.json`, then run `composer install --no-dev --prefer-dist` from that directory. This installs PHPMailer at `/home/ACCOUNT/private/vendor`.
3. Copy `server/enquiry-config.example.php` to `/home/ACCOUNT/private/enquiry-config.php`. Set `smtp_username` to a mailbox created in Hostinger Email and `smtp_password` to that mailbox's password. Keep this file private and set its permissions to `600` where supported. Never put real credentials in the repository or website files.
4. Build the site with `npm run build` and upload the **contents** of `dist` to `public_html`. This includes `api/enquiry.php` and the generated React assets.
5. Confirm `https://YOUR-DOMAIN/api/enquiry.php` returns `405` to a GET request. Do not copy the `private` directory into `public_html`.
6. Submit a test enquiry with a mailbox you can check. The endpoint reports success only after Hostinger SMTP accepts the message; also check spam. Invalid fields should return `422`, rate-limited requests `429`, and missing/bad SMTP setup or send failures a non-success response.

The endpoint validates all required fields and allowed dropdown values, checks same-origin browser requests, ignores the client-supplied recipient, includes a honeypot, and limits each IP to five requests per 15 minutes. Server logs contain mailer failure details; API responses do not disclose SMTP settings.

## Local checks

With PHP available, run `php -l public/api/enquiry.php`. The production build copies this endpoint to `dist/api/enquiry.php`.

To exercise the endpoint locally, create an ignored `private` directory at the repository root, copy `server/composer.json` there, install its dependencies, and create `private/enquiry-config.php` from the example. Then run `php -S 127.0.0.1:8089 -t dist` and submit the local form. Using real SMTP credentials sends real email. Do not report a successful email test until the message is received.
