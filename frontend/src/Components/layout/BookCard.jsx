import PropTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";

const BookCollection = ({ data, text, path }) => {
    const { secondary } = useTheme();
    return (
        <div className="pt-6 md:pt-12 bg-[#1a1a1a] w-full">
            <div className={`flex pb-4 md:pb-8 flex-row-reverse items-center justify-between px-4 md:px-8 ${path == "/Bookdetails" ? 'hidden' : ''}`}>
                <div>
                    <h1 className="font-sans text-xl md:text-3xl lg:text-4xl font-bold text-indigo-900">{text}{path == "/Books" ? (`${data?.length ? ` (${data?.length})` : ''}`) : ''}</h1>
                </div>
                <div className={`${path == "/Books" || path == "/trending" ? 'hidden' : ''}`}>
                    <p
                        onClick={() => (window.location.href = path)}
                        className="text-sm md:text-base lg:text-lg font-bold text-indigo-500 cursor-pointer hover:text-indigo-700 transition-colors"
                    >
                        بینینی هەمووی
                    </p>
                </div>
            </div>

            <div dir="rtl" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-2 gap-y-8 px-4 md:px-8 pb-6">
                {data?.length > 0 ? (
                    data?.map((book) => (
                        <div
                            key={book?.id}
                            className="group flex flex-col h-full"
                        >
                            <div
                                className="relative z-10 h-[200px] lg:h-[320px] md:h-[300px] shadow-md rounded-lg mb-2 md:mb-4 
                                transition-all duration-500 group-hover:shadow-xl transform group-hover:-translate-y-1 cursor-pointer"
                                onClick={() => (window.location.href = `/booksDetail/${book.id}`)}
                            >
                                <img
                                    src={book.cover_image}
                                    alt={`Cover of ${book.title}`}
                                    loading="lazy"
                                    className="w-full h-full object-fill rounded-lg transition-transform duration-500 group-hover:scale-105"
                                />

                                <div className="absolute w-full h-[200px] lg:h-[320px] md:h-[300px] inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transform group-hover:scale-105 transition-all duration-500"></div>

                                <div className="absolute z-20 bottom-0 right-0 left-0 flex justify-center transform translate-y-1/2">
                                    <p
                                        style={{ backgroundColor: secondary }}
                                        className="text-xs sm:text-sm text-white px-2 py-1 rounded-full max-w-max shadow-lg">
                                        {book.genre}
                                    </p>
                                </div>
                            </div>

                            <div className="text-center mt-2">
                                <h6 className="cursor-pointer text-sm md:text-lg font-bold text-gray-300 md:mb-2 
                                    group-hover:text-gray-200 transition-colors duration-200 line-clamp-2 "
                                    onClick={() => (window.location.href = `/booksDetail/${book.id}`)}
                                >
                                    {book?.title?.length > 15 ? `${book.title.slice(0, 15)}...` : book.title}
                                </h6>

                                <div className="flex items-center justify-center">
                                    <span onClick={() => (window.location.href = `/AuthorDetails/${book.author_id}`)} className="text-xs cursor-pointer text-gray-300 font-medium hover:text-gray-200 transition-colors duration-200">
                                        -{book.name}-
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-sm md:text-base font-bold text-gray-700 md:pb-56">هیچ کتێبێک نەدۆزرایەوە نییە</p>
                )}
            </div>
        </div>
    );
};

BookCollection.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            cover_image: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            genre: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};

export default BookCollection;