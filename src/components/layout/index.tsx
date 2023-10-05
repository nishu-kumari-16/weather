/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
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
import NoData from "../../assets/images/cloud.png";
import {
  faCloudRain,
  faEye,
  faInfo,
  faSnowflake,
  faSun,
  faTemperature2,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { useDebounce } from "../../hooks/useDebounce";

const Layout = () => {
  const [currentDayData, setCurrentDayData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [weatherCardData, setWeatherCardData] = useState<any>();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const getDayData = async (searchQuery: string) => {
    if (!searchQuery) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
        setLoading(false);
      } else {
        console.log("Geolocation not supported");
      }
    } else {
      setLoading(true);
      const data = await getCurrentDayData({ q: searchQuery });
      setCurrentDayData(data);
      setLoading(false);
    }
  };

  const handleSearch = useDebounce(() => {
    getDayData(searchQuery);
  });

  const success = useCallback((position: any) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getDayData(`${latitude},${longitude}`);
  }, []);

  const error = () => {
    console.log("Unable to retrieve your location");
  };

  const updateWeatherCardData = () => {
    const data = [
      {
        title: "SUNRISE",
        titleIcon: faSun,
        value: currentDayData?.forecast?.forecastday?.[0]?.astro?.sunrise,
        image: Sunrise,
        subtext: `Sunset: ${currentDayData?.forecast?.forecastday?.[0]?.astro?.sunset}`,
      },
      {
        title: "FEELS LIKE",
        titleIcon: { faTemperature2 },
        value: <div>{currentDayData?.current.feelslike_c}&deg;C</div>,
        image: Temperature,
      },
      {
        title: "WIND",
        titleIcon: faWind,
        value: `${currentDayData?.forecast?.forecastday?.[0]?.day?.maxwind_kph} km/h`,
        image: Wind,
      },
      {
        title: "RAINFALL",
        titleIcon: faCloudRain,
        value: `${currentDayData?.forecast?.forecastday?.[0]?.day?.daily_chance_of_rain}%`,
        image: RainFall,
      },
      {
        title: "SNOW",
        titleIcon: faSnowflake,
        value: `${currentDayData?.forecast?.forecastday?.[0]?.day?.daily_chance_of_snow}%`,
        image: Snow,
      },
      {
        title: "VISIBILITY",
        titleIcon: faEye,
        value: `${currentDayData?.forecast?.forecastday?.[0]?.day?.avgvis_km}Km`,
        image: Visibility,
      },
      {
        title: "PRESSURE",
        titleIcon: faInfo,
        value: `${currentDayData?.current?.pressure_in}`,
        image: Pressure,
      },
      {
        title: "UV INDEX",
        titleIcon: faSun,
        value: `${currentDayData?.forecast?.forecastday?.[0]?.day?.uv}`,
        image: UV,
      },
      {
        title: "HUMIDITY",
        titleIcon: faSun,
        value: `${currentDayData?.current.humidity}`,
        image: Humidity,
      },
    ];
    setWeatherCardData(data);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  useEffect(() => {
    currentDayData && updateWeatherCardData();
  }, [currentDayData]);

  return (
    <div className="flex gap-6 h-full flex-col sm:flex-row">
      {loading && <Splash />}
      <WeatherSummary
        weatherSummary={currentDayData?.current}
        location={currentDayData?.location}
      />
      <div className=" flex flex-[2] flex-col py-6 pr-6 pl-6 sm:pl-0 gap-6 overflow-x-hidden overflow-y-auto">
        <input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Enter location here..."
          className="px-3 py-2 rounded-md outline-none w-[320px] self-end text-[#000] dark:text-[#fff] absolute sm:relative sm:top-0 top-6 z-20"
        />
        {currentDayData ? (
          <React.Fragment>
            <HourlySummary
              forecast={currentDayData?.forecast?.forecastday?.[0]?.hour}
            />
            <div className="flex gap-6 flex-wrap">
              {!!weatherCardData &&
                weatherCardData?.map((cardData: any, index: number) => (
                  <WeatherCard
                    title={cardData?.title}
                    titleIcon={cardData?.titleIcon}
                    value={cardData?.value}
                    image={cardData?.image}
                    subtext={cardData?.subtext}
                    key={index}
                  />
                ))}
            </div>
          </React.Fragment>
        ) : (
          <div className="flex h-full flex-col gap-6 justify-center items-center">
            <img src={NoData} alt="no-data" />
            <div className="text-md sm:text-[2rem] text-center">
              Please try with some other keyword
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Layout;
