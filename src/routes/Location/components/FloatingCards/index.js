import { DJs } from "../../../../constants/constants";
import shuffle from "lodash/shuffle";
import DJCard from "../../../../components/common/DJCard";
import React, { useState, useRef, useEffect } from "react";
import "./index.css";

const FloatingCards = ({ location, ...props }) => {
  const [scrollAnimate, setScrollAnimate] = useState(false);
  const wrapperRef = useRef();

  const filterDjs = location => {
    location = !!location ? location : "notfound";
    location = location.toLowerCase() === "københavn" ? "copenhagen" : location;

    let renderDJS = shuffle(
      DJs.filter(
        dj =>
          dj.location.city.toLowerCase().indexOf(location.toLowerCase()) !== -1
      )
    );

    renderDJS = renderDJS.length > 2 ? renderDJS : [];

    return renderDJS;
  };

  const djs = filterDjs(location);

  useEffect(() => {
    if (!!wrapperRef.current) {
      const cardsWidth = parseInt(
        window.getComputedStyle(wrapperRef.current).width,
        10
      );

      if (cardsWidth >= window.innerWidth) {
        startScroll(djs.length);
      }
    }
  }, [djs]);

  const startScroll = count => {
    const animationTime = count * 5;
    setScrollAnimate(animationTime);
  };

  const count = djs.length;
  const renderDJs = scrollAnimate ? [...djs, ...djs] : djs;

  return (
    <div className="floating-cards-wrapper">
      <div
        ref={wrapperRef}
        style={{
          animationName: !!scrollAnimate ? "marquee" : null,
          animationDuration: scrollAnimate + "s"
        }}
        className="floating-cards"
        data-count={count}
      >
        {renderDJs.map((dj, idx) => {
          return (
            <div key={`dj-card-${idx}`} className="card-wrapper">
              <DJCard {...props} dj={dj} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FloatingCards;
