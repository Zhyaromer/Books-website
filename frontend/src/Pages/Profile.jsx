import { useState, useEffect } from 'react';
import { Cog, X, Save, Edit } from 'lucide-react';
import { axiosInstance } from "../context/AxiosInstance";
import BookCollection from '../Components/layout/BookCard';

const Profile = () => {
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('saved');
    const [userData, setUserData] = useState([]);
    const [savedBooks, setSavedBooks] = useState([]);
    const [readBooks, setReadBooks] = useState([]);
    const [comments, setcomments] = useState([]);
  

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSaveChanges = (newData) => {
        setUserData({ ...userData, ...newData });
        closeModal();
    };

    const ProfileEditModal = () => {
        const [formData, setFormData] = useState({
            username: userData.username,
            email: userData.email,
            bio: userData.bio
        });

        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            handleSaveChanges(formData);
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>

                    <h2 className="text-xl font-bold mb-4 text-right">گۆڕینی زانیارییەکان</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 text-right" htmlFor="username">
                                ناوی بەکارهێنەر
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
                                dir="rtl"
                            />
                        </div>

                        <div className="mb-4">

                            <label className="block text-gray-700 text-sm font-bold mb-2 text-right" htmlFor="email">
                                ئیمەیل
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
                                dir="rtl"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2 text-right" htmlFor="bio">
                                بایۆ
                            </label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows="4"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
                                dir="rtl"
                            />
                        </div>

                        <div className="flex items-center justify-end">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2"
                            >
                                هەڵوەشاندنەوە
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                            >
                                <Save size={16} className="ml-2" />
                                پاشەکەوتکردن
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const res = await axiosInstance.get('/user/getuserinfo');
                console.log(res.data);

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
                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        const fetchReadBooks = async () => {
            try {
                const res = await axiosInstance.get('/user/getReadBooks');
                setReadBooks(res.data);
                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        const fetchComments = async () => {
            try {
                const res = await axiosInstance.get('/user/getUserComments');
                setcomments(res.data);
                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchInfo();
        fetchSavedBooks();
        fetchReadBooks();
        fetchComments();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-4" dir="rtl">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 border-2 border-blue-500">
                                <img
                                    src={userData.coverImgURL}
                                    alt={userData.username}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="mr-4">
                                <h1 className="text-2xl font-bold text-gray-800">{userData.username}</h1>
                                <p className="text-gray-600">{userData.name}</p>
                            </div>
                        </div>

                        <button
                            onClick={openModal}
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
                            کۆمێنتەکان
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
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">کۆمێنتەکان ({comments.length})</h3>
                                {comments.map(comment => (
                                    <div key={comment.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-semibold text-gray-800">{comment.book}</span>
                                            <span className="text-sm text-gray-500">{comment.date}</span>
                                        </div>
                                        <p className="text-gray-700">{comment.comment}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showModal && <ProfileEditModal />}
        </div>
    );
};

export default Profile;