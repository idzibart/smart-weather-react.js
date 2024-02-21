import React, { useEffect, useState } from "react";
import axios from "axios";
import AppWrapper from "./components/AppWrapper";
import SearchBar from "./components/SearchBar";
import DisplayWeather from "./components/WeatherDisplay";

const APIkey = "7c360cc8c7dd19ac2cb149aef05371fc";

export type WeatherProps = {
  name: string;
  main: {
    temp: number;
    humidity: number;
    temp_max: number;
    temp_min: number;
  };
  sys: {
    country: string;
  };
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  };
};

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherProps | null>(null);
  const [searchCity, setSearchCity] = useState("");

  //WEATHER DATA FETCHING BY LOCALIZATION
  const fetchData = async (lat: number, lon: number) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${APIkey}&units=metric`;
    const response = await axios.get(url);
    return response.data;
  };

  //WEATHER DATA FETCHING BY CITY NAME
  const fetchCity = async (city: string) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;
      const response = await axios.get(url);
      console.log(response.data);
      const currentWeather: WeatherProps = response.data;
      return { currentWeather };
    } catch (error) {
      throw error;
    }
  };

  //LOCALIZATION FETCHING
  useEffect(() => {
    const fetchLocalization = async () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const [currentWeather] = await Promise.all([
          fetchData(latitude, longitude),
        ]);
        setWeatherData(currentWeather);
        setIsLoading(true);
      });
    };

    fetchLocalization();
  }, []);

  const onHandleSearch = async () => {
    if (searchCity.trim() === "") {
      return;
    }
    try {
      const { currentWeather } = await fetchCity(searchCity);
      setWeatherData(currentWeather);
      setSearchCity("");
    } catch (error) {}
  };

  return (
    <AppWrapper>
      <SearchBar
        setSearchCity={setSearchCity}
        searchCity={searchCity}
        onHandleSearch={onHandleSearch}
      />
      <DisplayWeather isLoading={isLoading} weatherData={weatherData} />
    </AppWrapper>
  );
}
