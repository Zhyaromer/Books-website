import PropTypes from "prop-types";

const BookCardMain = ({ data, text, path }) => {
    return (
        <div className="pt-6 md:pt-12 bg-[#121212] w-full flex justify-center items-center flex-col">
            {path == "/Books" ?
                <div className={`flex pb-4 md:pb-8 justify-end px-4 md:px-8 w-full max-w-[85rem]`}>
                    <div>
                        <h1 className="font-sans text-base md:text-xl font-bold text-white">{text}</h1>
                    </div>
                </div>
                :
                <div className={`flex pb-4 md:pb-8 items-center justify-between px-4 md:px-8 w-full max-w-[85rem]`}>
                    <div>
                        <p
                            onClick={() => (window.location.href = path)}
                            className="text-sm md:text-base lg:text-lg font-bold text-muted-foreground cursor-pointer"
                        >
                            بینینی هەمووی
                        </p>
                    </div>
                    <div>
                        <h1 className="font-sans text-base md:text-xl font-bold text-white">{text}</h1>
                    </div>
                </div>
            }

            <div dir="rtl" className="flex flex-wrap justify-center gap-2 gap-y-8 px-4 md:px-8 pb-6 max-w-[85rem]">
                {data?.length > 0 ? (
                    data?.map((book) => (
                        <div
                            key={book?.id}
                            className="group flex flex-col h-full"
                        >
                            <div
                                className="relative w-[175px] md:w-[207px] z-10 h-[250px] lg:h-[350px] md:h-[300px] shadow-md rounded-lg mb-2 md:mb-4 
                                transition-all duration-500 group-hover:shadow-xl transform group-hover:-translate-y-1 cursor-pointer"
                                onClick={() => (window.location.href = `/booksDetail/${book.id}`)}
                            >
                                <img
                                    src={book.cover_image}
                                    alt={`Cover of ${book.title}`}
                                    loading="lazy" 
                                    className="w-full h-full object-fill rounded-lg transition-transform duration-500 group-hover:scale-105"
                                />

                                <div className="absolute w-full h-[250px] lg:h-[350px] md:h-[300px] inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transform group-hover:scale-105 transition-all duration-500"></div>

                                <div className="absolute z-20 bottom-0 right-0 left-0 flex justify-center transform translate-y-1/2">
                                    <p className="text-xs sm:text-sm text-white px-2 py-1 bg-purple-500 rounded-full max-w-max shadow-lg">
                                        {book.genre}
                                    </p>
                                </div>
                            </div>

                            <div className="text-center mt-2">
                                <h6 className="cursor-pointer text-sm md:text-lg font-bold text-gray-300 md:mb-2 
                                    group-hover:text-gray-200 transition-colors duration-200 line-clamp-2 "
                                    onClick={() => (window.location.href = `/booksDetail/${book.id}`)}
                                >
                                    {book?.title?.length > 20 ? `${book.title.slice(0, 20)}...` : book.title}
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
                    <p className="text-center text-sm md:text-base font-bold text-white md:pb-56">هیچ کتێبێک نەدۆزرایەوە نییە</p>
                )}
            </div>
        </div>
    );
};

BookCardMain.propTypes = {
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

export default BookCardMain;