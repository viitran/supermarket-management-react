import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function CarouselHome() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <div style={{ backgroundColor: "#CADFF8" }}>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <div className="row">
              <img src="/img/HomePage/carousel.png" alt="" />
            </div>
            <Carousel.Caption>
            
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <div className="row">
              <img src="/img/HomePage/carousel2.png" alt="" />
            </div>{" "}
            <Carousel.Caption>
             
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <div className="row">
              <img src="/img/HomePage/carousel3.png" alt="" />
            </div>{" "}
            <Carousel.Caption>
              
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
}

export default CarouselHome;
