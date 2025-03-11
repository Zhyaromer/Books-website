import { useState, useEffect } from 'react';
import { Star, StarHalf } from 'lucide-react';
import { axiosInstance } from "../context/AxiosInstance";
import BookCollection from '../Components/layout/BookCard';
import { useNavigate } from "react-router-dom";
import BookstoreNavigation from "../Components/layout/Navigation";
import Footer from "../Components/layout/Footer";
import Pagination from "../Components/my-ui/Pagination";
import { useLocation } from "react-router-dom";

const UserProfile = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('saved');
    const [userData, setUserData] = useState([]);
    const [savedBooks, setSavedBooks] = useState([]);
    const [readBooks, setReadBooks] = useState([]);
    const [comments, setcomments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksTotal, setBooksTotal] = useState(0);
    const [readbooksTotal, setreadbooksTotal] = useState(0);
    const [commentsTotal, setcommentsTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
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
                    console.log("unauthorized");
                } else if (res.status === 404) {
                    console.log("not found");
                }
            } catch (error) {
                console.error(error);
            }
        }

        const fetchSavedBooks = async () => {
            try {
                const res = await axiosInstance.get(`/members/getmemberSavedBooks?username=${username}&page=${currentPage}&limit=${booksPerPage}`);
                if (res.data.foundBooks && Array.isArray(res.data.foundBooks)) {
                    setSavedBooks(res.data.foundBooks);
                    setBooksTotal(res.data.total || 0);
                    setTotalPages(Math.ceil((res.data.total || 0) / booksPerPage));
                } else {
                    setSavedBooks([]);
                    setTotalPages(0);
                }
            } catch (error) {
                console.error("Error fetching saved books:", error);
                setSavedBooks([]);
                setTotalPages(0);
            }
        }

        const fetchReadBooks = async () => {
            try {
                const res = await axiosInstance.get(`/members/getmemberReadBooks?username=${username}&page=${currentPage}&limit=${booksPerPage}`);
                if (res.data.foundBooks && Array.isArray(res.data.foundBooks)) {
                    setReadBooks(res.data.foundBooks);
                    setreadbooksTotal(res.data.total || 0);
                    setTotalPages(Math.ceil((res.data.total || 0) / booksPerPage));
                } else {
                    setReadBooks([]);
                    setTotalPages(0);
                }
            } catch (error) {
                console.error(error);
            }
        }

        const fetchComments = async () => {
            try {
                const res = await axiosInstance.get(`/members/getallmemberreviews?username=${username}&page=${currentPage}&limit=${commentsPerPage}`);
                console.log(res.data.total);
                if (res.data.comments && Array.isArray(res.data.comments)) {
                    setcomments(res.data.comments);
                    setcommentsTotal(res.data.total || 0);
                    setTotalPages(Math.ceil((res.data.total || 0) / commentsPerPage));
                } else {
                    setcomments([]);
                    setTotalPages(0);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchInfo();
        fetchSavedBooks();
        fetchReadBooks();
        fetchComments();
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

    return (
        <div>
            <BookstoreNavigation />
            <div className="min-h-screen bg-gray-50 p-4 pt-20" dir="rtl">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-row items-center">
                                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 border-2 border-blue-500">
                                    <img
                                        src={userData.coverImgURL}
                                        alt={userData.username}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="mr-4">
                                    <h1 className="text-xl font-bold text-gray-800">{userData.username}</h1>
                                    <p className="text-gray-600">{userData.name}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 text-right">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">دەربارەی من</h2>
                            <p className="text-gray-600 leading-relaxed">{userData.bio}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="flex border-b">
                            <button
                                className={`flex-1 py-3 font-medium ${activeTab === 'saved' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-500'}`}
                                onClick={() => { setActiveTab('saved'); resetPage() }}
                            >
                                بینینی دواتر
                            </button>
                            <button
                                className={`flex-1 py-3 font-medium ${activeTab === 'read' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-500'}`}
                                onClick={() => { setActiveTab('read'); resetPage() }}
                            >
                                خوێندراوەکان
                            </button>
                            <button
                                className={`flex-1 py-3 font-medium ${activeTab === 'comments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-500'}`}
                                onClick={() => { setActiveTab('comments'); resetPage() }}
                            >
                                هەڵسەنگاندنەکان
                            </button>
                        </div>

                        <div className="p-6">
                            {activeTab === 'saved' && (
                                <div dir='rtl' className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">بینینی دواتر ({booksTotal})</h3>
                                    <div className="flex border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                                        <BookCollection data={savedBooks} text="" path="/Bookdetails" />
                                    </div>

                                    {booksTotal > 12 && (
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                        />
                                    )}
                                </div>
                            )}

                            {activeTab === 'read' && (
                                <div className="space-y-6">
                                    <div dir='rtl' className="space-y-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">خوێندراوەکان ({readbooksTotal})</h3>
                                        <div className="flex border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                                            <BookCollection data={readBooks} text="" path="/Bookdetails" />
                                        </div>
                                    </div>
                                    {readbooksTotal > 12 && (
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                        />
                                    )}
                                </div>
                            )}

                            {activeTab === 'comments' && (
                                <div dir="rtl" className="w-fulll mx-auto p-4">
                                    <h2 className="text-xl font-bold mb-4 text-right text-gray-800">هەڵسەنگاندنەکان {`(${commentsTotal})`}</h2>
                                    <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {comments.length === 0 ? (
                                            <p className="text-gray-500 text-center py-4">هیچ هەڵسەنگاندنێک نییە</p>
                                        ) : (
                                            comments.map((review) => (
                                                <div
                                                    key={review.id}
                                                    className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden"
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
                                                                    <h3 onClick={() => navigate(`/booksDetail/${review.book_id}`)} className="cursor-pointer text-lg font-medium text-gray-900 mb-1">{review.title}</h3>
                                                                    <div className="flex items-center mb-2">
                                                                        <div className="flex">
                                                                            {renderStars(review.rating)}
                                                                        </div>
                                                                        <span className="mr-2 text-xs text-gray-500">({review.rating}/5)</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="h-32 overflow-y-auto pr-1 text-right custom-scrollbar">
                                                                <p className="text-sm text-gray-600 whitespace-pre-wrap">{review.comment}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    {commentsTotal > 6 && (
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                        />
                                    )}

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
        </div>
    );
};

export default UserProfile;