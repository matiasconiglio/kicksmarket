import Carousel from "react-bootstrap/Carousel";

function HeroCarousel() {
  return (
    <>
      <Carousel>
        <Carousel.Item interval={10000}>
          <img
            src="https://www.moov.com.ar/dw/image/v2/BDTF_PRD/on/demandware.static/-/Sites-Moov-Library/default/dw573394a3/26May/Full-PumaLifestyle_1920x5800206.jpg?sw=1920&sfrm=jpg&q=90"
            alt="Banner Promociones HardTech"
            className="w-100"
          />
        </Carousel.Item>
        <Carousel.Item interval={10000}>
          <img
            src="https://www.moov.com.ar/dw/image/v2/BDTF_PRD/on/demandware.static/-/Sites-Moov-Library/default/dwdf9ba9cf/01Jun/Full_AdidasCampus-mob.jpg?sw=1920&sfrm=jpg&q=90"
            alt="Banner HardTech"
            className="w-100"
          />
        </Carousel.Item>
        <Carousel.Item interval={10000}>
          <img
            src="https://www.moov.com.ar/dw/image/v2/BDTF_PRD/on/demandware.static/-/Sites-Moov-Library/default/dwa82b1828/19May/AJ4RETROAirJordanRetro4-1920x580.jpg?sw=1920&sfrm=jpg&q=90"
            alt="Banner Envios Gratis HardTech"
            className="w-100"
          />
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default HeroCarousel;
