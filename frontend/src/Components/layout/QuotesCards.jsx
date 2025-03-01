import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Quotes = ({ quotes }) => {
    console.log("Quotes prop:", quotes);
    const [selectedQuote, setSelectedQuote] = useState(null);

    useEffect(() => {
        if (Array.isArray(quotes) && quotes.length > 0) {
            setSelectedQuote(quotes[0]);
        }
    }, [quotes]);

    if (!selectedQuote) {
        return <p>No quotes available</p>;
    }

    return (
        <div dir="rtl" className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl m-4 my-8 mb-12">
            <div className="p-8">
                <div className="text-gray-500 text-sm mb-1">لە کتێبی</div>
                <h2 
                    onClick={() => (window.location.href = `/book/${selectedQuote.books_id}`)} 
                    className="cursor-pointer text-xl font-bold text-gray-800 mb-2"
                >
                    {selectedQuote.title}
                </h2>
                <div 
                    onClick={() => (window.location.href = `/author/${selectedQuote.author_id}`)} 
                    className="cursor-pointer text-gray-500 text-sm mb-4"
                >
                    لەلایەن {selectedQuote.name}
                </div>

                <div className="relative">
                    <div className="absolute -left-4 -top-4 text-6xl text-gray-200">&quot;</div>
                    <p className="text-gray-700 text-lg relative z-10 italic px-6 py-2">
                        {selectedQuote.quote}
                    </p>
                    <div className="absolute -right-2 bottom-0 text-6xl text-gray-200">&quot;</div>
                </div>
            </div>
        </div>
    );
};

Quotes.propTypes = {
    quotes: PropTypes.arrayOf(
        PropTypes.shape({
            books_id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            author_id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            quote: PropTypes.string.isRequired
        })
    ).isRequired
};

export default Quotes;
