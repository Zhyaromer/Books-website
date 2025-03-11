import { useState, useEffect } from 'react';
import { Cog, X, Save, MoreVertical, Star, StarHalf, Edit2, Trash2 } from 'lucide-react';
import { axiosInstance } from "../context/AxiosInstance";
import BookCollection from '../Components/layout/BookCard';
import { useNavigate } from "react-router-dom";
import BookstoreNavigation from "../Components/layout/Navigation";
import Footer from "../Components/layout/Footer";

const Profile = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('saved');
    const [userData, setUserData] = useState([]);
    const [savedBooks, setSavedBooks] = useState([]);
    const [readBooks, setReadBooks] = useState([]);
    const [comments, setcomments] = useState([]);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingReview, setEditingReview] = useState(null);
    const [editFormData, setEditFormData] = useState({
        comment: '',
        rating: 0,
        hasSpoiler: false
    });

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const res = await axiosInstance.get('/user/getuserinfo');
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
                const res = await axiosInstance.get('/user/getSavedBooks');
                setSavedBooks(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        const fetchReadBooks = async () => {
            try {
                const res = await axiosInstance.get('/user/getReadBooks');
                setReadBooks(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        const fetchComments = async () => {
            try {
                const res = await axiosInstance.get('/user/getUserComments');
                setcomments(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchInfo();
        fetchSavedBooks();
        fetchReadBooks();
        fetchComments();
    }, []);

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
        } catch (error) {
            console.error(error);
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
            console.error("Error updating comment:", error);
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

    return (
        <div>
            <BookstoreNavigation />
            <div className="min-h-screen bg-gray-50 p-4 pt-20" dir="rtl">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className="flex flex-row justify-between items-start md:items-center">
                            <div className="flex flex-col md:flex-row md:items-center">
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

                            <button
                            onClick={() => navigate('/settings')}
                                className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
                                aria-label="گۆڕینی زانیارییەکان"
                            >
                                <Cog size={24} className="text-gray-700" />
                            </button>
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
                                onClick={() => setActiveTab('saved')}
                            >
                                بینینی دواتر
                            </button>
                            <button
                                className={`flex-1 py-3 font-medium ${activeTab === 'read' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-500'}`}
                                onClick={() => setActiveTab('read')}
                            >
                                خوێندراوەکان
                            </button>
                            <button
                                className={`flex-1 py-3 font-medium ${activeTab === 'comments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-500'}`}
                                onClick={() => setActiveTab('comments')}
                            >
                                هەڵسەنگاندنەکان
                            </button>
                        </div>

                        <div className="p-6">
                            {activeTab === 'saved' && (
                                <div dir='rtl' className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">بینینی دواتر ({savedBooks.length})</h3>
                                    <div className="flex border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                                        <BookCollection data={savedBooks} text="" path="/Bookdetails" />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'read' && (
                                <div className="space-y-6">
                                    <div dir='rtl' className="space-y-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">بینینی دواتر ({readBooks.length})</h3>
                                        <div className="flex border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                                            <BookCollection data={readBooks} text="" path="/Bookdetails" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'comments' && (
                                <div dir="rtl" className="w-fulll mx-auto p-4">
                                    <h2 className="text-xl font-bold mb-4 text-right text-gray-800">هەڵسەنگاندنەکان {`(${comments.length})`}</h2>
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
                                                            <div className="flex flex-row-reverse justify-between items-start">
                                                                <div className="relative z-50">
                                                                    <button
                                                                        onClick={(e) => toggleMenu(review.id, e)}
                                                                        className="p-1 rounded-full hover:bg-gray-100"
                                                                    >
                                                                        <MoreVertical className="w-5 h-5 text-gray-500" />
                                                                    </button>

                                                                    {openMenuId === review.id && (
                                                                        <div className="absolute left-0 mt-1 w-32 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                                                            <div className="py-1">
                                                                                <button
                                                                                    onClick={() => handleEdit(review.id)}
                                                                                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 justify-end"
                                                                                >
                                                                                    <span>دەستکاری</span>
                                                                                    <Edit2 className="w-4 h-4 mr-2" />
                                                                                </button>
                                                                                <button
                                                                                    onClick={() => handleDelete(review.id)}
                                                                                    className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100 justify-end"
                                                                                >
                                                                                    <span>سڕینەوە</span>
                                                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>

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
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden" dir="rtl">
                            <div className="flex justify-between items-center p-4 border-b">
                                <h3 className="text-lg font-semibold text-gray-800">دەستکاری هەڵسەنگاندن</h3>
                                <button
                                    onClick={handleModalClose}
                                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-4">
                                <div dir='rtl' className="mb-4">
                                    <div className="mb-2 text-center">
                                        <h4 className="text-md font-medium text-gray-700">{editingReview.title}</h4>
                                    </div>

                                    {renderStarSelector()}

                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">هەڵسەنگاندن</label>
                                        <textarea
                                            name="comment"
                                            value={editFormData.comment}
                                            onChange={handleInputChange}
                                            rows="5"
                                            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            dir="rtl"
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="flex justify-start">
                                    <button
                                        type="button"
                                        onClick={handleModalClose}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 ml-2"
                                    >
                                        پاشگەزبوونەوە
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center"
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
        </div>
    );
};

export default Profile;