import { useEffect, useState } from "react";
import { getCurrentDayData } from "../../services/forecast.service";
import WeatherSummary from "../weather-summary";
import Splash from "../splash";
import HourlySummary from "../hourly-summary";
import WeatherCard from "../weather-card";
import Sunrise from "../../assets/images/sunrise.png";
import Temperature from "../../assets/images/temperature.png";
import RainFall from "../../assets/images/downpour.png";
import Wind from "../../assets/images/wind.png";
import Visibility from "../../assets/images/eye.png";
import Pressure from "../../assets/images/pressure.png";
import Humidity from "../../assets/images/humidity.png";
import Snow from "../../assets/images/snow.png";
import UV from "../../assets/images/uv.png";
import {
  faCloudRain,
  faEye,
  faInfo,
  faSnowflake,
  faSun,
  faTemperature2,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

const Layout = () => {
  const [currentDayData, setCurrentDayData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const getDayData = async (searchQuery: string) => {
    setLoading(true);
    const data = await getCurrentDayData({ q: searchQuery });
    setCurrentDayData(data);
    setLoading(false);
  };

  useEffect(() => {
    searchQuery && getDayData(searchQuery);
  }, [searchQuery]);

  function success(position: any) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getDayData(`${latitude},${longitude}`);
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  useEffect(() => {
    if (!searchQuery) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        console.log("Geolocation not supported");
      }
    }
  }, []);

  return (
    <div className="flex gap-6 h-full flex-col sm:flex-row">
      {loading && <Splash />}
      <WeatherSummary
        weatherSummary={currentDayData?.current}
        location={currentDayData?.location}
      />
      <div className=" flex flex-[2] flex-col py-6 pr-6 pl-6 sm:pl-0 gap-6 overflow-x-hidden overflow-y-auto">
        <HourlySummary
          forecast={currentDayData?.forecast?.forecastday?.[0]?.hour}
        />
        <div className="flex gap-6 flex-wrap">
          <WeatherCard
            title="SUNRISE"
            titleIcon={faSun}
            value={currentDayData?.forecast?.forecastday?.[0]?.astro?.sunrise}
            image={Sunrise}
            subtext={`Sunset: ${currentDayData?.forecast?.forecastday?.[0]?.astro?.sunset}`}
          />
          <WeatherCard
            title="FEELS LIKE"
            titleIcon={faTemperature2}
            value={<div>{currentDayData?.current.feelslike_c}&deg;C</div>}
            image={Temperature}
          />
          <WeatherCard
            title="WIND"
            titleIcon={faWind}
            value={`${currentDayData?.forecast?.forecastday?.[0]?.day?.maxwind_kph} km/h`}
            image={Wind}
          />
          <WeatherCard
            title="RAINFALL"
            titleIcon={faCloudRain}
            value={`${currentDayData?.forecast?.forecastday?.[0]?.day?.daily_chance_of_rain}%`}
            image={RainFall}
          />
          <WeatherCard
            title="SNOW"
            titleIcon={faSnowflake}
            value={`${currentDayData?.forecast?.forecastday?.[0]?.day?.daily_chance_of_snow}%`}
            image={Snow}
          />
          <WeatherCard
            title="VISIBILITY"
            titleIcon={faEye}
            value={`${currentDayData?.forecast?.forecastday?.[0]?.day?.avgvis_km}Km`}
            image={Visibility}
          />
          <WeatherCard
            title="PRESSURE"
            titleIcon={faInfo}
            value={`${currentDayData?.current?.pressure_in}`}
            image={Pressure}
          />
          <WeatherCard
            title="UV INDEX"
            titleIcon={faSun}
            value={`${currentDayData?.forecast?.forecastday?.[0]?.day?.uv}`}
            image={UV}
          />
          <WeatherCard
            title="HUMIDITY"
            titleIcon={faSun}
            value={`${currentDayData?.current.humidity}`}
            image={Humidity}
          />
        </div>
      </div>
    </div>
  );
};
export default Layout;
// [
//   uv index, 4, moderate
//   sunrise, 5:28, sunset:7:25pm,
//   wind,
//   rainfallm
//   feels like
//   humidity,
//   visibility,
//   pressure
// ]
