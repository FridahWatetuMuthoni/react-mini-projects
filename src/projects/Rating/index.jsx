import "./style.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

/*
I created two states, rating that will handle the stars selected 
and the hover that will handle highlights of the individual star that
will be hovered upon.
 */

function Rating({ numberOfStars = 5 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  console.log(rating);

  return (
    <div className="star-rating">
      {[...Array(numberOfStars)].map((_, index) => {
        return (
          <FaStar
            key={index}
            className={index <= (hover || rating) ? "active" : "inactive"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
            size="40"
          />
        );
      })}
    </div>
  );
}

Rating.propTypes = {
  numberOfStars: PropTypes.number,
};

export default Rating;
