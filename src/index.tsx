import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'; // Import createRoot instead
import { I18nextProvider } from "react-i18next";
import "antd/dist/antd.css";

import Router from "./router";
import i18n from "./translation";

const App = () => (
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <Router />
    </I18nextProvider>
  </BrowserRouter>
);

// Get the root element
const rootElement = document.getElementById("root");

// Make sure the element exists
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

// Create a root
const root = createRoot(rootElement);

// Render your app
root.render(<App />);