import React from "react";
import CurrentWeatherCard from "../../CurrentWeather";
import "../../../styles/WeatherDashboard.scss";
import Header from "../../Header";
import DailyForecast from "../../Cards/DailyForecast";

const MainContent: React.FC = () => {
  return (
    <main className="main-content">
      <Header />
      <CurrentWeatherCard />
      <DailyForecast />
    </main>
  );
};

export default MainContent;
