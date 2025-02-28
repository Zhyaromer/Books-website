import { useState } from 'react';
import { ChevronLeft, ChevronRight, Book, Globe, Tag } from 'lucide-react';

const BookSlider = () => {
  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover: "https://th.bing.com/th/id/OIP.P1hfBfyKdnmO2R82Ow3lewHaLH?rs=1&pid=ImgDetMain",
      year: "1925",
      description: "A story of wealth, love, and tragedy in the Jazz Age A story of wealth, love, and tragedy in the Jazz Age. A story of wealth, love, and tragedy in the Jazz Age. A story of wealth, love, and tragedy in the Jazz Age. A story of wealth, love, and tragedy in the Jazz Age..",
      genre: "Literary Fiction",
      language: "English",
      pages: 180
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      cover: "https://th.bing.com/th/id/OIP.T55C4BiOVfcS3WFdCM3xdwHaK2?rs=1&pid=ImgDetMain",
      year: "1960",
      description: "A classic of American literature about racial injustice.",
      genre: "Southern Gothic",
      language: "English",
      pages: 281
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      cover: "https://www.jobsjaano.com/wp-content/uploads/2023/02/1984-by-George-Orwell-Full-Book-Summary-Free.jpg",
      year: "1949",
      description: "A dystopian novel about totalitarianism and surveillance.",
      genre: "Dystopian Fiction",
      language: "English",
      pages: 328
    },
    {
      id: 4,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      cover: "https://th.bing.com/th/id/OIP.To2r-UghMb79tPasgHo37wHaLH?rs=1&pid=ImgDetMain",
      year: "1937",
      description: "An adventure fantasy about Bilbo Baggins' journey.",
      genre: "Fantasy",
      language: "English",
      pages: 310
    },
    {
      id: 5,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      cover: "https://www.themoviedb.org/t/p/original/vAxWpk857xbpaeoSvkRsfMbokPl.jpg",
      year: "1813",
      description: "A romantic novel about societal expectations and love.",
      genre: "Romance",
      language: "English",
      pages: 432
    },
    {
      id: 6,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      cover: "https://th.bing.com/th/id/R.cac52fbbefa83812774f681dbf874163?rik=v%2bHq2yBp%2f6RzYw&riu=http%3a%2f%2fmedia.npr.org%2fassets%2fbakertaylor%2fcovers%2fc%2fcatcher-in-the-rye%2f9780316769488_custom-b6fc2e108f3865eb320720875c20e4f869da8065-s6-c30.jpg&ehk=fpDBmQJbSuHhhoBl2AYOifBz0QLtjPI7FBgIYnU65cM%3d&risl=&pid=ImgRaw&r=0",
      year: "1951",
      description: "A coming-of-age novel about teenage alienation.",
      genre: "Coming-of-age Fiction",
      language: "English",
      pages: 277
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBook, setSelectedBook] = useState(books[0]);
  
  const visibleBooks = 3; 
  const maxIndex = books.length - visibleBooks;

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
            {books.map((book) => (
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
                    src={book.cover} 
                    alt={`Cover of ${book.title}`} 
                    className="w-full object-cover aspect-[2/3]"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <h3 className="text-white font-bold truncate">{book.title}</h3>
                    <p className="text-gray-300 text-sm truncate">{book.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation buttons */}
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

      {/* Book Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <img 
              src={selectedBook.cover} 
              alt={`Cover of ${selectedBook.title}`}
              className="w-full  rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedBook.title}</h2>
            <p className="text-lg text-gray-600 mb-1">by {selectedBook.author}</p>
            <p className="text-gray-500 mb-4">Published in {selectedBook.year}</p>
            
            {/* Book metadata - horizontal display for larger screens */}
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
                <span className="text-sm text-gray-700">{selectedBook.pages} pages</span>
              </div>
            </div>
            
            <p className="text-gray-700">{selectedBook.description}</p>
            
            <div className="mt-6">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors mr-3">
                Read Now
              </button>
              <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg shadow hover:bg-gray-300 transition-colors">
                Add to save
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pagination indicators */}
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

export default BookSlider;