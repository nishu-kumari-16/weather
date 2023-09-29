import "./splash.style.scss";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Splash = () => {
  return (
    <div className="preloader " style={{ opacity: 1 }}>
      <FontAwesomeIcon
        icon={faCloud}
        size="2xl"
        className="w-[5rem] h-[5rem] mb-6 ml-[1rem]"
        style={{ color: "#fff" }}
      />

      <div className="rain">
        <span className="drop"></span>
        <span className="drop"></span>
        <span className="drop"></span>
        <span className="drop"></span>
        <span className="drop"></span>
        <span className="drop"></span>
        <span className="drop"></span>
        <span className="drop"></span>
        <span className="drop"></span>
        <span className="drop"></span>
      </div>

      <div className="text">LOOKING OUTSIDE FOR YOU... ONE SEC</div>
    </div>
  );
};
export default Splash;
