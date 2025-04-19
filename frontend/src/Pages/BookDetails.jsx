import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaShare } from 'react-icons/fa';
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import BookCollection from '../Components/layout/BookCard';
import CommentsSection from '../Components/layout/ReviewSection';
import BookstoreNavigation from '../Components/layout/Navigation';
import Footer from '../Components/layout/Footer';
import { axiosInstance } from "../context/AxiosInstance";
import { Star } from "lucide-react";
import LoadingUi from '../Components/my-ui/Loading';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom";
import NotFound from './NotFound';
import { useTheme } from "../context/ThemeContext";

const BookDetail = () => {
  const { main, secondary, tertiary } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [fetchBook, setFetchBook] = useState([]);
  const [series, setSeries] = useState([]);
  const [booksSeries, setBooksSeries] = useState([]);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [hasRead, setHasRead] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [hasSuggested, setHasSuggested] = useState(false);
  const [hasfound, setHasFound] = useState(true);

  useEffect(() => {
    const incrementViewCount = async () => {
      try {
        await axiosInstance.get(`/books/incrementbookview/${id}`);
      } catch {
        // silent ignore
      }
    }

    const fetchBook = async () => {
      try {
        const response = await axiosInstance.get(`/books/getBookById/${id}`);
        if (response.status === 200) {
          setFetchBook(response.data.book);
          setSeries(response.data.series);
          setBooksSeries(response.data.seriesBooks);
          setSimilarBooks(response.data.similarBooks);
        }
      } catch (error) {
        if (error.response.status === 404) {
          setHasFound(false);
        }
        toast.error(error.response?.data?.message || "Something went wrong");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    const bookreadsCheck = async () => {
      try {
        const response = await axiosInstance.get(`/user/bookreadsCheck?book_id=${id}`);
        if (response.data.success) {
          setHasRead(true);
        } else {
          setHasRead(false);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }

    const booksavesCheck = async () => {
      try {
        const response = await axiosInstance.get(`/user/booksSaveCheck?book_id=${id}`);
        if (response.data.success) {
          setHasSaved(true);
        } else {
          setHasSaved(false);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }

    const booksuggestedCheck = async () => {
      try {
        const response = await axiosInstance.get(`/user/suggestionscheck?book_id=${id}`);
        if (response.data.success) {
          setHasSuggested(true);
        } else {
          setHasSuggested(false);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }

    incrementViewCount();
    fetchBook();
    bookreadsCheck();
    booksavesCheck();
    booksuggestedCheck();
  }, [id]);

  const addBooktoRead = async () => {
    try {
      const response = await axiosInstance.post(`/user/addReadBook/${id}`);
      if (response.status === 201 || response.status === 200) {
        setHasRead(!hasRead);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  const addBooktoSave = async () => {
    try {
      const response = await axiosInstance.post(`/user/addSaveBook/${id}`);
      if (response.status === 201 || response.status === 200) {
        setHasSaved(!hasSaved);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  const handleaddSuggestion = async () => {
    try {
      const response = await axiosInstance.post(`/user/addsuggestion/${id}`);
      if (response.status === 201 || response.status === 200) {
        setHasSuggested(!hasSuggested);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  if (!hasfound) {
    return <NotFound />
  }

  if (loading) {
    return <LoadingUi />
  }

  return (
    <div>
      <BookstoreNavigation />
      <div dir='rtl' className="bg-[#121212] min-h-screen pt-16">
        <div className="bg-[#1a1a1a] text-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-2/3 lg:w-1/3 mb-8 md:mb-0">
                <div className="relative">
                  <img
                    src={fetchBook.cover_image}
                    alt={fetchBook.title}
                    className="w-64 h-[390px] mx-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              <div className="md:w-2/3 md:pl-12">
                <div className="flex items-center mb-2">
                  <span
                    style={{ backgroundColor: tertiary }}
                    onMouseEnter={(e => (e.target.style.backgroundColor = secondary))}
                    onMouseLeave={(e => (e.target.style.backgroundColor = tertiary))}
                    onClick={() => navigate(`/books?genre=${fetchBook.genre}`)} className="text-base px-2 py-1 rounded-full mr-2 cursor-pointer transition-colors duration-200">
                    {fetchBook.genre}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-2">{fetchBook.title}</h1>
                <p onClick={() => navigate(`/AuthorDetails/${fetchBook.author_id}`)} className="text-xl mb-4 cursor-pointer">نووسەر: <span className="font-semibold">{fetchBook.name}</span></p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <button onClick={() => addBooktoRead()} className="bg-[#121212] border border-gray-700 hover:bg-[#242121] text-white px-4 py-3 rounded-lg font-bold transition-colors duration-200 flex items-center">
                    <div className="flex flex-row items-center gap-2">
                      <div>
                        <span>خوێندراوەتەوە </span>
                      </div>
                      <div>
                        {hasRead ?
                          <svg className='h-5 w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#00FF00" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" /></svg>
                          :
                          <svg className='h-5 w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" /></svg>
                        }
                      </div>
                    </div>
                  </button>
                  <button onClick={() => addBooktoSave()} className="bg-[#121212] border border-gray-700 hover:bg-[#242121] text-white px-4 py-3 rounded-lg font-bold transition-colors duration-200 flex items-center">
                    <div className="flex flex-row items-center">
                      <div>
                        لیستی دڵخواز
                      </div>
                      <div>
                        {hasSaved ?
                          <FaHeart className="mr-2 text-red-500 h-5 w-5" />
                          :
                          <FiHeart className="mr-2 h-5 w-5" />
                        }
                      </div>
                    </div>
                  </button>
                  <button onClick={() => handleaddSuggestion()} className="bg-[#121212] border border-gray-700 hover:bg-[#242121] text-white px-4 py-3 rounded-lg font-bold transition-colors duration-200 flex items-center">
                    <div className="flex flex-row items-center">
                      <div>
                        پێشنیار کردن
                      </div>
                      <div>
                        {hasSuggested ?
                          <Star className="mr-2 text-yellow-500 fill-current" />
                          :
                          <Star className="mr-2" />
                        }
                      </div>
                    </div>
                  </button>
                  <button onClick={() => copyLink()} className="bg-[#121212] border border-gray-700 hover:bg-[#242121] text-white p-3 rounded-lg transition-colors duration-200">
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
                    <p onClick={() => navigate(`/books?language=${fetchBook.language}`)} className="font-semibold cursor-pointer">{fetchBook.language}</p>
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

        <div className="container max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-12">
          <div className="bg-[#121212] rounded-xl shadow-lg overflow-hidden">
            <div className="flex justify-start border-b border-gray-700">
              <div className="flex w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab('description')}
                  style={activeTab === 'description' ? { color: secondary } : { }}
                  className={`relative px-6 py-4 text-sm md:text-lg font-bold transition-colors duration-300 ${activeTab === 'description'
                    ? ''
                    : 'text-gray-400 hover:text-gray-200'
                    }`}
                >
                  کورتە
                  {activeTab === 'description' && (
                    <span
                    style={activeTab === 'description' ? { backgroundColor: secondary } : { }}
                    className="absolute bottom-0 left-0 w-full h-1 bg-[#1db954] rounded-t-md"></span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  style={activeTab === 'details' ? { color: secondary } : { }}
                  className={`relative px-6 py-4 text-sm md:text-lg font-bold transition-colors duration-200 ${activeTab === 'details'
                    ? 'text-[#1db954]'
                    : 'text-gray-400 hover:text-gray-200'
                    }`}
                >
                  وردەکاری
                  {activeTab === 'details' && (
                    <span 
                    style={activeTab === 'details' ? { backgroundColor: secondary } : { }}
                    className="absolute bottom-0 left-0 w-full h-1 bg-[#1db954] rounded-t-md"></span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('author')}
                  style={activeTab === 'author' ? { color: secondary } : { }}
                  className={`relative px-6 py-4 text-sm md:text-lg font-bold transition-colors duration-200 ${activeTab === 'author'
                    ? 'text-[#1db954]'
                    : 'text-gray-400 hover:text-gray-200'
                    }`}
                >
                  نووسەر
                  {activeTab === 'author' && (
                    <span 
                    style={activeTab === 'author' ? { backgroundColor: secondary } : { }}
                    className="absolute bottom-0 left-0 w-full h-1 bg-[#1db954] rounded-t-md"></span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  style={activeTab === 'reviews' ? { color: secondary } : { }}
                  className={`relative px-6 py-4 text-sm md:text-lg font-bold transition-colors duration-200 ${activeTab === 'reviews'
                    ? 'text-[#1db954]'
                    : 'text-gray-400 hover:text-gray-200'
                    }`}
                >
                  هەڵسەنگاندن
                  {activeTab === 'reviews' && (
                    <span 
                    style={activeTab === 'reviews' ? { backgroundColor: secondary } : { }}
                    className="absolute bottom-0 left-0 w-full h-1 bg-[#1db954] rounded-t-md"></span>
                  )}
                </button>
              </div>
            </div>

            <div>
              {activeTab === 'description' && (
                <div className="prose max-w-none p-6">
                  <p className="text-lg text-gray-100 leading-relaxed">{fetchBook.description}</p>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                  <div>
                    <h3 className="text-xl text-gray-300 font-semibold mb-4">وردەکاری کتێب</h3>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 text-gray-100">ناوی کتێب</td>
                          <td className="py-3 text-gray-300 font-medium">{fetchBook.title}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 text-gray-100">وتە</td>
                          <td className="py-3 text-gray-300 font-medium">{fetchBook.quote || "بەردەست نیە"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className={series.length > 0 ? '' : 'hidden'}>
                    <h3 className="text-xl text-gray-300 font-semibold mb-4">وردەکاری زنجیرە کتێب</h3>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 text-gray-100">ناوی زنجیرە</td>
                          <td className="py-3 text-gray-300 font-medium">{series[0]?.series_title}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 text-gray-100">ڕیزبەندی ئەم کتێبە لە زنجیرەکە</td>
                          <td className="py-3 text-gray-300 font-medium">{fetchBook.part_num} یەم</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 text-gray-100">بەشەکانی زنجیرەکە</td>
                          <td className="py-3 text-gray-300 font-medium">{booksSeries?.length + 1} بەش</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 text-gray-100">باری زنجیرە</td>
                          <td className="py-3 text-gray-300 font-medium">{series[0]?.state}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'author' && (
                <div className="flex flex-col md:flex-row gap-8 p-6">
                  <div className="md:w-1/4">
                    <img
                      src={fetchBook.imgURL}
                      alt={fetchBook.name}
                      className="w-[300px] h-[250px] rounded-lg shadow-md"
                    />
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-2xl text-gray-100 font-bold mb-4">{fetchBook.name}</h3>
                    <p className="text-lg text-gray-300 line-clamp-3 leading-relaxed mb-6">{fetchBook.bio}</p>
                    <div className="flex gap-3">
                      <button 
                      style={{ backgroundColor: secondary }}
                      onMouseEnter={(e => (e.target.style.backgroundColor = tertiary))}
                      onMouseLeave={(e => (e.target.style.backgroundColor = secondary))}
                      onClick={() => navigate(`/AuthorDetails/${fetchBook.author_id}`)} className="bg-[#1db954] hover:bg-[#1ed760] text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                        بینینی نوسەر
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <CommentsSection bookId={id} />
              )}
            </div>
          </div>
        </div>

        <div className={`max-w-7xl mx-auto w-full px-6 bg-[#121212] py-12 ${booksSeries.length === 0 ? 'hidden' : ''}`}>
          <div className="container pt-8 bg-[#1a1a1a] mx-auto">
            <h2 className="text-xl text-gray-100 md:text-3xl px-4 font-bold">بەشەکانی تری {series[0]?.series_title} </h2>
            <BookCollection data={booksSeries} text="هەموو فیلمەکان" path="/Bookdetails" />
          </div>
        </div>

        <div className={`max-w-7xl mx-auto w-full px-6 bg-[#121212] py-12 ${similarBooks.length === 0 ? 'hidden' : ''}`}>
          <div className="container pt-8 bg-[#1a1a1a] mx-auto">
            <h2 className="text-xl text-gray-100 md:text-3xl px-4 font-bold">هاوشێوەی ئەم کتێبە</h2>
            <BookCollection data={similarBooks} text="هەموو فیلمەکان" path="/Bookdetails" />
          </div>
        </div>
      </div >
      <Footer />
      <ToastContainer draggable={true} transition={Slide} autoClose={2000} />
    </div >
  );
};

export default BookDetail;