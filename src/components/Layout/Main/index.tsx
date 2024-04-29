import React from "react";
import CurrentWeatherCard from "../../CurrentWeather";
import "../../../styles/WeatherDashboard.scss";
import Header from "../../Header";
import DailyForecast from "../../Cards/DailyForecast";
import { Forecast, HourlyForecastItem, WeatherData } from "../../../types";

interface MainContentProps {
  weather: WeatherData;
  forecast: { list: HourlyForecastItem[] };
  loading: boolean;
  error: string | null;
  fetchWeatherData: () => void;
  sunriseTime: string;
  sunsetTime: string;
  dailyForecasts: Forecast[];
}

const MainContent: React.FC<MainContentProps> = ({
  weather,
  forecast,
  loading,
  error,
  fetchWeatherData,
  sunriseTime,
  sunsetTime,
  dailyForecasts,
}) => {
  const hourlyForecast = forecast.list.filter((item, index) => {
    return new Date(item.dt_txt).getHours() % 3 === 0;
  });

  return (
    <main className="main-content">
      <Header />
      <CurrentWeatherCard weather={weather} hourlyForecast={hourlyForecast} />
      <DailyForecast dailyForecasts={dailyForecasts} />
    </main>
  );
};

export default MainContent;
