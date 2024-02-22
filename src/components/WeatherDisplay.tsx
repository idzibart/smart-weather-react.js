import {
  BsFillCloudRainFill,
  BsFillSunFill,
  BsCloudyFill,
  BsCloudFog2Fill,
} from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaTemperatureArrowUp, FaTemperatureArrowDown } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { WeatherProps } from "../App";

type WeatherDisplayProps = {
  weatherData: WeatherProps | null;
  isLoading: boolean;
};

export default function DisplayWeather({
  isLoading,
  weatherData,
}: WeatherDisplayProps) {
  const icon = (weather: string) => {
    let iconElement: React.ReactNode;

    switch (weather) {
      case "Rain":
        iconElement = <BsFillCloudRainFill className="text-gray-700" />;
        break;
      case "Clear":
        iconElement = <BsFillSunFill className="text-yellow-400" />;
        break;
      case "Clouds":
        iconElement = <BsCloudyFill className="text-sky-900" />;
        break;
      case "Mist":
        iconElement = <BsCloudFog2Fill />;
        break;
      default:
        iconElement = <TiWeatherPartlySunny />;
    }
    return iconElement;
  };

  return (
    <div className="grid w-full justify-stretch gap-10 p-4">
      {weatherData && isLoading ? (
        <>
          <div className="grid gap-6">
            <div className="flex items-baseline justify-center gap-1">
              <h1 className="text-center text-4xl font-bold">
                {weatherData.name}{" "}
              </h1>
              <span className="text-gray-500">{weatherData.sys.country}</span>
            </div>
            <span className="flex justify-center text-[172px]">
              {icon(weatherData.weather[0].main)}
            </span>
            <div className="flex items-baseline justify-center gap-4 text-4xl">
              <h1 className="font-bold">
                {weatherData.main.temp.toFixed(0)}°C
              </h1>
              <h2 className="text-3xl">
                {weatherData.weather[0].main.toLowerCase()}
              </h2>
            </div>
          </div>

          {/* BOTTOM INFOBOX */}
          <div className="m-auto flex justify-center gap-6 rounded-xl bg-slate-200 bg-opacity-70 px-3 py-3 text-center shadow-lg">
            <div>
              <FaTemperatureArrowUp className="m-auto text-2xl text-red-500" />
              <div>
                <h1>{weatherData.main.temp_max.toFixed(0)}°C</h1>
                <p className="text-xs">temp. max</p>
              </div>
            </div>
            <div>
              <FaTemperatureArrowDown className="m-auto text-2xl text-blue-500" />
              <div>
                <h1>{weatherData.main.temp_min.toFixed(0)}°C</h1>
                <p className="text-xs">temp. min</p>
              </div>
            </div>
            <div>
              <WiHumidity className="m-auto text-2xl text-sky-500" />
              <div>
                <h1>{weatherData.main.humidity}%</h1>
                <p className="text-xs">humidity</p>
              </div>
            </div>
            <div>
              <FaWind className="m-auto text-2xl text-slate-50" />
              <div>
                <h1>{weatherData.wind.speed} km/h</h1>
                <p className="text-xs">wind speed</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <p className="animate-pulse text-center text-xl">Loading...</p>
        </div>
      )}
    </div>
  );
}
