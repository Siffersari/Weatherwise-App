import React from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import "./DailyForecast.scss";
import { Forecast } from "../../../types";

interface DailyForecastProps {
  dailyForecasts: Forecast[];
  intl: any;
}

const DailyForecast: React.FC<DailyForecastProps> = ({
  dailyForecasts,
  intl,
}) => {
  const formatDate = (dt: number) => {
    const dayName = intl.formatDate(new Date(dt * 1000), { weekday: "long" });
    const date = intl.formatDate(new Date(dt * 1000), {
      month: "numeric",
      day: "numeric",
    });
    return { dayName, date };
  };

  return (
    <section className="daily-forecast">
      <div className="forecast-card">
        <h2 className="forecast-title">
          <FormattedMessage
            id="forecast.title"
            defaultMessage="5-day forecast"
          />
        </h2>
        <div className="forecast-table">
          {dailyForecasts.map((dayForecast, index) => {
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
  );
};

export default injectIntl(DailyForecast);
