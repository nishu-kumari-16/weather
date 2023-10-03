import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
import Card from "./card";
import "./card.style.scss";

const HourlySummary = ({ forecast }: any) => {
  const ref = useRef<any>(null);

  const elementRef = useRef<any>(null);

  const [showActionButtons, setShowActionButtons] = useState<{
    next: boolean;
    previous: boolean;
  }>({
    next: true,
    previous: false,
  });

  const toggleButtonVisibility = () => {
    ref.current &&
      setShowActionButtons({
        next:
          ref.current.scrollLeft + ref.current.clientWidth <
          ref.current.scrollWidth - 2,
        previous: ref.current?.scrollLeft > 0,
      });
  };

  const handleScroll = useCallback((action: string) => {
    if (ref.current) {
      action === "right"
        ? (ref.current.scrollLeft += 160)
        : (ref.current.scrollLeft -= 160);
      toggleButtonVisibility();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", toggleButtonVisibility, true);
    elementRef.current &&
      elementRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });

    return () => {
      window.removeEventListener("scroll", toggleButtonVisibility);
    };
  }, []);

  return (
    <div className="flex flex-col gap-6 p-4 pr-7 rounded-lg outer-container">
      <div className="text-[2rem]">Hourly Forecast</div>
      <div className="flex gap-2 items-center relative sc">
        {showActionButtons.previous && (
          <FontAwesomeIcon
            icon={faChevronCircleLeft}
            size="lg"
            className="absolute top-[calc(50%-10px)] left-[-10px] w-auto hover:cursor-pointer"
            onClick={() => handleScroll("left")}
          />
        )}
        <div className="flex gap-4 overflow-auto scroll-smooth" ref={ref}>
          {forecast?.map((data: any, index: number) => (
            <Card
              key={index}
              temp={data?.temp_c}
              icon={data?.condition?.icon}
              time={data?.time}
              elementRef={elementRef}
            />
          ))}
        </div>
        {showActionButtons.next && (
          <FontAwesomeIcon
            icon={faChevronCircleRight}
            size="lg"
            className="hover:cursor-pointer"
            onClick={() => handleScroll("right")}
          />
        )}
      </div>
    </div>
  );
};
export default HourlySummary;
