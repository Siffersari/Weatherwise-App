import React from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import daytimeImage from "../../assets/images/day.png";
import nighttimeImage from "../../assets/images/night.png";
import "./CurrentWeatherCard.scss";
import { HourlyForecastItem, WeatherData } from "../../types";

interface CurrentWeatherCardProps {
  weather: WeatherData;
  hourlyForecast: HourlyForecastItem[];
  intl: any;
}

const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  weather,
  hourlyForecast,
  intl,
}) => {
  const isDayTime = () => {
    const currentTime = new Date().getTime() / 1000;
    return (
      currentTime >= weather.sys.sunrise && currentTime <= weather.sys.sunset
    );
  };

  const formatDate = () => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return intl.formatDate(new Date(), options);
  };

  const formatTime = () => {
    const options = { hour: "numeric", minute: "numeric" };
    return intl.formatTime(new Date(), options);
  };

  const backgroundStyle = {
    backgroundImage: `url(${isDayTime() ? daytimeImage : nighttimeImage})`,
  };

  const weatherIconUrl = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

  const weatherKey = weather.weather[0].main.toLowerCase().replace(/\s/g, "");

  const formatHourlyTime = (timestamp: number) => {
    return intl.formatTime(new Date(timestamp * 1000), {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="current-weather-card" style={backgroundStyle}>
      <div className="weather-details-container">
        <div className="weather-icon">
          <img
            src={weatherIconUrl}
            alt={intl.formatMessage({ id: `weather.${weatherKey}` })}
          />
        </div>
        <div className="temperature">{`${Math.round(weather.main.temp)}°`}</div>

        <div className="weather-description">
          <FormattedMessage
            id={`weather.${weatherKey}`}
            defaultMessage={weather.weather[0].description}
          />
        </div>
      </div>
      <div className="stats">
        <div className="precipitation">
          <FormattedMessage
            id="weather.precipitation"
            defaultMessage="Precipitation: "
          />
          <span className="stat-value">{`${
            weather.rain ? weather.rain["1h"] : 0
          } mm`}</span>
        </div>
        <div className="humidity">
          <FormattedMessage id="weather.humidity" defaultMessage="Humidity: " />
          <span className="stat-value">{`${weather.main.humidity}%`}</span>
        </div>
        <div className="wind">
          <FormattedMessage id="weather.wind" defaultMessage="Wind: " />
          <span className="stat-value">{`${weather.wind.speed} km/h`}</span>
        </div>
      </div>
      <div className="location-and-time">
        <div className="location">{`${weather.name}, ${weather.sys.country}`}</div>
      </div>
      <div className="date-time">
        <div className="time">{formatTime()}</div>
        <div className="date">{formatDate()}</div>
      </div>

      <div className="hourly-updates">
        {hourlyForecast.map((hour, index) => (
          <div key={index} className="hourly-item">
            <div className="hour">{formatHourlyTime(hour.dt)}</div>
            <img
              src={`http://openweathermap.org/img/w/${hour.weather[0].icon}.png`}
              alt={intl.formatMessage({ id: `weather.${weatherKey}` })}
            />
            <div className="hourly-temp">{`${Math.round(
              hour.main.temp
            )}°`}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default injectIntl(CurrentWeatherCard);
