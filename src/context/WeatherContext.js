import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import weatherService from "../services/weatherService";

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await weatherService.fetchWeather(city );
      setWeather(data);
    } catch (errorResponse) {
      const message =
        errorResponse.response?.data?.message || "Failed to fetch weather data";
      console.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherForecast = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    try {
      const forecastData = await weatherService.fetchForecast(city);
      setForecast(forecastData);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeatherData("Nairobi");
    fetchWeatherForecast("Nairobi");
  }, [fetchWeatherData, fetchWeatherForecast]);

  return (
    <WeatherContext.Provider
      value={{
        weather,
        forecast,
        loading,
        error,
        setWeather,
        fetchWeatherData,
        fetchWeatherForecast,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
