import { useState } from 'react';
import { ChevronLeft, ChevronRight, Book, Globe, Tag } from 'lucide-react';
import PropTypes from "prop-types";

const BookSlider = ({data}) => {

  if (!data || data.length === 0) {
    return <p></p>;
  }
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBook, setSelectedBook] = useState(data[0]);
  
  const visibleBooks = 3; 
  const maxIndex = data.length - visibleBooks;

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Book Collection</h2>
      
      <div className="relative mb-8">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleBooks)}%)` }}
          >
            {data.map((book) => (
              <div 
                key={book.id} 
                className={`w-1/3 flex-shrink-0 p-2 transition-all duration-300 transform cursor-pointer ${
                  selectedBook.id === book.id ? 'scale-105' : 'hover:scale-105'
                }`}
                onClick={() => handleBookClick(book)}
              >
                <div className={`relative rounded-lg overflow-hidden shadow-md ${
                  selectedBook.id === book.id ? 'ring-4 ring-blue-500' : ''
                }`}>
                  <img 
                    src={book.cover_image} 
                    alt={`Cover of ${book.title}`} 
                    className="w-full object-cover aspect-[2/3]"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <h3 className="text-white font-bold truncate">{book.title}</h3>
                    <p className="text-gray-300 text-sm truncate">{book.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={prevSlide} 
          disabled={currentIndex === 0}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full p-2 shadow-lg ${
            currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:bg-gray-100'
          }`}
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={nextSlide} 
          disabled={currentIndex === maxIndex}
          className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full p-2 shadow-lg ${
            currentIndex === maxIndex ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:bg-gray-100'
          }`}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 h-[400px]">
            <img 
              src={selectedBook.cover_image} 
              alt={`Cover of ${selectedBook.title}`}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedBook.title}</h2>
            <p className="text-lg text-gray-600 mb-1">by {selectedBook.name}</p>
            <p className="text-gray-500 mb-4">Published in {new Date(selectedBook.published_date).getFullYear()}</p>
            
            <div className="hidden md:flex gap-4 mb-4">
              <div className="flex items-center">
                <Tag size={16} className="text-blue-600 mr-1" />
                <span className="text-sm text-gray-700">{selectedBook.genre}</span>
              </div>
              <div className="flex items-center">
                <Globe size={16} className="text-green-600 mr-1" />
                <span className="text-sm text-gray-700">{selectedBook.language}</span>
              </div>
              <div className="flex items-center">
                <Book size={16} className="text-purple-600 mr-1" />
                <span className="text-sm text-gray-700">{selectedBook.page_count} pages</span>
              </div>
            </div>
            
            <p className="text-gray-700">{selectedBook.description}</p>
            
            <div className="mt-6">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors mr-3">
                بینینی زیاتر
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

BookSlider.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      cover: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      language: PropTypes.string.isRequired,
      pages: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};


export default BookSlider;