import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../UI/card";
import { Avatar, AvatarImage, AvatarFallback } from "../UI/avatar";
import { useTheme } from "../../context/ThemeContext";

const AuthorCard = ({ name, imageUrl, bio, id, className }) => {
  const getInitials = (authorName = "") =>
    authorName
      .split(/\s+/)
      .map((word) => word[0]?.toUpperCase() || "")
      .join("");
  const { main, secondary, tertiary } = useTheme();

  return (
    <div>
      <Card className={`border-none transform transition-transform duration-500 ease-out overflow-hidden h-[300px] hover:shadow-xl hover:scale-[1.03] bg-[#1a1a1a] ${className}`}>
        <CardHeader className="flex flex-col items-center pb-2 relative z-10">
          <div className="transform transition-transform duration-500 ease-out hover:scale-105">
            <Avatar className="h-28 w-28 mb-3 shadow-md">
              <AvatarImage src={imageUrl || "/default-avatar.png"} loading="lazy" alt={name} />
              <AvatarFallback
              style={{
                backgroundColor: secondary
              }}
              className="text-xl font-medium text-white">
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-center text-xl text-gray-100 font-bold">{name}</CardTitle>
          {bio && (
            <CardDescription className="text-center mt-2 text-sm line-clamp-2 max-w-[90%] italic text-gray-300">
              &ldquo;{bio}&rdquo;
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="text-center pb-5 relative z-10">
          <div className="flex justify-center space-x-3 mt-2">
            <button 
            style={{
              backgroundColor: secondary
            }}
            onMouseLeave={(e) => (e.target.style.backgroundColor = secondary)}
            onMouseEnter={(e) => (e.target.style.backgroundColor = tertiary)}
            onClick={() => window.location.href = `/AuthorDetails/${id}`} className="px-4 py-1.5 rounded-full text-gray-100 text-sm font-medium transition-colors duration-300">
              بینینی نووسەر
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

AuthorCard.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  bio: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.number,
};

AuthorCard.defaultProps = {
  imageUrl: "",
  bio: "",
  className: "",
};

export default AuthorCard; 