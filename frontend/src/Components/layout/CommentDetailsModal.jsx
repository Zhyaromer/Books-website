import PropTypes from 'prop-types';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CommentDetailsModal = ({ isOpen, onClose, comment }) => {
    const navigate = useNavigate();
    if (!isOpen || !comment) return null;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <div dir='rtl' className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
                <div className="flex items-center justify-between border-b p-4 bg-indigo-50">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 ml-4">
                            {comment.coverImgURL ? (
                                <img className="h-12 w-12 rounded-full object-cover" src={comment.coverImgURL} alt={comment.username} />
                            ) : (
                                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-500 font-medium">{comment.username?.slice(0, 2).toUpperCase()}</span>
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">{comment.title}</h3>
                            <p className="text-sm text-gray-500">لەلایەن {comment.username}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="p-6 border-b">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">هەڵسەنگاندنەکە</h4>
                        <div className="bg-gray-50 p-5 rounded-lg shadow-inner">
                            <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{comment.comment}</p>
                        </div>
                    </div>

                    <div className="p-6">
                        <h4 className="text-sm font-medium text-gray-500 mb-4">زانیاریەکان</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                            <div>
                                <span className="block text-xs text-gray-500">ئایدی</span>
                                <span className="block mt-1">{comment.id}</span>
                            </div>
                            <div>
                                <span className="block text-xs text-gray-500">ناوی کتێب</span>
                                <span onClick={() => navigate(`/booksDetail/${comment.book_id}`, '_blank')} className="cursor-pointer block mt-1">{comment.title}</span>
                            </div>
                            <div>
                                <span className="block text-xs text-gray-500">کاتی نووسینی هەڵسەنگاندنەکە</span>
                                <span className="block mt-1 text-sm">{formatDate(comment.created_at)}</span>
                            </div>
                            <div>
                                <span className="block text-xs text-gray-500">نمرە</span>
                                <div className="mt-1 flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < comment.rating ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="block text-xs text-gray-500">ئایا سپۆیلەرە؟</span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${comment.isSpoiler ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                    {comment.isSpoiler ? 'بەڵێ' : 'نەخێر'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t p-4 bg-gray-50 flex justify-start">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        داخستن
                    </button>
                </div>
            </div>
        </div>
    );
};

CommentDetailsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    comment: PropTypes.object
};

export default CommentDetailsModal;