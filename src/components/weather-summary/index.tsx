import Stars from "../../assets/images/background.png";
import House from "../../assets/images/house.svg";

const WeatherSummary = ({ weatherSummary, location }: any) => {
  return (
    <div className="relative flex-1 ">
      <img
        src={Stars}
        className="h-[100%] absolute top-0 right-0 left-0 w-full sm:w-auto bottom-0"
        alt="stars"
      />
      <img
        src={House}
        className="absolute bottom-0 right-[5%] h-[10rem] sm:h-auto"
        alt="house"
      />

      <div className="flex flex-col gap-2 z-10 relative items-center pt-[5rem] sm:pt-[3rem] sm:pb-0 pb-[1.5rem] bg-[rgba(0,0,0,0.3)] h-full">
        <div className="text-[1.5rem] font-medium">
          {location?.name}, {location?.region}
        </div>
        {weatherSummary?.temp_c && (
          <div className=" text-[3rem] leading-[3rem] sm:text-[5rem] font-thin sm:leading-[5rem] ">
            {weatherSummary?.temp_c}&deg;C
          </div>
        )}
        <img
          src={weatherSummary?.condition.icon}
          alt=""
          className="w-[4rem] sm:w-[7rem]"
        />
        <div className="text-lg text-slate-100 font-medium">
          {weatherSummary?.condition.text}
        </div>
        {location?.lat && (
          <div className="text-lg font-medium">
            H: {location?.lat}&deg; L: {location?.lon}&deg;
          </div>
        )}
      </div>
    </div>
  );
};
export default WeatherSummary;
