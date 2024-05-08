import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function CarouselHome() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <div>
        <Carousel activeIndex={index} onSelect={handleSelect} >
          {/* <Carousel.Item>
            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 row">
              <img src="/img/HomePage/carousel.png" alt="" 
              // style={{width: "100%",height: "548px"}}
              />
            </div>
            <Carousel.Caption>
            
            </Carousel.Caption>
          </Carousel.Item> */}

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
