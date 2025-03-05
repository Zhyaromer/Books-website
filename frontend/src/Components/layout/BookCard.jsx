import PropTypes from "prop-types";

const BookCollection = ({ data, text, path }) => {
    console.log(data);
    return (
        <div className="pt-6 md:pt-12 bg-gradient-to-b from-indigo-50 to-white w-full">
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

            <div dir="rtl" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-8 px-4 md:px-8 pb-6 ">
                {data?.length > 0 ? (
                    data?.map((book) => (
                        <div
                            key={book?.id}
                            className="group flex flex-col h-full"
                        >
                            <div
                                className="relative z-10 h-[300px] lg:h-[420px] md:h-[350px] shadow-md rounded-lg mb-2 md:mb-4 
                                transition-all duration-500 group-hover:shadow-xl transform group-hover:-translate-y-1 cursor-pointer"
                                onClick={() => (window.location.href = `/booksDetail/${book.id}`)}
                            >
                                <img
                                    src={book.cover_image}
                                    alt={`Cover of ${book.title}`}
                                    className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-105"
                                />

                                <div className="absolute w-full h-[300px] lg:h-[420px] md:h-[350px] inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transform group-hover:scale-105 transition-all duration-500"></div>

                                <div className="absolute z-20 bottom-0 right-0 left-0 flex justify-center transform translate-y-1/2">
                                    <p className="text-xs sm:text-sm text-white px-2 py-1 bg-purple-500 rounded-full max-w-max shadow-lg">
                                        {book.genre}
                                    </p>
                                </div>
                            </div>

                            <div className="text-center mt-4">
                                <h2 className="cursor-pointer text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-800 md:mb-2 
                                    group-hover:text-indigo-700 transition-colors duration-300 line-clamp-2 "
                                    onClick={() => (window.location.href = `/booksDetail/${book.id}`)}
                                >
                                    {book?.title?.length > 10 ? `${book.title.slice(0, 10)}...` : book.title}
                                </h2>

                                <div className="flex items-center justify-center">
                                    <span onClick={() => (window.location.href = `/authors/${book.author_id}`)} className="text-xs sm:text-sm md:text-base cursor-pointer text-indigo-800 font-medium hover:text-indigo-600 transition-colors">
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