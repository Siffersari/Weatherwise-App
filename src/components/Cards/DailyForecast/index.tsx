import React from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import "./DailyForecast.scss";
import { Forecast } from "../../../types";
import { useWeather } from "../../../context/WeatherContext";

interface DailyForecastProps {
  intl: any;
}

const DailyForecast: React.FC<DailyForecastProps> = ({ intl }) => {
  const { forecast, loading, error, fetchWeatherData } = useWeather();

  const dailyForecasts = forecast?.list?.filter(
    (f: any, index: number) => index % 8 === 0
  );

  const formatDate = (dt: number) => {
    const dayName = intl.formatDate(new Date(dt * 1000), { weekday: "long" });
    const date = intl.formatDate(new Date(dt * 1000), {
      month: "numeric",
      day: "numeric",
    });
    return { dayName, date };
  };

  if (loading || error) {
    return (
      <div className="skeleton-loader">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="skeleton-row">
            <div className="skeleton-date"></div>
            <div className="skeleton-day"></div>
            <div className="skeleton-icon"></div>
            <div className="skeleton-temp"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>Error fetching data. Please try again.</p>
        <button onClick={fetchWeatherData}>Retry</button>
      </div>
    );
  }

  if (!forecast) {
    return <div>Error fetching weather data...</div>;
  }

  return (
    <div className="content-container">

    <section className="daily-forecast">
      <div className="forecast-card">
        <h2 className="forecast-title">
          <FormattedMessage
            id="forecast.title"
            defaultMessage="5-day forecast"
          />
        </h2>
        <div className="forecast-table">
          {dailyForecasts?.map((dayForecast: Forecast, index: number) => {
            const { dayName, date } = formatDate(dayForecast.dt);
            const iconUrl = `http://openweathermap.org/img/w/${dayForecast.weather[0].icon}.png`;
            return (
              <div key={index} className="forecast-row">
                <div className="forecast-cell date">{date}</div>
                <div className="forecast-cell day">{dayName}</div>
                <div className="forecast-cell icon">
                  <img src={iconUrl} alt={dayForecast.weather[0].description} />
                </div>
                <div className="forecast-cell temp">
                  {`${Math.round(dayForecast.main.temp_max)}° / ${Math.round(
                    dayForecast.main.temp_min
                  )}°`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    </div>
  );
};

export default injectIntl(DailyForecast);
