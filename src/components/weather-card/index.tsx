import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../hourly-summary/card.style.scss";

const WeatherCard = ({ titleIcon, title, value, subtext, image }: any) => {
  return (
    <div className="outer-container rounded-lg min-w-[12rem] flex-1 p-4 w-fit overflow-hidden flex flex-col min-h-[10.25rem] gap-2 ">
      <div className="flex gap-2 items-center">
        <FontAwesomeIcon icon={titleIcon} className="w-auto" />
        <div className="text-md  text-[#EBEBF599] font-semibold">{title}</div>
      </div>
      <div className="text-[2rem] self-center">{value}</div>
      <img src={image} alt="icon" className="self-center" />
      <div className="text-sm font-light self-center">{subtext}</div>
    </div>
  );
};
export default WeatherCard;
