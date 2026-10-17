import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { EnquiryProvider } from "./components/Enquiry";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EnquiryProvider>
      <App />
    </EnquiryProvider>
  </StrictMode>
);
