import { FaStar } from "react-icons/fa";

const StarDisplay = ({ rating }) => {
  return (
    <div className="d-flex gap-1">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          color={i < rating ? "#ffc107" : "#e4e5e9"}
          size={20}
        />
      ))}
    </div>
  );
};
export default StarDisplay;