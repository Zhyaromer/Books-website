import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../UI/card";
import { Avatar, AvatarImage, AvatarFallback } from "../UI/avatar";

const AuthorCard = ({ name, imageUrl, bio, id, className }) => {
  const getInitials = (authorName) => {
    return authorName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div>
      <Card className={`overflow-hidden transition-all h-[300px] duration-300 ease-in-out hover:shadow-xl hover:scale-[1.03] bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 opacity-30 rounded-xl transition-opacity duration-100 ease-in-out group-hover:opacity-50"></div>
        <CardHeader className="flex flex-col items-center pb-2 relative z-10">
          <div className="transform transition-transform duration-500 ease-out hover:scale-105">
            <Avatar className="h-28 w-28 mb-3 ring-4 ring-white dark:ring-slate-700 shadow-md transition-all duration-300 ease-in-out hover:ring-blue-200 dark:hover:ring-blue-800">
              <AvatarImage src={imageUrl} alt={name} />
              <AvatarFallback className="text-xl font-medium bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-center text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text transition-all duration-300 ease-in-out hover:from-indigo-600 hover:to-blue-600 dark:hover:from-indigo-400 dark:hover:to-blue-400">{name}</CardTitle>
          {bio && (
            <CardDescription className="text-center mt-2 text-sm line-clamp-3 max-w-[90%] italic text-slate-600 dark:text-slate-300">
              &ldquo;{bio}&rdquo;
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="text-center pb-5 relative z-10">
          <div className="flex justify-center space-x-3 mt-2">
            <button onClick={() => window.location.href = `/AuthorDetails/${id}`} className="px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium transition-all duration-300 ease-in-out hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-blue-200 dark:hover:border-blue-700 transform hover:-translate-y-0.5">
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