import PropTypes from 'prop-types';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LatestNewsCard = ({ news }) => {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer group"
      onClick={() => navigate(`/newsdetails/${news.id}`)}
    >
      <div className="aspect-video mb-2 overflow-hidden rounded-lg">
        <img
          src={news.cover_image}
          alt={news.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
          }}
        />
      </div>
      <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition duration-200 line-clamp-2">
        {news.title}
      </h3>
      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
        <span>{new Date(news.created_at).toLocaleDateString()}</span>
        <span className="flex items-center gap-1">
          <Eye size={16} />
          {news.views}
        </span>
      </div>
    </div>
  );
};

LatestNewsCard.propTypes = {
  news: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    cover_image: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
  }).isRequired,
};

export default LatestNewsCard; 