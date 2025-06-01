import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import {
  ArrowLeft,
  ArrowLeftShort,
  ArrowRight,
  ArrowRightShort,
  CircleFill,
} from "react-bootstrap-icons";

const slides = [
  {
    title: "First slide label",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
    imageText: "First slide",
    source: "/slide1.jpg",
  },
  {
    title: "Second slide label",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageText: "Second slide",
    source: "/slide2.avif",
  },
  {
    title: "Third slide label",
    description:
      "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    imageText: "Third slide",
    source: "/slide3.jpg",
  },
];

const ExampleCarouselImage = ({ source }: { source: string }) => (
  <div className="carousel-slide">
    <img src={source} className="img-slider" />
  </div>
);

const SliderBar = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const goToPrev = () => {
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="slider-bar-container">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        controls={false}
        indicators={false}
        interval={null}
      >
        {slides.map((slide, i) => (
          <Carousel.Item key={i}>
            <ExampleCarouselImage source={slide.source} />
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="carousel-controls">
        <ArrowLeftShort className="arrow-icon" onClick={goToPrev} />

        {slides.map((_, i) => (
          <CircleFill
            key={i}
            className={`dot-icon ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}

        <ArrowRightShort className="arrow-icon" onClick={goToNext} />
      </div>
    </div>
  );
};

export default SliderBar;
