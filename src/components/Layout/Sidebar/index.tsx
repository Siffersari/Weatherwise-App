import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FiMap, FiCalendar, FiSettings, FiLogOut, FiGrid } from 'react-icons/fi';
import logo from '../../../assets/images/logo.png';
import './Sidebar.scss';

const Sidebar: React.FC = () => {
  return (
    <nav className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="Weatherwise Logo" />
        <span className="logo-title">Weatherwise</span>
      </div>
      <ul className="nav-items">
        <li className="nav-item active">
          <FiGrid className="icon" />
          <FormattedMessage id="sidebar.dashboard" defaultMessage="Dashboard" />
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
  );
};

export default Sidebar;
