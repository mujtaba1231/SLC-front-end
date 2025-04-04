import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CustomCarousel = ({ images, communityName }) => {
  return (
    <div className="relative w-full">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={3000}
        showStatus={false}
        showIndicators={true}
        swipeable
        emulateTouch
        className="rounded-lg shadow-md"
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
          >
            <img
              src={image}
              alt={`${communityName} - Image ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
            <p className="legend bg-black/70 text-white">{communityName}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CustomCarousel;