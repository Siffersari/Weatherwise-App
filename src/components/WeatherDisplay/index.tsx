import "../../styles/WeatherDashboard.scss";
import Sidebar from "../Layout/Sidebar";
import MainContent from "../Layout/Main";

const Weather = () => {
  return (
    <div className="weather-dashboard">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Weather;
