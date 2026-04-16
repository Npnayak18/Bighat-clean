import { useEffect, useState } from "react";

import "./Carousel.css";
import c1 from "../assets/c1.avif";
import c2 from "../assets/c2.avif";
import c3 from "../assets/c3.avif";
function Carousel() {
  const images = [c1, c2, c3];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="carousel">
        <img
          src={images[index]}
          alt="banner"
          className="carouselimg"
        />
      </div>
    </>
  );
}

export default Carousel;