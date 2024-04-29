import "./styles/App.scss";
import WeatherDisplay from "./components/WeatherDisplay";
import { WeatherProvider } from "./context/WeatherContext";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <WeatherProvider>
          <WeatherDisplay />
        </WeatherProvider>
      </LanguageProvider>
    </div>
  );
}

export default App;
