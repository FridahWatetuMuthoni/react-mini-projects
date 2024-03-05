import "./style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

function ImageSlider() {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const limit = "10";
  const url = `https://picsum.photos/v2/list/?page=1&limit=${limit}`;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        let response = await axios.get(url);
        console.log(response.data);
        if (response.data) {
          setImages(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setErrorMsg(error.message);
        setLoading(false);
      }
    };
    fetchImages();
  }, [url]);

  const handlePrevious = () => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  };
  const handleNext = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  };

  if (loading) {
    return (
      <section className="wrapper">
        <p>Loading ... Please Waiting</p>
      </section>
    );
  }

  if (errorMsg) {
    return (
      <section className="wrapper">
        <p>{errorMsg}</p>
      </section>
    );
  }

  return (
    <div className="wrapper">
      <section className="slider">
        <BsArrowLeftCircleFill
          className="arrow arrow-left"
          onClick={handlePrevious}
        />

        {images && images.length
          ? images.map((image, index) => {
              return (
                <img
                  key={image.id}
                  src={image.download_url}
                  alt={image.download_url}
                  className={
                    currentSlide === index
                      ? "current-image"
                      : "current-image hide-current-image"
                  }
                />
              );
            })
          : null}
        <BsArrowRightCircleFill
          className="arrow-right arrow"
          onClick={handleNext}
        />

        <span className="circle-indicators">
          {images && images.length
            ? images.map((_, index) => {
                return (
                  <button
                    key={index}
                    className={
                      currentSlide === index
                        ? "current-indicator"
                        : "current-indicator inactive-indicator"
                    }
                    onClick={() => setCurrentSlide(index)}
                  ></button>
                );
              })
            : null}
        </span>
      </section>
    </div>
  );
}

export default ImageSlider;
