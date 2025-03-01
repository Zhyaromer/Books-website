import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar, FaBookmark, FaShare, FaHeart } from 'react-icons/fa';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Mock data - replace with actual API call
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setBook({
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81YzHKeWq7L.jpg",
        rating: 4.5,
        reviewCount: 2547,
        price: 24.99,
        salePrice: 18.99,
        description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?",
        pages: 304,
        publisher: "Viking",
        publishDate: "August 13, 2020",
        language: "English",
        isbn: "9780525559474",
        categories: ["Fiction", "Fantasy", "Contemporary"],
        authorBio: "Matt Haig is a British author for children and adults. His memoir Reasons to Stay Alive was a number one bestseller, staying in the British top ten for 46 weeks.",
        reviews: [
          { id: 1, user: "BookLover42", rating: 5, comment: "Absolutely life-changing. This book made me reconsider everything.", date: "2023-01-15" },
          { id: 2, user: "ReadingRainbow", rating: 4, comment: "Beautiful concept, well-executed. The ending felt a bit rushed.", date: "2023-02-22" },
          { id: 3, user: "LiteraryExplorer", rating: 5, comment: "One of the most thought-provoking books I've read this year.", date: "2023-03-10" },
        ],
        relatedBooks: [
          { id: 2, title: "How To Stop Time", author: "Matt Haig", coverImage: "https://images-na.ssl-images-amazon.com/images/I/71Vb7oaX0jL.jpg", rating: 4.3 },
          { id: 3, title: "The Humans", author: "Matt Haig", coverImage: "https://images-na.ssl-images-amazon.com/images/I/81zqkBmRuKL.jpg", rating: 4.2 },
          { id: 4, title: "Reasons to Stay Alive", author: "Matt Haig", coverImage: "https://images-na.ssl-images-amazon.com/images/I/71ckGQGQNYL.jpg", rating: 4.7 },
        ]
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div dir='rtl' className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            {/* Book Cover */}
            <div className="md:w-1/3 mb-8 md:mb-0">
              <div className="relative">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-64 h-auto mx-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Book Info */}
            <div className="md:w-2/3 md:pl-12">
              <div className="flex items-center mb-2">
                <span className="text-xs bg-blue-700 bg-opacity-50 px-2 py-1 rounded-full mr-2">
                  {book.categories[0]}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-2">{book.title}</h1>
              <p className="text-xl mb-4">نووسەر: <span className="font-semibold">{book.author}</span></p>

              <div className="flex flex-wrap gap-3 mb-6">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-bold transition-colors duration-200 flex items-center">
                  خوێندراوە
                </button>
                <button className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-900 text-white px-4 py-3 rounded-lg font-bold transition-colors duration-200 flex items-center">
                  <FaBookmark className="mr-2" />  زیادکردن بۆ لیستی خوێندنەوە
                </button>
                <button className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-900 text-white p-3 rounded-lg transition-colors duration-200">
                  <FaShare />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-300">لاپەڕەکان</p>
                  <p className="font-semibold">{book.pages}</p>
                </div>
                <div>
                  <p className="text-gray-300">بڵاوکەرەوە</p>
                  <p className="font-semibold">{book.publisher}</p>
                </div>
                <div>
                  <p className="text-gray-300">زمان</p>
                  <p className="font-semibold">{book.language}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-4 text-lg font-medium ${activeTab === 'description' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              وەسف
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`px-6 py-4 text-lg font-medium ${activeTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              وردەکاری
            </button>
            <button
              onClick={() => setActiveTab('author')}
              className={`px-6 py-4 text-lg font-medium ${activeTab === 'author' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              نووسەر
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-4 text-lg font-medium ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              هەڵسەنگاندنەکان ({book.reviews.length})
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-lg leading-relaxed">{book.description}</p>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">وردەکاری کتێب</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 text-gray-600">ناونیشان</td>
                        <td className="py-3 font-medium">{book.title}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-600">نووسەر</td>
                        <td className="py-3 font-medium">{book.author}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-600">زمان</td>
                        <td className="py-3 font-medium">{book.language}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-600">ژمارەی لاپەڕەکان</td>
                        <td className="py-3 font-medium">{book.pages}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">وردەکاری بڵاوکردنەوە</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 text-gray-600">بڵاوکەرەوە</td>
                        <td className="py-3 font-medium">{book.publisher}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-600">بەرواری بڵاوکردنەوە</td>
                        <td className="py-3 font-medium">{book.publishDate}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-600">ISBN</td>
                        <td className="py-3 font-medium">{book.isbn}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'author' && (
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/4">
                  <img
                    src="https://images.gr-assets.com/authors/1488569446p8/76360.jpg"
                    alt={book.author}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-bold mb-4">{book.author}</h3>
                  <p className="text-lg leading-relaxed mb-6">{book.authorBio}</p>
                  <p className="text-lg leading-relaxed mb-6">
                    Matt Haig is the number one bestselling author of Reasons to Stay Alive, Notes on a Nervous Planet and seven highly acclaimed novels for adults, including The Midnight Library, which has sold over two million copies worldwide.
                  </p>
                  <div className="flex gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                     view author
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 rounded-xl">
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                  >
                    <FaStar className="text-xl" />
                    هەڵسەنگاندنێک بنووسە
                  </button>
                </div>

                {/* Review Form - Redesigned */}
                {showReviewForm && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                      <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                          <h4 className="text-2xl font-bold text-gray-800">نووسینی هەڵسەنگاندن</h4>
                          <button
                            onClick={() => setShowReviewForm(false)}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <form className="space-y-6">
                          <div className="bg-gray-50 p-4 rounded-xl">
                            <div className="flex items-center gap-4 mb-4">
                              <img 
                                src={book.coverImage} 
                                alt={book.title} 
                                className="w-16 h-24 object-cover rounded-md shadow-md" 
                              />
                              <div>
                                <h5 className="font-bold text-lg">{book.title}</h5>
                                <p className="text-gray-600">{book.author}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-gray-700 font-medium mb-3">هەڵسەنگاندنت</label>
                            <div className="flex gap-3 text-3xl justify-center bg-gray-50 py-4 rounded-xl">
                              {[1, 2, 3, 4, 5].map(star => (
                                <button
                                  key={star}
                                  type="button"
                                  className="text-gray-300 hover:text-yellow-400 focus:text-yellow-400 focus:outline-none transform hover:scale-125 transition-all duration-200"
                                >
                                  <FaStar />
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-gray-700 font-medium mb-3">بۆچوونت</label>
                            <textarea
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                              rows="5"
                              placeholder="بۆچوونت لەسەر کتێبەکە بنووسە..."
                            ></textarea>
                            <p className="text-sm text-gray-500 mt-2">تکایە بۆچوونێکی دروست و بەسوود بنووسە</p>
                          </div>

                          <div className="flex items-center gap-2 bg-yellow-50 p-3 rounded-xl border border-yellow-100">
                            <input
                              type="checkbox"
                              id="spoiler"
                              className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label htmlFor="spoiler" className="text-gray-700">
                              ئەم هەڵسەنگاندنە سپۆیلەری تێدایە
                            </label>
                          </div>

                          <div className="flex gap-3 pt-4">
                            <button
                              type="submit"
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              بڵاوکردنەوەی هەڵسەنگاندن
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowReviewForm(false)}
                              className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              پاشگەزبوونەوە
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  {book.reviews.map(review => (
                    <div key={review.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transition-all duration-200 hover:shadow-xl">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {review.user.charAt(0)}
                          </div>
                          <div>
                            <h5 className="font-bold text-lg">{review.user}</h5>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex text-yellow-400">
                          {renderStars(review.rating)}
                        </div>
                      </div>

                      <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>

                      <div className="flex items-center gap-3 text-sm">
                        <div className="relative">
                          <button 
                            className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-lg transition-colors"
                            onClick={() => {
                              // Here you would toggle the dropdown menu
                              // For example: setActiveDropdown(activeDropdown === review.id ? null : review.id);
                            }}
                          >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="6" r="2" fill="currentColor" />
                              <circle cx="12" cy="12" r="2" fill="currentColor" />
                              <circle cx="12" cy="18" r="2" fill="currentColor" />
                            </svg>
                          </button>
                          
                          {/* Dropdown menu - would be controlled by state */}
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10" style={{ display: 'none' }}>
                            <button className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              دەستکاری هەڵسەنگاندن
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              سڕینەوەی هەڵسەنگاندن
                            </button>
                          </div>
                        </div>
                        
                        <button 
                          className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-lg transition-colors"
                          onClick={() => {
                            // Here you would set a state to show the report modal
                            // For example: setShowReportModal(true); setReportReviewId(review.id);
                          }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                          </svg>
                          <span>ڕاپۆرت</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Report Modal */}
                {/* This would be controlled by state, for example: showReportModal && ( ... ) */}
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" style={{ display: 'none' }}>
                  <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xl font-bold text-gray-800">ڕاپۆرتکردنی هەڵسەنگاندن</h4>
                        <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">تکایە هۆکاری ڕاپۆرتکردنی ئەم هەڵسەنگاندنە دیاری بکە:</p>
                      
                      <div className="space-y-3">
                        <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input type="radio" name="report-reason" className="w-4 h-4 text-blue-600" />
                          <span className="mr-3">ناوەڕۆکی نەشیاو</span>
                        </label>
                        
                        <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input type="radio" name="report-reason" className="w-4 h-4 text-blue-600" />
                          <span className="mr-3">سپۆیلەری بێ ئاگاداری</span>
                        </label>
                        
                        <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input type="radio" name="report-reason" className="w-4 h-4 text-blue-600" />
                          <span className="mr-3">زانیاری هەڵە</span>
                        </label>
                        
                        <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input type="radio" name="report-reason" className="w-4 h-4 text-blue-600" />
                          <span className="mr-3">هۆکاری تر</span>
                        </label>
                      </div>
                      
                      <textarea
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg mt-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows="3"
                        placeholder="ڕوونکردنەوەی زیاتر (ئارەزوومەندانە)"
                      ></textarea>
                      
                      <div className="flex gap-3 mt-6">
                        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                          ناردنی ڕاپۆرت
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                          پاشگەزبوونەوە
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Load More Button */}
                <div className="text-center">
                  <button className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
                    <span>هەڵسەنگاندنی زیاتر ببینە</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Books */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">کتێبی پەیوەندیدار</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {book.relatedBooks.map(relatedBook => (
              <div key={relatedBook.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 overflow-hidden">
                  <img
                    src={relatedBook.coverImage}
                    alt={relatedBook.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 hover:text-blue-600 transition-colors duration-200">
                    {relatedBook.title}
                  </h3>
                  <p className="text-gray-600 mb-2">نووسەر: {relatedBook.author}</p>
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {renderStars(relatedBook.rating)}
                    </div>
                    <span className="text-sm text-gray-500">{relatedBook.rating}</span>
                  </div>
                  <div className="mt-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors duration-200 w-full">
                      بینینی وردەکاری
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Similar Books */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8">کتێبی هاوشێوە</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map(item => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src={`https://source.unsplash.com/random/200x300?book&sig=${item}`}
                  alt="Book cover"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm truncate">ناونیشانی کتێب</h3>
                <p className="text-xs text-gray-600 mb-1">ناوی نووسەر</p>
                <div className="flex items-center">
                  <div className="flex text-xs mr-1">
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaRegStar className="text-yellow-400" />
                  </div>
                  <span className="text-xs text-gray-500">4.0</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">بەردەوام بە</h2>
            <p className="text-lg mb-8">بەشداری بکە لە نیوزلێتەرەکەمان بۆ پێشنیاری کتێب، چاوپێکەوتنی نووسەران و لیستی خوێندنەوە.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="ئیمەیڵەکەت"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-bold transition-colors duration-200">
                بەشداری بکە
              </button>
            </div>
            <p className="text-sm mt-4 text-blue-200">ڕێز لە تایبەتمەندیت دەگرین. دەتوانیت هەر کاتێک بتەوێت بەشداریت هەڵبوەشێنیتەوە.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
