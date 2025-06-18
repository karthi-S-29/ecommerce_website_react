import Carousel from 'react-bootstrap/Carousel';

function DarkVariantExample() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block"
          src="/assets/imgs/banner/1.webp"
          alt="First slide"
        />
        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block"
          src="/assets/imgs/banner/2.webp"
          alt="Second slide"
        />
        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block"
          src="/assets/imgs/banner/3.webp"
          alt="Third slide"
        />
        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block"
          src="/assets/imgs/banner/4.webp"
          alt="Four slide"
        />
        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block"
          src="/assets/imgs/banner/5.webp"
          alt="Five slide"
        />
        
      </Carousel.Item>
    </Carousel>
  );
}

export default DarkVariantExample;