import PropTypes from 'prop-types';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from "../../context/ThemeContext";

const NewsCard = ({ data }) => {
  const { main, secondary } = useTheme();
  const navigate = useNavigate();

  if (!data) {
    return (
      <div className="bg-red-100 p-4 rounded-lg text-white">
        هیچ هەوالێک نیە
      </div>
    );
  }

  const { id, cover_image, title, description, views, created_at } = data;

  return (
    <div className="bg-transparent bg-[#1a1a1a] rounded-lg shadow-lg overflow-hidden transition duration-300 transform hover:scale-[1.04] rtl min-h-[300px] w-full max-w-sm mx-auto my-4">
      <div className="h-48 relative bg-gray-100">
        {cover_image ? (
          <img
            src={cover_image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">No Image Available</span>
          </div>
        )}

        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-sm flex gap-1 items-center">
          <span className="ml-1">{views || 0}</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <div className="p-4 text-right bg-transparent">
        <div className="mb-2">
          <h3 className="text-xl font-semibold line-clamp-2 text-gray-100 w-full">{title?.length > 30 ? title.slice(0, 30) + '...' : title || 'No Title'}</h3>
        </div>
        <p className="text-gray-300 text-sm line-clamp-3 mb-3">{description || 'No Description'}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">{new Date(created_at).toLocaleDateString() || 'No Date'}</span>
          <button
            onClick={() => navigate(`/newsdetails/${id}`)}
            className="px-4 py-2 flex items-center group transition-colors duration-200"
            style={{
              color: main,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = secondary }}
            onMouseLeave={(e) => { e.currentTarget.style.color = main }}
          >
            <span>زیاتر ببینە</span>
            <span className="transform rotate-180 transition-transform duration-200 group-hover:-translate-x-1">
              <ChevronRight size={20} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    cover_image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default NewsCard; 