import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import "antd/dist/antd.css";
import { HelmetProvider } from "react-helmet-async";
import Router from "./router";
import i18n from "./translation";

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Router />
      </I18nextProvider>
    </BrowserRouter>
  </HelmetProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));