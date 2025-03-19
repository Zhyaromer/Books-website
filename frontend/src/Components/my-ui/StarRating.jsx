import { Star } from "lucide-react";
import PropTypes from "prop-types";

const StarRating = ({ rating, setRating, editable = false }) => {
    return (
        <div className="flex flex-row-reverse">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => editable && setRating(star)}
                    className={`${star <= rating ? "text-yellow-500" : "text-gray-300"
                        } ${editable ? "cursor-pointer" : "cursor-default"}`}
                >
                    <Star className="w-4 h-4 fill-current" />
                </button>
            ))}
        </div>
    );
};

StarRating.propTypes = {
    rating: PropTypes.number.isRequired,
    setRating: PropTypes.func.isRequired,
    editable: PropTypes.bool,
};

export default StarRating;