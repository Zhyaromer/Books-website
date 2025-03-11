import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const DetailedBookCard = ({ books,author }) => {
    const navigate = useNavigate();
    return (
        <div className={books.length === 0 ? "hidden" : "block" }>
            <div className={`flex flex-row items-center gap-1 ${window.location.pathname.includes('/seriesbooks') ? 'hidden' : ''}`}> 
                <h2 className="text-2xl font-bold text-gray-900 mb-6"> بەرهەمەکانی {author}</h2>
                <p className="text-lg font-bold text-gray-900 mb-6">{`(${books.length})`}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {books?.map((book, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex">
                        <div className="w-1/3 bg-gray-200">
                            <img
                                src={book?.cover_image}
                                alt={book?.title}
                                className="w-full h-[248px] md:h-full object-cover"
                            />
                        </div>
                        <div className="w-2/3 p-4">
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">{book?.title}</h3>
                            <p className="text-gray-500 md:text-base text-sm mb-2">بەرواری بڵاوکردنەوە {new Date(book?.published_date).getFullYear()} • {book?.page_count} لاپەڕە</p>
                            <p className="text-gray-700 md:text-base text-sm hidden md:block">{book?.description?.length > 170 ? `${book.description.substring(0, 170)}...` : book?.description}</p>
                            <p className="text-gray-700 md:text-base text-sm block md:hidden">{book?.description?.length > 80 ? `${book.description.substring(0, 80)}...` : book?.description}</p>
                            <button onClick={() => navigate(`/booksDetail/${book.id}`)} className='mt-4 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded'>بینینی کتێب</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

DetailedBookCard.propTypes = {
    author: PropTypes.string,
    books: PropTypes.arrayOf(PropTypes.shape({
        cover_image: PropTypes.string,
        title: PropTypes.string,
        published_date: PropTypes.string,
        page_count: PropTypes.number,
        description: PropTypes.string,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })).isRequired
};

export default DetailedBookCard;