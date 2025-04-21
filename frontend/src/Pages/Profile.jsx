import { useState, useEffect } from 'react';
import { Cog, X, Save, MoreVertical, Star, StarHalf, Edit2, Trash2 } from 'lucide-react';
import { axiosInstance, useCheckAuth } from "../context/AxiosInstance";
import BookCollection from '../Components/layout/BookCard';
import { useNavigate } from "react-router-dom";
import BookstoreNavigation from "../Components/layout/Navigation";
import Footer from "../Components/layout/Footer";
import Pagination from "../Components/my-ui/Pagination";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useTheme } from "../context/ThemeContext";

const Profile = () => {
    const { main, secondary, tertiary } = useTheme();
    const navigate = useNavigate();
    const { isAuthenticated, authLoading } = useCheckAuth();
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, authLoading, navigate]);

    const [activeTab, setActiveTab] = useState('suggestion');
    const [userData, setUserData] = useState([]);
    const [savedBooks, setSavedBooks] = useState([]);
    const [readBooks, setReadBooks] = useState([]);
    const [suggestionBooks, setSuggestionBooks] = useState([]);
    const [suggestionstotal, setsuggestionstotal] = useState(0);
    const [comments, setcomments] = useState([]);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingReview, setEditingReview] = useState(null);
    
    // Pagination settings
    const booksPerPage = 12;
    const commentsPerPage = 6;
    
    // Separate current pages for each tab
    const [currentPages, setCurrentPages] = useState({
        suggestion: 1,
        saved: 1,
        read: 1,
        comments: 1
    });
    
    // Separate total counts for each tab
    const [totals, setTotals] = useState({
        suggestion: 0,
        saved: 0,
        read: 0,
        comments: 0
    });
    
    // Separate total pages for each tab
    const [totalPages, setTotalPages] = useState({
        suggestion: 1,
        saved: 1,
        read: 1,
        comments: 1
    });

    const [editFormData, setEditFormData] = useState({
        comment: '',
        rating: 0,
        hasSpoiler: false
    });

    // Get current page for active tab
    const getCurrentPage = () => currentPages[activeTab];
    
    // Get total pages for active tab
    const getCurrentTotalPages = () => totalPages[activeTab];
    
    // Get total items for active tab
    const getCurrentTotal = () => totals[activeTab];

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const res = await axiosInstance.get('/user/getuserinfo');
                if (res.status === 200) {
                    setUserData(res.data);
                } else if (res.status === 401) {
                    toast.error("unauthorized");
                } else if (res.status === 404) {
                    toast.error("not found");
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        }

        const fetchsuggestionBooks = async () => {
            try {
                const res = await axiosInstance.get(`/user/getsuggestions?page=${currentPages.suggestion}&limit=${booksPerPage}`);
                if (res.data.foundBooks && Array.isArray(res.data.foundBooks)) {
                    setSuggestionBooks(res.data.foundBooks);
                    setsuggestionstotal(res.data.total || 0);
                    setTotals(prev => ({...prev, suggestion: res.data.total || 0}));
                    setTotalPages(prev => ({...prev, suggestion: Math.ceil((res.data.total || 0) / booksPerPage)}));
                } else {
                    setSuggestionBooks([]);
                    setTotalPages(prev => ({...prev, suggestion: 0}));
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Something went wrong");
                setSuggestionBooks([]);
                setTotalPages(prev => ({...prev, suggestion: 0}));
            }
        }

        const fetchSavedBooks = async () => {
            try {
                const res = await axiosInstance.get(`/user/getSavedBooks?page=${currentPages.saved}&limit=${booksPerPage}`);
                if (res.data.foundBooks && Array.isArray(res.data.foundBooks)) {
                    setSavedBooks(res.data.foundBooks);
                    setTotals(prev => ({...prev, saved: res.data.total || 0}));
                    setTotalPages(prev => ({...prev, saved: Math.ceil((res.data.total || 0) / booksPerPage)}));
                } else {
                    setSavedBooks([]);
                    setTotalPages(prev => ({...prev, saved: 0}));
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Something went wrong");
                setSavedBooks([]);
                setTotalPages(prev => ({...prev, saved: 0}));
            }
        }

        const fetchReadBooks = async () => {
            try {
                const res = await axiosInstance.get(`/user/getReadBooks?page=${currentPages.read}&limit=${booksPerPage}`);
                if (res.data.foundBooks && Array.isArray(res.data.foundBooks)) {
                    setReadBooks(res.data.foundBooks);
                    setTotals(prev => ({...prev, read: res.data.total || 0}));
                    setTotalPages(prev => ({...prev, read: Math.ceil((res.data.total || 0) / booksPerPage)}));
                } else {
                    setReadBooks([]);
                    setTotalPages(prev => ({...prev, read: 0}));
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        }

        const fetchComments = async () => {
            try {
                const res = await axiosInstance.get(`/user/getUserComments?page=${currentPages.comments}&limit=${commentsPerPage}`);
                if (res.data.comments && Array.isArray(res.data.comments)) {
                    setcomments(res.data.comments);
                    setTotals(prev => ({...prev, comments: res.data.total || 0}));
                    setTotalPages(prev => ({...prev, comments: Math.ceil((res.data.total || 0) / commentsPerPage)}));
                } else {
                    setcomments([]);
                    setTotalPages(prev => ({...prev, comments: 0}));
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        }

        fetchInfo();
        
        // Fetch data based on active tab
        switch (activeTab) {
            case 'suggestion':
                fetchsuggestionBooks();
                break;
            case 'saved':
                fetchSavedBooks();
                break;
            case 'read':
                fetchReadBooks();
                break;
            case 'comments':
                fetchComments();
                break;
            default:
                fetchsuggestionBooks();
        }
    }, [activeTab, currentPages.suggestion, currentPages.saved, currentPages.read, currentPages.comments]);

    const toggleMenu = (id, e) => {
        e.stopPropagation();
        setOpenMenuId(openMenuId === id ? null : id);
    };

    const handleEdit = (id) => {
        const reviewToEdit = comments.find(review => review.id === id);
        if (reviewToEdit) {
            setEditingReview(reviewToEdit);
            setEditFormData({
                comment: reviewToEdit.comment,
                rating: reviewToEdit.rating
            });
            setIsModalOpen(true);
        }
        setOpenMenuId(null);
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/user/removeReview/${id}`);
            setcomments(comments.filter(comment => comment.id !== id));
            setTotals(prev => ({...prev, comments: prev.comments - 1}));
            setTotalPages(prev => ({...prev, comments: Math.ceil((prev.comments - 1) / commentsPerPage)}));
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setOpenMenuId(null);
        }
    };

    useEffect(() => {
        const handleClickOutside = () => {
            setOpenMenuId(null);
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingReview(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: name === 'rating' ? parseFloat(value) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!editingReview) return;

        if (editFormData.comment.trim() === '') {
            toast.error("Please enter a comment");
            return;
        }

        if (editFormData.comment.length > 3000 || editFormData.comment.length < 1) {
            toast.error("Comment must be between 1 and 3000 characters");
            return;
        }
        try {
            const res = await axiosInstance.patch(
                `/user/updateReview?review_id=${editingReview.id}`,
                {
                    comment: editFormData.comment,
                    rating: editFormData.rating,
                    hasSpoiler: editingReview.isSpoiler
                }
            );

            if (res.status === 200) {
                const updatedComments = comments.map(comment =>
                    comment.id === editingReview.id ?
                        { ...comment, comment: editFormData.comment, rating: editFormData.rating } :
                        comment
                );
                setcomments(updatedComments);

                handleModalClose();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

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

    const renderStarSelector = () => {
        const ratings = [1, 2, 3, 4, 5];

        return (
            <div className="flex flex-row-reverse justify-center mt-2">
                {ratings.map((value) => (
                    <label key={value} className="cursor-pointer">
                        <input
                            type="radio"
                            name="rating"
                            value={value}
                            checked={editFormData.rating === value}
                            onChange={handleInputChange}
                            className="sr-only"
                        />
                        <Star
                            className={`w-8 h-8 mx-1 ${value <= editFormData.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                                }`}
                        />
                    </label>
                ))}
            </div>
        );
    };

    const handlePageChange = (newPage) => {
        setCurrentPages(prev => ({...prev, [activeTab]: newPage}));
        const newParams = new URLSearchParams(location.search);
        newParams.set('page', newPage.toString());
        navigate({
            pathname: location.pathname,
            search: newParams.toString()
        }, { replace: true });
    };

    const resetPage = () => {
        setCurrentPages(prev => ({...prev, [activeTab]: 1}));
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
            <div className="min-h-screen bg-[#121212] p-4 pt-20" dir="rtl">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-[#1a1a1a] rounded-lg shadow-md p-6 mb-6">
                        <div className="flex flex-row justify-between items-start md:items-center">
                            <div className="flex flex-col md:flex-row md:items-center">
                                <div
                                    style={{ borderColor: secondary }}
                                    className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden bg-gray-200 border-2 border-[#1db954]">
                                    <img
                                        src={userData.coverImgURL}
                                        alt={userData.username}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="mr-0 md:mr-4">
                                    <h1 className="text-xl md:text-2xl font-bold text-gray-100">{userData.username}</h1>
                                    <p className="text-gray-300 text-lg md:text-xl">{userData.name}</p>
                                </div>
                            </div>

                            <div className='flex items-end'>
                                <button
                                    onClick={() => navigate('/settings')}
                                    className="p-2 rounded-full transition-colors"
                                    aria-label="گۆڕینی زانیارییەکان"
                                >
                                    <Cog size={33} className="text-gray-100" />
                                </button>
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
                                style={activeTab === 'suggestion' ? { color: secondary, borderColor: secondary } : {}}
                                className={`flex-1 py-3 text-xs md:text-lg font-bold transition-colors duration-300 ${activeTab === 'suggestion'
                                    ? 'border-b-[2px]'
                                    : 'text-gray-400 hover:text-gray-200'}`}
                                onClick={() => { setActiveTab('suggestion'); resetPage() }}
                            >
                                پێشنیارکراو
                            </button>
                            <button
                                style={activeTab === 'saved' ? { color: secondary, borderColor: secondary } : {}}
                                className={`flex-1 py-3 text-xs md:text-lg font-bold transition-colors duration-300 ${activeTab === 'saved'
                                    ? 'text-[#1db954] border-b-[2px] border-[#1db954]'
                                    : 'text-gray-400 hover:text-gray-200'}`}
                                onClick={() => { setActiveTab('saved'); resetPage() }}
                            >
                                لیستی دڵخواز
                            </button>
                            <button
                                style={activeTab === 'read' ? { color: secondary, borderColor: secondary } : {}}
                                className={`flex-1 py-3 text-xs md:text-lg font-bold transition-colors duration-300 ${activeTab === 'read'
                                    ? 'text-[#1db954] border-b-[2px] border-[#1db954]'
                                    : 'text-gray-400 hover:text-gray-200'}`}
                                onClick={() => { setActiveTab('read'); resetPage() }}
                            >
                                خوێندراوەکان
                            </button>
                            <button
                                style={activeTab === 'comments' ? { color: secondary, borderColor: secondary } : {}}
                                className={`flex-1 py-3 text-xs md:text-lg font-bold transition-colors duration-300 ${activeTab === 'comments'
                                    ? 'text-[#1db954] border-b-[2px] border-[#1db954]'
                                    : 'text-gray-400 hover:text-gray-200'}`}
                                onClick={() => { setActiveTab('comments'); resetPage() }}
                            >
                                هەڵسەنگاندنەکان
                            </button>
                        </div>

                        <div className="p-6">
                            {activeTab === 'suggestion' && (
                                <div dir='rtl' className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-100 mb-4">پێشنیارکراو ({totals.suggestion})</h3>
                                    <div className="flex pb-4 last:border-0 last:pb-0">
                                        <BookCollection data={suggestionBooks} text="" path="/Bookdetails" />
                                    </div>

                                    {totals.suggestion > booksPerPage && (
                                        <Pagination
                                            currentPage={getCurrentPage()}
                                            totalPages={getCurrentTotalPages()}
                                            onPageChange={handlePageChange}
                                        />
                                    )}
                                </div>
                            )}
                            {activeTab === 'saved' && (
                                <div dir='rtl' className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-100 mb-4"> لیستی دڵخواز ({totals.saved})</h3>
                                    <div className="flex pb-4 last:border-0 last:pb-0">
                                        <BookCollection data={savedBooks} text="" path="/Bookdetails" />
                                    </div>

                                    {totals.saved > booksPerPage && (
                                        <Pagination
                                            currentPage={getCurrentPage()}
                                            totalPages={getCurrentTotalPages()}
                                            onPageChange={handlePageChange}
                                        />
                                    )}
                                </div>
                            )}

                            {activeTab === 'read' && (
                                <div className="space-y-6">
                                    <div dir='rtl' className="space-y-6">
                                        <h3 className="text-lg font-semibold text-gray-100 mb-4">خوێندراوەکان ({totals.read})</h3>
                                        <div className="flex pb-4 last:border-0 last:pb-0">
                                            <BookCollection data={readBooks} text="" path="/Bookdetails" />
                                        </div>
                                    </div>
                                    {totals.read > booksPerPage && (
                                        <Pagination
                                            currentPage={getCurrentPage()}
                                            totalPages={getCurrentTotalPages()}
                                            onPageChange={handlePageChange}
                                        />
                                    )}
                                </div>
                            )}

                            {activeTab === 'comments' && (
                                <div dir="rtl" className="w-fulll mx-auto">
                                    <h3 className="text-lg font-semibold text-gray-100 mb-8">هەڵسەنگاندنەکان {`(${totals.comments})`}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#1a1a1a]">
                                        {comments.length === 0 ? (
                                            <p className="text-gray-500 text-center py-4">هیچ هەڵسەنگاندنێک نییە</p>
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
                                                            <div className="flex flex-row-reverse justify-between items-start">
                                                                <div className="relative z-50">
                                                                    <button
                                                                        onClick={(e) => toggleMenu(review.id, e)}
                                                                        className="p-1 rounded-full hover:bg-transparent"
                                                                    >
                                                                        <MoreVertical className="w-5 h-5 text-gray-100" />
                                                                    </button>
                                                                    {openMenuId === review.id && (
                                                                        <div className="absolute left-0 mt-1 w-32 bg-[#1a1a1a] rounded-md shadow-lg z-10 border-none">
                                                                            <div className="py-1">
                                                                                <button
                                                                                    onClick={() => handleEdit(review.id)}
                                                                                    className="flex items-center w-full px-3 py-2 text-sm text-gray-100 hover:text-gray-600 hover:bg-white justify-end"
                                                                                >
                                                                                    <span>دەستکاری</span>
                                                                                    <Edit2 className="w-4 h-4 mr-2" />
                                                                                </button>
                                                                                <button
                                                                                    onClick={() => handleDelete(review.id)}
                                                                                    className="flex items-center w-full px-3 py-2 text-sm text-gray-100 hover:text-gray-600 hover:bg-white justify-end"
                                                                                >
                                                                                    <span>سڕینەوە</span>
                                                                                    <Trash2 className="w-4 h-4 mr-2 text-red-500" />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                <div>
                                                                    <h3 onClick={() => navigate(`/booksDetail/${review.book_id}`)} className="cursor-pointer text-lg font-medium text-gray-100 mb-1">{review.title}</h3>
                                                                    <div className="flex items-center mb-2">
                                                                        <div className="flex">
                                                                            {renderStars(review.rating)}
                                                                        </div>
                                                                        <span className="mr-2 text-xs text-gray-300">({review.rating}/5)</span>
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

                                    {totals.comments > commentsPerPage && (
                                        <Pagination
                                            currentPage={getCurrentPage()}
                                            totalPages={getCurrentTotalPages()}
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

                {isModalOpen && editingReview && (
                    <div dir='rtl' className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-[#1a1a1a] rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden" dir="rtl">
                            <div className="flex justify-between items-center p-4 border-b-[1px] border-gray-500">
                                <h3 className="text-lg font-semibold text-gray-100">دەستکاری هەڵسەنگاندن</h3>
                                <button
                                    onClick={handleModalClose}
                                    className="p-1 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-200" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-4">
                                <div dir='rtl' className="mb-4">
                                    <div className="mb-2 text-center">
                                        <h4 className="text-md font-medium text-gray-300">{editingReview.title}</h4>
                                    </div>

                                    {renderStarSelector()}

                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">هەڵسەنگاندن</label>
                                        <textarea
                                            name="comment"
                                            value={editFormData.comment}
                                            onChange={handleInputChange}
                                            rows="5"
                                            placeholder='دەستکاری هەڵسەنگاندن'
                                            className="resize-none bg-[#1a1a1a] border-[1px] focus:border-2 border-gray-600 placeholder:text-gray-400 w-full px-3 py-2 text-gray-100 rounded-lg focus:outline-none"
                                            dir="rtl"
                                            onFocus={(e) => e.target.style.borderColor = secondary}
                                            onBlur={(e) => e.target.style.borderColor = 'rgb(107, 114, 128)'}
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="flex justify-end flex-row-reverse gap-2">
                                    <button
                                        type="button"
                                        onClick={handleModalClose}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                    >
                                        پاشگەزبوونەوە
                                    </button>
                                    <button
                                        type="submit"
                                        style={{ backgroundColor: secondary }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = tertiary)}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = secondary)}
                                        className="px-4 py-2 text-sm font-medium text-white rounded-md flex items-center transition-colors duration-200"
                                    >
                                        <Save className="w-4 h-4 ml-1" />
                                        <span>پاشەکەوتکردن</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
            <Footer />
            <ToastContainer draggable={true} transition={Slide} autoClose={2000} />
        </div>
    );
};

export default Profile;