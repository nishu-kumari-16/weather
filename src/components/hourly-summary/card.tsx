import "./card.style.scss";
import moment from "moment";

const Card = ({ temp, icon, time, elementRef }: any) => {
  const isCurrentTime = moment(time).format("h A") === moment().format("h A");
  return (
    <div
      className={`card ${isCurrentTime ? "active" : ""}`}
      ref={isCurrentTime ? elementRef : null}
    >
      <div className="text-md font-semibold">{moment(time).format("h A")}</div>
      <img src={icon} alt="icon" className="w-8 h-8" />
      <div className="text-[1.25rem]">{temp}&deg;</div>
    </div>
  );
};
export default Card;
