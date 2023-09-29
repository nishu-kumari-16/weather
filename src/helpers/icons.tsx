import {
  IconDefinition,
  faCloudBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faWind,
  faCloudSun,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const codeRanges = [
  { min: 200, max: 250, icon: faCloudBolt },
  { min: 300, max: 350, icon: faCloudRain },
  { min: 500, max: 550, icon: faCloudShowersHeavy },
  { min: 600, max: 650, icon: faSnowflake },
  { min: 700, max: 750, icon: faWind },
  { min: 800, max: 800, icon: faCloudSun },
  { min: 801, max: 850, icon: faCloud },
];

const WeatherIcons = ({ code }: any) => {
  const [icon, setIcon] = useState<IconDefinition>(faCloudSun);

  useEffect(() => {
    for (const range of codeRanges) {
      if (code >= range.min && (code <= range.max || range.max === undefined)) {
        setIcon(range.icon);
        break;
      }
    }
  }, [code]);

  return (
    <FontAwesomeIcon icon={icon} size="2xl" className="w-[5rem] h-[5rem]" />
  );
};
export default WeatherIcons;
