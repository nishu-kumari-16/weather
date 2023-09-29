import "./card.style.scss";
import moment from "moment";

const Card = ({ temp, icon, time }: any) => {
  return (
    <div className="card">
      <div className="text-md font-semibold">{moment(time).format("h A")}</div>
      <img src={icon} alt="icon" className="w-8 h-8" />
      <div className="text-[1.25rem]">{temp}&deg;</div>
    </div>
  );
};
export default Card;
