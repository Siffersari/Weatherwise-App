import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { IntlProvider } from "react-intl";
import English from "./locales/en.json";
import Swahili from "./locales/sw.json";

interface LocaleContextType {
  locale: string;
  setLocale: React.Dispatch<React.SetStateAction<string>>;
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export const LocaleContext = React.createContext<LocaleContextType | null>(
  null
);

const Main = () => {
  const [locale, setLocale] = useState("en");
  const messages = locale === "sw" ? Swahili : English;

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider locale={locale} messages={messages}>
        <App />
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

reportWebVitals();
