import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaBookmark, FaRegBookmark, FaShare } from 'react-icons/fa';
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

const BookDetail = () => {
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
      <div dir='rtl' className="bg-gray-50 min-h-screen pt-16">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12">
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
                  <span onClick={() => navigate(`/books?genre=${fetchBook.genre}`)} className="text-xs bg-blue-700 bg-opacity-50 px-2 py-1 rounded-full mr-2 cursor-pointer">
                    {fetchBook.genre}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-2">{fetchBook.title}</h1>
                <p onClick={() => navigate(`/AuthorDetails/${fetchBook.author_id}`)} className="text-xl mb-4 cursor-pointer">نووسەر: <span className="font-semibold">{fetchBook.name}</span></p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <button onClick={() => addBooktoRead()} className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-bold transition-colors duration-200 flex items-center">
                    <div className="flex items-center gap-2">
                      <div>
                        {hasRead ?
                          <svg className='h-4 w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#63E6BE" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" /></svg>
                          :
                          <svg className='h-4 w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" /></svg>
                        }
                      </div>
                      <div>
                        <span>خوێندراوەتەوە </span>
                      </div>
                    </div>
                  </button>
                  <button onClick={() => addBooktoSave()} className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-900 text-white px-4 py-3 rounded-lg font-bold transition-colors duration-200 flex items-center">
                    <div className="flex flex-row items-center">
                      <div>
                        بینینی دواتر
                      </div>
                      <div>
                        {hasSaved ?
                          <FaBookmark className="mr-2" />
                          :
                          <FaRegBookmark className="mr-2" />
                        }
                      </div>
                    </div>
                  </button>
                  <button onClick={() => handleaddSuggestion()} className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-900 text-white px-4 py-3 rounded-lg font-bold transition-colors duration-200 flex items-center">
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
                  <button onClick={() => copyLink()} className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-900 text-white p-3 rounded-lg transition-colors duration-200">
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

            <div>
              {activeTab === 'description' && (
                <div className="prose max-w-none p-6">
                  <p className="text-lg leading-relaxed">{fetchBook.description}</p>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
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
                <div className="flex flex-col md:flex-row gap-8 p-6">
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
                      <button onClick={() => navigate(`/AuthorDetails/${fetchBook.author_id}`)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
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
      </div >
      <Footer />
      <ToastContainer draggable={true} transition={Slide} autoClose={2000} />
    </div >
  );
};

export default BookDetail;