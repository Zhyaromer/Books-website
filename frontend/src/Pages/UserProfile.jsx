import { useState, useEffect } from 'react';
import { Star, StarHalf } from 'lucide-react';
import { axiosInstance } from "../context/AxiosInstance";
import BookCollection from '../Components/layout/BookCard';
import { useNavigate } from "react-router-dom";
import BookstoreNavigation from "../Components/layout/Navigation";
import Footer from "../Components/layout/Footer";
import Pagination from "../Components/my-ui/Pagination";
import { useLocation } from "react-router-dom";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './NotFound';
import { useTheme } from "../context/ThemeContext";

const UserProfile = () => {
    const { main, secondary, tertiary } = useTheme();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('saved');
    const [userData, setUserData] = useState([]);
    const [savedBooks, setSavedBooks] = useState([]);
    const [readBooks, setReadBooks] = useState([]);
    const [suggestionBooks, setSuggestionBooks] = useState([]);
    const [comments, setcomments] = useState([]);
    const [hasfound, setHasFound] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksTotal, setBooksTotal] = useState(0);
    const [readbooksTotal, setreadbooksTotal] = useState(0);
    const [suggestionstotal, setsuggestionstotal] = useState(0);
    const [commentsTotal, setcommentsTotal] = useState(0);
    const [savedBooksTotalPages, setSavedBooksTotalPages] = useState(1);
    const [readBooksTotalPages, setReadBooksTotalPages] = useState(1);
    const [suggestionsTotalPages, setSuggestionsTotalPages] = useState(1);
    const [commentsTotalPages, setCommentsTotalPages] = useState(1);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get("username");
    const booksPerPage = 12;
    const commentsPerPage = 6;

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const res = await axiosInstance.get(`/members/getmemberinfo?username=${username}`);
                if (res.status === 200) {
                    setUserData(res.data);
                } else if (res.status === 401) {
                    toast.error('You are not authorized to view this page');
                }
            } catch (error) {
                if (error.response.status === 404) {
                    setHasFound(false);
                }
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        }

        const fetchSavedBooks = async () => {
            try {
                const res = await axiosInstance.get(`/members/getmemberSavedBooks?username=${username}&page=${currentPage}&limit=${booksPerPage}`);
                if (res.data.foundBooks && Array.isArray(res.data.foundBooks)) {
                    setSavedBooks(res.data.foundBooks);
                    setBooksTotal(res.data.total || 0);
                    setSavedBooksTotalPages(Math.ceil((res.data.total || 0) / booksPerPage));
                } else {
                    setSavedBooks([]);
                    setSavedBooksTotalPages(0);
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Something went wrong");
                setSavedBooks([]);
                setSavedBooksTotalPages(0);
            }
        }

        const fetchReadBooks = async () => {
            try {
                const res = await axiosInstance.get(`/members/getmemberReadBooks?username=${username}&page=${currentPage}&limit=${booksPerPage}`);
                if (res.data.foundBooks && Array.isArray(res.data.foundBooks)) {
                    setReadBooks(res.data.foundBooks);
                    setreadbooksTotal(res.data.total || 0);
                    setReadBooksTotalPages(Math.ceil((res.data.total || 0) / booksPerPage));
                } else {
                    setReadBooks([]);
                    setReadBooksTotalPages(0);
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Something went wrong");
                setReadBooks([]);
                setReadBooksTotalPages(0);
            }
        }

        const fetchSuggestions = async () => {
            try {
                const res = await axiosInstance.get(`/members/getmembersuggestion?username=${username}&page=${currentPage}&limit=${booksPerPage}`);
                if (res.data.foundBooks && Array.isArray(res.data.foundBooks)) {
                    console.log(Math.ceil(res.data.total || 0) / booksPerPage);
                    console.log(res.data.total);
                    setSuggestionBooks(res.data.foundBooks);
                    setsuggestionstotal(res.data.total || 0);
                    setSuggestionsTotalPages(Math.ceil((res.data.total || 0) / booksPerPage));
                } else {
                    setSuggestionBooks([]);
                    setSuggestionsTotalPages(0);
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Something went wrong");
                setSuggestionBooks([]);
                setSuggestionsTotalPages(0);
            }
        }

        const fetchComments = async () => {
            try {
                const res = await axiosInstance.get(`/members/getallmemberreviews?username=${username}&page=${currentPage}&limit=${commentsPerPage}`);
                if (res.data.comments && Array.isArray(res.data.comments)) {
                    setcomments(res.data.comments);
                    setcommentsTotal(res.data.total || 0);
                    setCommentsTotalPages(Math.ceil((res.data.total || 0) / commentsPerPage));
                } else {
                    setcomments([]);
                    setCommentsTotalPages(0);
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Something went wrong");
                setcomments([]);
                setCommentsTotalPages(0);
                setTotalPages(0);
            }
        }

        fetchInfo();
        fetchSavedBooks();
        fetchReadBooks();
        fetchComments();
        fetchSuggestions();
    }, [currentPage, username]);

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Star key={`star-${i}`} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            );
        }

        if (hasHalfStar) {
            stars.push(
                <StarHalf key="half-star" className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            );
        }

        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <Star key={`empty-star-${i}`} className="w-4 h-4 text-gray-300" />
            );
        }

        return stars;
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        const newParams = new URLSearchParams(location.search);
        newParams.set('page', newPage.toString());
        navigate({
            pathname: location.pathname,
            search: newParams.toString()
        }, { replace: true });
    };

    const resetPage = () => {
        setCurrentPage(1);
        const newParams = new URLSearchParams(location.search);
        newParams.delete('page');
        navigate({
            pathname: location.pathname,
            search: newParams.toString()
        }, { replace: true });
    }

    if (!hasfound) {
        return <NotFound />
    }

    return (
        <div>
            <BookstoreNavigation />
            <div className="min-h-screen bg-[#121212] p-4 pt-20" dir="rtl">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-[#1a1a1a] rounded-lg shadow-md p-6 mb-6">
                        <div className="flex flex-row justify-between items-start">
                            <div className="flex items-center">
                                <div style={{borderColor : secondary}} className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden bg-gray-200 border-2">
                                    <img
                                        src={userData.coverImgURL}
                                        alt={userData.username}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="mr-4">
                                    <h1 className="text-xl md:text-2xl font-bold text-gray-100">{userData.username}</h1>
                                    <p className="text-gray-300 text-lg md:text-xl">{userData.name}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 text-right">
                            <h2 className="text-lg font-semibold text-gray-200 mb-2">دەربارەی من</h2>
                            <p className="text-gray-300 leading-relaxed">{userData.bio}</p>
                        </div>
                    </div>

                    <div className="bg-[#1a1a1a] rounded-lg shadow-md overflow-hidden">
                        <div className="flex items-center justify-center md:justify-start border-b-[1px] border-gray-600">
                            <button
                                style={activeTab === 'saved' ? { color: secondary, borderColor: secondary } : {}}
                                className={`flex-1 py-3 text-xs md:text-lg font-bold transition-colors duration-300  ${activeTab === 'saved'
                                    ? 'border-b-[2px]'
                                    : 'text-gray-400 hover:text-gray-200'}`}
                                onClick={() => { setActiveTab('saved'); resetPage(); }}
                            >
                                لیستی دڵخواز
                            </button>
                            <button
                                style={activeTab === 'read' ? { color: secondary, borderColor: secondary } : {}}

                                className={`flex-1 py-3 text-xs md:text-lg font-bold transition-colors duration-300 ${activeTab === 'read'
                                    ? 'border-b-[2px]'
                                    : 'text-gray-400 hover:text-gray-200'}`}
                                onClick={() => { setActiveTab('read'); resetPage(); }}
                            >
                                خوێندراوەکان
                            </button>
                            <button
                                style={activeTab === 'suggestionBooks' ? { color: secondary, borderColor: secondary } : {}}

                                className={`flex-1 py-3 text-xs md:text-lg font-bold transition-colors duration-300 ${activeTab === 'suggestionBooks'
                                    ? 'border-b-[2px]'
                                    : 'text-gray-400 hover:text-gray-200'}`}
                                onClick={() => { setActiveTab('suggestionBooks'); resetPage(); }}
                            >
                                پێشنیارکراو
                            </button>
                            <button
                                style={activeTab === 'comments' ? { color: secondary, borderColor: secondary } : {}}

                                className={`flex-1 py-3 text-xs md:text-lg font-bold transition-colors duration-300 ${activeTab === 'comments'
                                    ? 'border-b-[2px]'
                                    : 'text-gray-400 hover:text-gray-200'}`}
                                onClick={() => { setActiveTab('comments'); resetPage(); }}
                            >
                                هەڵسەنگاندنەکان
                            </button>
                        </div>

                        <div className="p-6 pb-12">
                            {activeTab === 'saved' && (
                                <div dir='rtl' className="space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-100">بینینی دواتر ({booksTotal})</h3>
                                    <div className="flex border-b border-gray-600 pb-4 last:border-0 last:pb-0">
                                        <BookCollection data={savedBooks} text="" path="/Bookdetails" />
                                    </div>

                                    <div>
                                        {booksTotal > 12 && (
                                            <Pagination
                                                currentPage={currentPage}
                                                totalPages={savedBooksTotalPages}
                                                onPageChange={handlePageChange}
                                            />
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'read' && (
                                <div dir='rtl' className="space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-100">خوێندراوەکان ({readbooksTotal})</h3>
                                    <div className="flex border-b border-gray-600 pb-4 last:border-0 last:pb-0">
                                        <BookCollection data={readBooks} text="" path="/Bookdetails" />
                                    </div>
                                    <div>
                                        {readbooksTotal > 12 && (
                                            <Pagination
                                                currentPage={currentPage}
                                                totalPages={readBooksTotalPages}
                                                onPageChange={handlePageChange}
                                            />
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'suggestionBooks' && (
                                <div dir='rtl' className="space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-100">پێشنیارکراوەکان ({suggestionstotal})</h3>
                                    <div className="flex border-b border-gray-600 pb-4 last:border-0 last:pb-0">
                                        <BookCollection data={suggestionBooks} text="" path="/Bookdetails" />
                                    </div>
                                    <div>
                                        {suggestionstotal > 12 && (
                                            <Pagination
                                                currentPage={currentPage}
                                                totalPages={suggestionsTotalPages}
                                                onPageChange={handlePageChange}
                                            />
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'comments' && (
                                <div dir="rtl" className="space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-100 mb-14">هەڵسەنگاندنەکان {`(${commentsTotal})`}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-600 pb-10 last:border-0 last:pb-0">
                                        {comments.length === 0 ? (
                                            <p className="text-gray-100 text-center py-4">هیچ هەڵسەنگاندنێک نییە</p>
                                        ) : (
                                            comments.map((review) => (
                                                <div
                                                    key={review.id}
                                                    className="bg-[#121212] rounded-lg shadow-md border-none overflow-hidden"
                                                >
                                                    <div className="flex p-4 h-48">
                                                        <div className="flex-shrink-0 ml-4">
                                                            <img
                                                                className="h-40 w-18 object-cover rounded shadow-sm"
                                                                src={review.cover_image}
                                                                alt={`Cover of ${review.title}`}
                                                                onError={(e) => {
                                                                    e.target.src = "/api/placeholder/100/150";
                                                                    e.target.alt = "Placeholder image";
                                                                }}
                                                            />
                                                        </div>

                                                        <div className="flex-grow overflow-hidden">
                                                            <div className="flex flex-row-reverse justify-end items-start">
                                                                <div>
                                                                    <h3 onClick={() => navigate(`/booksDetail/${review.book_id}`)} className="cursor-pointer text-lg font-medium text-gray-100 mb-1">{review.title}</h3>
                                                                    <div className="flex items-center mb-2">
                                                                        <div className="flex">
                                                                            {renderStars(review.rating)}
                                                                        </div>
                                                                        <span className="mr-2 text-xs text-gray-400">({review.rating}/5)</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="h-32 overflow-y-auto pr-1 text-right custom-scrollbar">
                                                                <p className="text-sm text-gray-300 whitespace-pre-wrap">{review.comment}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    <div>
                                        {commentsTotal > 6 && (
                                            <Pagination
                                                currentPage={currentPage}
                                                totalPages={commentsTotalPages}
                                                onPageChange={handlePageChange}
                                            />
                                        )}
                                    </div>

                                    <style>{`
                            .custom-scrollbar::-webkit-scrollbar {
                              width: 4px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-track {
                              background: #f1f1f1;
                              border-radius: 10px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-thumb {
                              background: #888;
                              border-radius: 10px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                              background: #555;
                            }
                          `}</style>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
            <ToastContainer draggable={true} transition={Slide} autoClose={2000} />
        </div>
    );
};

export default UserProfile;