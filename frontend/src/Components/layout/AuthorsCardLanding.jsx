import PropTypes from 'prop-types';

const MultipleAuthorsCard = ({ data }) => {
    return (
        <div className="w-full max-w-6xl mx-auto bg-[#1a1a1a] p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-xl">
            <h1 className="text-xl md:text-2xl flex justify-end font-bold mb-4 sm:mb-6 md:mb-8 text-white border-b pb-2 sm:pb-4 border-gray-600">
                بەناوبانگترین نوسەرەکان 
            </h1>
            
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-8">
                {data.map((author, index) => (
                    <div
                        key={author.id}
                        onClick={() => (window.location.href = `/AuthorDetails/${author.id}`)}
                        className={`group relative overflow-hidden rounded-lg sm:rounded-xl shadow-md sm:shadow-lg transition-all duration-300 hover:shadow-xl sm:hover:shadow-2xl 
                        ${index === 0 ? 'col-span-2 row-span-2 h-[300px] md:h-full' : ''}`}
                    >
                        <div className="relative aspect-[4/4] overflow-hidden">
                            <img
                                src={author.imgURL}
                                alt={author.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80"></div>
                            
                            <div className={`absolute  ${index === 0 ? 'top-20' : 'bottom-0'} right-0 w-full p-3 sm:p-4 md:p-6 transform transition-transform duration-300 text-right`}>
                                <div className="w-8 sm:w-12 h-1 bg-white mb-2 sm:mb-4 ml-auto transform origin-right transition-transform duration-300 group-hover:scale-x-150"></div>
                                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">{author.name.length > 11 ? `${author.name.slice(0, 11)}...` : author.name}</h2>
                                
                                <div className="flex justify-end items-center mt-2 sm:mt-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                    <button className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 bg-[#1db954] text-white rounded-full text-xs sm:text-sm font-medium hover:bg-[#1ed760] transition-colors">
                                        بینینی پەڕە
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

MultipleAuthorsCard.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            imgURL: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default MultipleAuthorsCard;