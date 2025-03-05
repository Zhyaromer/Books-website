import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaBookmark, FaShare } from 'react-icons/fa';
import axios from 'axios';
import BookCollection from '../Components/layout/BookCard';
import ReviewSection from '../Components/layout/ReviewSection';
import BookstoreNavigation from '../Components/layout/Navigation';
import Footer from '../Components/layout/Footer';

const BookDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [fetchBook, setFetchBook] = useState([]);
  const [series, setSeries] = useState([]);
  const [booksSeries, setBooksSeries] = useState([]);
  const [similarBooks, setSimilarBooks] = useState([]);

  useEffect(() => {

    const incrementViewCount = async () => {
      try {
        await axios.get(`http://localhost:3000/books/incrementbookview/${id}`);
      } catch (error) {
        console.log(error);
      }
    }

    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/books/getBookById/${id}`);
        setFetchBook(response.data.book);
        setSeries(response.data.series);
        setBooksSeries(response.data.seriesBooks);
        setSimilarBooks(response.data.similarBooks);
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    incrementViewCount();
    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <BookstoreNavigation />
      <div dir='rtl' className="bg-gray-50 min-h-screen pt-16">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-2/3 lg:w-1/3 mb-8 md:mb-0">
                <div className="relative">
                  <img
                    src={fetchBook.cover_image}
                    alt={fetchBook.title}
                    className="w-64 h-auto mx-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              <div className="md:w-2/3 md:pl-12">
                <div className="flex items-center mb-2">
                  <span onClick={() => location.href = `/books?genre=${fetchBook.genre}`} className="text-xs bg-blue-700 bg-opacity-50 px-2 py-1 rounded-full mr-2 cursor-pointer">
                    {fetchBook.genre}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-2">{fetchBook.title}</h1>
                <p onClick={() => location.href = `/AuthorDetails/${fetchBook.author_id}`} className="text-xl mb-4 cursor-pointer">نووسەر: <span className="font-semibold">{fetchBook.name}</span></p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-bold transition-colors duration-200 flex items-center">
                    خوێندراوە
                  </button>
                  <button className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-900 text-white px-4 py-3 rounded-lg font-bold transition-colors duration-200 flex items-center">
                    <div className="flex flex-row items-center">
                      <div>
                        زیادکردن بۆ لیستی خوێندنەوە
                      </div>
                      <div>
                        <FaBookmark className="mr-2" />
                      </div>
                    </div>
                  </button>
                  <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-900 text-white p-3 rounded-lg transition-colors duration-200">
                    <FaShare />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-300">ژمارەی لاپەڕە</p>
                    <p className="font-semibold">{fetchBook.page_count}</p>
                  </div>
                  <div>
                    <p className="text-gray-300">کاتی بڵاوکردنەوە</p>
                    <p className="font-semibold">{new Date(fetchBook.published_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-300">زمان</p>
                    <p onClick={() => location.href = `/books?language=${fetchBook.language}`} className="font-semibold cursor-pointer">{fetchBook.language}</p>
                  </div>
                  <div>
                    <p className="text-gray-300">بینەر</p>
                    <p className="font-semibold">{fetchBook.views}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-0 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-4 py-4 text-sm font-bold ${activeTab === 'description' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                کورتە
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`px-4 py-4 text-sm font-bold ${activeTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                وردەکاری
              </button>
              <button
                onClick={() => setActiveTab('author')}
                className={`px-4 py-4 text-sm font-bold ${activeTab === 'author' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                نووسەر
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-4 text-sm font-bold ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                هەڵسەنگاندن
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="text-lg leading-relaxed">{fetchBook.description}</p>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">وردەکاری کتێب</h3>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 text-gray-600">ناوی کتێب</td>
                          <td className="py-3 font-medium">{fetchBook.title}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 text-gray-600">وتە</td>
                          <td className="py-3 font-medium">{fetchBook.quote || "بەردەست نیە"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className={series.length > 0 ? '' : 'hidden'}>
                    <h3 className="text-xl font-semibold mb-4">وردەکاری زنجیرە کتێب</h3>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 text-gray-600">ناوی زنجیرە</td>
                          <td className="py-3 font-medium">{series[0]?.series_title}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 text-gray-600">ڕیزبەندی ئەم کتێبە لە زنجیرەکە</td>
                          <td className="py-3 font-medium">{fetchBook.part_num} یەم</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 text-gray-600">بەشەکانی زنجیرەکە</td>
                          <td className="py-3 font-medium">{booksSeries?.length + 1} بەش</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 text-gray-600">باری زنجیرە</td>
                          <td className="py-3 font-medium">{series[0]?.state}</td>
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
                      src={fetchBook.imgURL}
                      alt={fetchBook.name}
                      className="w-[300px] h-[250px] rounded-lg shadow-md"
                    />
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-2xl font-bold mb-4">{fetchBook.name}</h3>
                    <p className="text-lg leading-relaxed mb-6">{fetchBook.bio}</p>
                    <div className="flex gap-3">
                      <button onClick={() => (window.location.href = `/AuthorDetails/${fetchBook.author_id}`)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                        بینینی نوسەر
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <ReviewSection />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={`bg-gray-100 py-12 ${booksSeries.length === 0 ? 'hidden' : ''}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl md:text-3xl font-bold">بەشەکانی تری {series[0]?.series_title} </h2>
            <BookCollection data={booksSeries} text="هەموو فیلمەکان" path="/Bookdetails" />
          </div>
        </div>

        <div className={`bg-gray-100 py-12 ${similarBooks.length === 0 ? 'hidden' : ''}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl md:text-3xl font-bold">هاوشێوەی ئەم کتێبە</h2>
            <BookCollection data={similarBooks} text="هەموو فیلمەکان" path="/Bookdetails" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookDetail;
