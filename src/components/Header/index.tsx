import React, { useContext, FC } from "react";
import { LocaleContext } from "../..";
import { FormattedMessage } from "react-intl";
import { FiGlobe } from "react-icons/fi";
import "./Header.scss";

interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
}

const Header: FC = () => {
  const localeContext = useContext(LocaleContext) as LocaleContextType;

  if (!localeContext) return null;

  const toggleLanguage = () => {
    localeContext.setLocale(localeContext.locale === "en" ? "sw" : "en");
  };

  return (
    <header className="header">
      <div className="greeting">
        <FormattedMessage
          id="greeting.morning"
          defaultMessage="Good morning,"
        />
        <span className="greeting-subtext">
          <FormattedMessage
            id="greeting.subtext"
            defaultMessage="here is how your day looks like!"
          />
        </span>
      </div>
      <button className="language-switcher" onClick={toggleLanguage}>
        <FiGlobe className="icon" />
        <FormattedMessage
          id={
            localeContext.locale === "en"
              ? "switchToSwahili"
              : "switchToEnglish"
          }
        />
      </button>
    </header>
  );
};

export default Header;
