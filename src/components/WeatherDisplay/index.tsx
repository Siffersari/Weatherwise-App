import { useWeather } from "../../context/WeatherContext";
import "../../styles/WeatherDashboard.scss";
import Sidebar from "../Layout/Sidebar";
import MainContent from "../Layout/Main";

const Weather = () => {
  const { weather, forecast, loading, error, fetchWeatherData } = useWeather();

  const formatTime = (timestamp?: number): string => {
    if (timestamp === undefined) {
      return "No time provided";
    }
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <p>Loading weather data...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => fetchWeatherData("Nairobi")}>Retry</button>{" "}
      </div>
    );
  }

  if (!weather || !forecast) {
    return <p>No weather data available.</p>;
  }

  const sunriseTime = formatTime(weather.sys.sunrise);
  const sunsetTime = formatTime(weather.sys.sunset);

  const dailyForecasts = forecast.list.filter(
    (f: any, index: number) => index % 8 === 0
  );

  return (
    <div className="weather-dashboard">
      <Sidebar />
      <MainContent
        weather={weather}
        forecast={forecast}
        loading={loading}
        error={error}
        fetchWeatherData={fetchWeatherData}
        sunriseTime={sunriseTime}
        sunsetTime={sunsetTime}
        dailyForecasts={dailyForecasts}
      />
    </div>
  );
};

export default Weather;
