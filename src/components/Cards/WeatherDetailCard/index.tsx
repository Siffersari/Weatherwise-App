import React, { ReactElement } from "react";
import "./WeatherDetailCard.scss";

interface WeatherCardProps {
  title: string;
  icon?: string;
  children: ReactElement | ReactElement[];
}

const WeatherCard: React.FC<WeatherCardProps> = ({ title, icon, children }) => {
  return (
    <div className="weather-card">
      <div className="weather-card-header">
        {icon && <img src={icon} alt={title} />}
        <h3>{title}</h3>
      </div>
      <div className="weather-card-body">{children}</div>
    </div>
  );
};

export default WeatherCard;
