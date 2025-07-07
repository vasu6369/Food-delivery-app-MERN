import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="d-flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={24}
          className="cursor-pointer"
          color={(hover || rating) >= star ? "#ffc107" : "#e4e5e9"}
          onClick={() => setRating(star)}        
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
          style={{ transition: "color 0.2s ease-in-out" }}
        />
      ))}
    </div>
  );
};

export default StarRating;
