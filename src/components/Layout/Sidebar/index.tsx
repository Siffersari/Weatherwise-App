import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import {
  FiMenu,
  FiGrid,
  FiMap,
  FiCalendar,
  FiSettings,
  FiLogOut,
  FiX,
} from "react-icons/fi";
import logo from "../../../assets/images/logo.png";
import "./Sidebar.scss";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("no-scroll", isOpen);
  };

  const closeSidebar = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    setIsOpen(false);
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div>
      <button className="menu-button" onClick={toggleSidebar}>
        <FiMenu className="menu-icon" />
      </button>
      <nav className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="logo-container">
          <img src={logo} alt="Weatherwise Logo" />
          <span className="logo-title">Weatherwise</span>
        </div>
        <ul className="nav-items">
          <li className="nav-item active">
            <FiGrid className="icon" />
            <FormattedMessage
              id="sidebar.dashboard"
              defaultMessage="Dashboard"
            />
          </li>
          <li className="nav-item">
            <FiMap className="icon" />
            <FormattedMessage id="sidebar.map" defaultMessage="Map" />
          </li>
          <li className="nav-item">
            <FiCalendar className="icon" />
            <FormattedMessage id="sidebar.calendar" defaultMessage="Calendar" />
          </li>
          <li className="nav-item">
            <FiSettings className="icon" />
            <FormattedMessage id="sidebar.settings" defaultMessage="Settings" />
          </li>
          <li className="nav-item">
            <FiLogOut className="icon" />
            <FormattedMessage id="sidebar.logout" defaultMessage="Log Out" />
          </li>
        </ul>
      </nav>

      {isOpen && (
        <div className="overlay" onClick={toggleSidebar}>
          <button className="close-button" onClick={closeSidebar}>
            <FiX className="close-icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
