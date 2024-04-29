export interface Forecast {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain?: {
    "3h": number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}


export interface WeatherData {
  weather: {
    [key: number]: {
      icon: string;
      main: string;
      description: string;
    };
  };
  main: {
    temp: number;
    humidity: number;
  };
  rain?: { "1h": number };
  wind: { speed: number };
  sys: {
    country: string;
    sunset: number;
    sunrise: number;
  };
  name: string;
}


export interface HourlyForecastItem {
  dt: number;
  dt_txt: string;
  weather: {
    [key: number]: {
      icon: string;
      main: string;
      description: string;
    };
  };
  main: { temp: number };
}