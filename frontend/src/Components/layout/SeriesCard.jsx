import { Card } from "@/Components/ui/card";
import { BookOpen } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const SeriesCard = ({ series }) => {
    const navigate = useNavigate();

    return (
        <div className="w-max-[85rem]">
            <Card
                className="group cursor-pointer relative overflow-hidden h-48 md:h-56 border-none"
                onClick={() => navigate(`/seriesbooks/${series.id}`)}
            >
                <div className="absolute inset-0">
                    <img
                        src={series.cover_img}
                        alt={series.series_title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/90 to-black/60" />
                </div>

                <div className="relative h-full p-4 md:p-6 flex flex-col justify-between text-white">
                    <div className="space-y-2">
                        <div className="flex justify-between items-start">
                            <h3 className="text-xl md:text-2xl font-bold">{series.series_title}</h3>
                            <span className={`text-xs md:text-sm px-2 py-0.5 rounded-full ${series.state === "بەردەوامە"
                                ? "bg-green-500/20 text-green-200 ring-1 ring-green-500/50"
                                : "bg-blue-500/20 text-blue-200 ring-1 ring-blue-500/50"
                                }`}>
                                {series.state}
                            </span>
                        </div>
                        <p className="text-sm md:text-base text-gray-300 line-clamp-2">
                            {series.description}
                        </p>
                    </div>

                    <div className="flex items-center justify-end gap-2 text-gray-300">
                        <span className="text-sm md:text-base">{series.book_num} کتێب</span>
                        <BookOpen className="w-4 h-4 md:w-5 md:h-5 opacity-75" />
                    </div>
                </div>
            </Card>
        </div>
    );
};

SeriesCard.propTypes = {
    series: PropTypes.shape({
        id: PropTypes.number.isRequired,
        series_title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        cover_img: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        book_num: PropTypes.number.isRequired,
    }).isRequired,
};

export default SeriesCard;