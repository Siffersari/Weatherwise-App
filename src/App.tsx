import "./styles/App.scss";
import WeatherDisplay from "./components/WeatherDisplay";
import { WeatherProvider } from "./context/WeatherContext";
import { LanguageProvider } from "./context/LanguageContext";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <WeatherProvider>
          <ErrorBoundary>
            <WeatherDisplay />
          </ErrorBoundary>
        </WeatherProvider>
      </LanguageProvider>
    </div>
  );
}

export default App;
