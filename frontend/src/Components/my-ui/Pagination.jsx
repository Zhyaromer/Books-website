import { ChevronLeft, ChevronRight } from "lucide-react";
import PropTypes from 'prop-types';
import { useTheme } from "../../context/ThemeContext";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const { main } = useTheme();
    const renderPageButtons = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`px-4 py-2 mx-1 rounded-full ${currentPage === i
                            ? 'text-white'
                            : 'bg-[#1a1a1a] text-gray-100 hover:bg-[rgb(34,33,33)]'
                        }`}
                    style={{
                        backgroundColor: currentPage === i ? main : '',
                    }}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div dir="ltr" className="flex justify-center items-center my-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-[#272525] text-gray-100 hover:bg-[rgb(48,45,45)] disabled:opacity-50"
            >
                <ChevronLeft />
            </button>
            {renderPageButtons()}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full bg-[#272525] text-gray-100 hover:bg-[rgb(48,45,45)] disabled:opacity-50"
            >
                <ChevronRight />
            </button>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination; 