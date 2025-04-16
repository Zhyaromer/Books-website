import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const DetailedBookCard = ({ books, author,endpoint }) => {
    const navigate = useNavigate();
    return (
        <div dir='rtl' className={books.length === 0 ? "hidden" : "block"}>
            <div className={`flex flex-row items-center gap-1 ${window.location.pathname.includes('/seriesbooks') ? 'hidden' : ''}`}>
                <h2 className="text-2xl font-bold text-gray-100 mb-6"> بەرهەمەکانی {author}</h2>
                <p className="text-lg font-bold text-gray-100 mb-6">{`(${books.length})`}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {books?.map((book, index) => (
                    <div key={index} className="bg-[#1a1a1a] rounded-lg shadow-md overflow-hidden flex">
                        <div className="relative w-1/3">
                            <img
                                src={book?.cover_image}
                                alt={book?.title}
                                className="w-full h-[248px] object-cover"
                            />
                            <div className={`absolute z-50 top-2 right-2 ${endpoint === 'author' ? 'hidden' : ''}`}>
                               <p className='bg-indigo-500 text-white py-1 px-2 rounded-full h-8 w-8 flex items-center justify-center'> {index + 1}</p>
                            </div>
                        </div>
                        <div className="w-2/3 p-4">
                            <h3 className="text-xl font-semibold text-gray-100 mb-1">{book?.title}</h3>
                            <p className="text-gray-200 md:text-base text-sm mb-2">بەرواری بڵاوکردنەوە {new Date(book?.published_date).getFullYear()} • {book?.page_count} لاپەڕە</p>
                            <p className="text-gray-200 md:text-base text-sm hidden md:block">{book?.description?.length > 170 ? `${book.description.substring(0, 170)}...` : book?.description}</p>
                            <p className="text-gray-300 text-sm block md:hidden">{book?.description?.length > 80 ? `${book.description.substring(0, 80)}...` : book?.description}</p>
                            <button onClick={() => navigate(`/booksDetail/${book.id}`)} className='text-sm mt-4 bg-[#1db954] hover:bg-[#1ed760] text-white py-2 px-2 rounded'>بینینی کتێب</button>
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
    })).isRequired,
    endpoint: PropTypes.string
};

export default DetailedBookCard;