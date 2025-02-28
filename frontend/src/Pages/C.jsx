import PropTypes from "prop-types";

const BookCollection = ({ data, text, path }) => {
    return (
        <div className="py-12 bg-gradient-to-b from-indigo-50 to-white">
            <div className="flex pb-4 md:mb-8 flex-row-reverse items-center justify-between px-8">
                <div>
                    <h1 className="text-xl md:text-4xl font-bold text-indigo-900">{text}</h1>
                </div>
                <div>
                    <p 
                        onClick={() => (window.location.href = path)} 
                        className="text-sm md:text-lg font-bold text-indigo-500 cursor-pointer"
                    >
                        بینینی هەمووی
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-8 px-8">
                {data?.map((book, index) => (
                    <div
                        key={book.id}
                        className={`group w-42 h-72 md:w-[100%] md:h-full flex flex-col ${index >= 2 ? "mt-20" : ""} md:mt-0`}
                    >
                        <div className="cursor-pointer relative z-40 h-[420px] shadow-xl rounded-lg mb-6 md:mb-4 transition-all duration-300 group-hover:shadow-2xl transform hover:translate-y-1">
                            <img
                                src={book.cover_image}
                                alt={`Cover of ${book.title}`}
                                className="w-full h-full object-fill"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="absolute z-50 -bottom-3 right-[50%] transform translate-x-1/2 bg-purple-400 flex items-center justify-center">
                                <p className="text-sm text-white px-4 py-1">{book.genre}</p>
                            </div>
                        </div>

                        <div className="text-center">
                            <h2 className="cursor-pointer text-lg md:text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-700 transition-colors duration-300">
                                {book?.title?.length > 25 ? `${book.title.slice(0, 25)}...` : book.title}
                            </h2>
                            <div className="flex items-center justify-center">
                                <span className="text-md cursor-pointer text-indigo-800 font-medium">-{book.name}-</span>
                            </div>
                        </div>
                    </div>
                ))}
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
