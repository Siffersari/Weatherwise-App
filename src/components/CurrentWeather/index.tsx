import React from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import daytimeImage from "../../assets/images/day.png";
import nighttimeImage from "../../assets/images/night.png";
import "./CurrentWeatherCard.scss";
import { useWeather } from "../../context/WeatherContext";

interface CurrentWeatherCardProps {
  intl: any;
}

const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ intl }) => {
  const { weather, forecast, loading, error, fetchWeatherData } = useWeather();

  const renderSkeleton = () => (
    <div className="current-weather-card skeleton-loading">
      <div className="weather-details-container">
        <div className="weather-icon skeleton"></div>
        <div className="temperature skeleton"></div>
        <div className="weather-description skeleton"></div>
      </div>
      <div className="stats skeleton">
        <div className="precipitation skeleton"></div>
        <div className="humidity skeleton"></div>
        <div className="wind skeleton"></div>
      </div>
      <div className="location-and-time skeleton">
        <div className="location skeleton"></div>
        <div className="time skeleton"></div>
        <div className="date skeleton"></div>
      </div>
      <div className="hourly-updates skeleton">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="hourly-item">
            <div className="hour skeleton"></div>
            <div className="weather-icon skeleton"></div>
            <div className="hourly-temp skeleton"></div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading || error) {
    return renderSkeleton();
  }

  if (!weather || !forecast) {
    return <div>Error fetching weather data...</div>;
  }

  const isDayTime = () => {
    const currentTime = new Date().getTime() / 1000;
    return (
      currentTime >= weather?.sys?.sunrise &&
      currentTime <= weather?.sys?.sunset
    );
  };
  
  const hourlyForecast = forecast.list.filter(
    (item: { dt_txt: string | number | Date }, index: any) => {
      return new Date(item.dt_txt).getHours() % 3 === 0;
    }
  );

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

  const formatHourlyTime = (timestamp: number) => {
    return intl.formatTime(new Date(timestamp * 1000), {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const backgroundStyle = {
    backgroundImage: `url(${isDayTime() ? daytimeImage : nighttimeImage})`,
  };

  const weatherIconUrl = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

  return (
    <div className="current-weather-card" style={backgroundStyle}>
      <div className="weather-details-container">
        <div className="weather-icon">
          <img src={weatherIconUrl} alt={weather.weather[0].description} />
        </div>
        <div className="temperature">{`${Math.round(weather.main.temp)}°`}</div>

        <div className="weather-description">
          {weather.weather[0].description}
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
        {hourlyForecast.map(
          (
            hour: {
              dt: number;
              weather: { icon: any }[];
              main: { temp: number };
            },
            index: React.Key | null | undefined
          ) => (
            <div key={index} className="hourly-item">
              <div className="hour">{formatHourlyTime(hour.dt)}</div>
              <img
                src={`http://openweathermap.org/img/w/${hour.weather[0].icon}.png`}
                alt={weather.weather[0].description}
              />
              <div className="hourly-temp">{`${Math.round(
                hour.main.temp
              )}°`}</div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default injectIntl(CurrentWeatherCard);
