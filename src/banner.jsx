import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is loaded globally

function DarkVariantExample() {
  const base = import.meta.env.BASE_URL;

  const images = [
    { src: `${base}assets/imgs/banner/1.webp`, alt: 'First slide' },
    { src: `${base}assets/imgs/banner/2.webp`, alt: 'Second slide' },
    { src: `${base}assets/imgs/banner/3.webp`, alt: 'Third slide' },
    { src: `${base}assets/imgs/banner/4.webp`, alt: 'Fourth slide' },
    { src: `${base}assets/imgs/banner/5.webp`, alt: 'Fifth slide' }
  ];

  return (
    <Carousel data-bs-theme="dark" className="w-100">
      {images.map((img, idx) => (
        <Carousel.Item key={idx}>
          <img
            className="d-block w-100"
            src={img.src}
            alt={img.alt}
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default DarkVariantExample;
