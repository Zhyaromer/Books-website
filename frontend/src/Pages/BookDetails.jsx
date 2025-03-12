import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FaBookmark, FaRegBookmark, FaShare } from 'react-icons/fa';
import axios from 'axios';
import BookCollection from '../Components/layout/BookCard';
import CommentsSection from '../Components/layout/ReviewSection';
import BookstoreNavigation from '../Components/layout/Navigation';
import Footer from '../Components/layout/Footer';
import { axiosInstance } from "../context/AxiosInstance";
import { MoreVertical, Star, Edit, Trash, Flag, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoadingUi from '../Components/my-ui/Loading';
import PropTypes from 'prop-types';

const BookDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [fetchBook, setFetchBook] = useState([]);
  const [series, setSeries] = useState([]);
  const [booksSeries, setBooksSeries] = useState([]);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [hasRead, setHasRead] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [comments, setComments] = useState([]);
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [message, setmessage] = useState("")
  const [rating, setrating] = useState(0)
  const [hasSpoiler, sethasSpoiler] = useState(false)
  const [reportMessage, setReportMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [reviewPermissions, setReviewPermissions] = useState({});
  const scrollContainer = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [revealedSpoilers, setRevealedSpoilers] = useState({});

  const handleEditReview = async (reviewId) => {
    const reviewToEdit = comments.find(review => review.id === reviewId);

    if (!reviewToEdit) return;

    setSelectedReview(reviewToEdit);
    setEditMode(true);

    setmessage(reviewToEdit.comment);
    setrating(reviewToEdit.rating);

    if (reviewToEdit.isSpoiler === true || reviewToEdit.isSpoiler === 1 || reviewToEdit.isSpoiler === "true") {
      sethasSpoiler(true);
    } else {
      sethasSpoiler(false);
    }

    setIsAddReviewOpen(true);
  };

  const handleDeleteReview = async (delId) => {
    try {
      const res = await axiosInstance.delete(`/user/removeReview/${delId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReport = () => {
    setReportMessage("");
    setIsReportOpen(false);
  };

  const handleOpenReport = (review) => {
    setSelectedReview(review);
    setIsReportOpen(true);
  };

  const userID = async (reviewId) => {
    try {
      const response = await axiosInstance.get(`/user/returnUserid/${reviewId}`);
      return response.data.canModify
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (comments.length > 0) {
      const checkPermissions = async () => {
        const permissionsMap = {};

        for (const comment of comments) {
          permissionsMap[comment.id] = await userID(comment?.id);
        }

        setReviewPermissions(permissionsMap);
      };

      checkPermissions();
    }
  }, [comments]);

  const StarRating = ({ rating, setRating, editable = false }) => {
    return (
      <div className="flex flex-row-reverse">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => editable && setRating(star)}
            className={`${star <= rating ? "text-yellow-500" : "text-gray-300"
              } ${editable ? "cursor-pointer" : "cursor-default"}`}
          >
            <Star className="w-4 h-4 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  StarRating.propTypes = {
    rating: PropTypes.number.isRequired,
    setRating: PropTypes.func.isRequired,
    editable: PropTypes.bool,
  };

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

    const bookreadsCheck = async () => {
      try {
        const response = await axiosInstance.get(`/user/bookreadsCheck?book_id=${id}`);
        if (response.data.success) {
          setHasRead(true);
        } else {
          setHasRead(false);
        }
      } catch (error) {
        console.log(error);
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
        console.log(error);
      }
    }

    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:3000/user/getallreviews?book_id=${id}`);
        setComments(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    incrementViewCount();
    fetchBook();
    bookreadsCheck();
    booksavesCheck();
    fetchComments();
    userID();
  }, [id]);

  const addBooktoRead = async () => {
    try {
      await axiosInstance.post(`/user/addReadBook/${id}`);
      setHasRead(!hasRead);
    } catch (error) {
      console.log(error);
    }
  }

  const addBooktoSave = async () => {
    try {
      await axiosInstance.post(`/user/addSaveBook/${id}`);
      setHasSaved(!hasSaved);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddComment = async () => {
    if (message.trim() === "") {
      console.log("Please enter a comment");
      return;
    }

    if (message.length > 3000 || message.length < 1) {
      console.log("Comment must be between 1 and 3000 characters");
      return;
    }
    try {
      let response;

      if (editMode && selectedReview) {
        response = await axiosInstance.patch(
          `/user/updateReview?review_id=${selectedReview.id}`,
          {
            rating,
            comment: message,
            hasSpoiler
          }
        );
      } else {
        console.log(id);
        response = await axiosInstance.post(
          `http://localhost:3000/user/addReview/${id}`,
          {
            rating,
            comment: message,
            hasSpoiler
          }
        );
      }

      setIsAddReviewOpen(false);

      const updatedComments = await axiosInstance.get(`http://localhost:3000/user/getallreviews?book_id=${id}`);
      setComments(updatedComments.data);

      setIsAddReviewOpen(false);
      return true;
    } catch (error) {
      console.error("Failed to add/update comment:", error);
      return false;
    }
  };

  const handleRevealSpoiler = (reviewId) => {
    setRevealedSpoilers((prev) => ({ ...prev, [reviewId]: true }));
  };

  const handleHideSpoiler = (reviewId) => {
    setRevealedSpoilers((prev) => ({ ...prev, [reviewId]: false }));
  };

  const handleScroll = () => {
    if (!scrollContainer.current) return;

    const container = scrollContainer.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth / Math.min(3, comments.length);
    const newIndex = Math.round(scrollPosition / cardWidth);

    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < comments.length) {
      setActiveIndex(newIndex);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainer.current.offsetLeft);
    setScrollLeft(scrollContainer.current.scrollLeft);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainer.current.offsetLeft);
    setScrollLeft(scrollContainer.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.current.offsetLeft;
    const walk = (x - startX) * 0.8;
    scrollContainer.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollContainer.current.offsetLeft;
    const walk = (x - startX) * 0.8;
    scrollContainer.current.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const container = scrollContainer.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [activeIndex]);

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
                      <button onClick={() => (window.location.href = `/AuthorDetails/${fetchBook.author_id}`)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                        بینینی نوسەر
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div dir="rtl" className="w-full max-w-7xl mx-auto p-0 md:p-4 font-sans">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-base md:text-2xl font-bold">هەڵسەنگاندنەکان</h2>
                    <Button
                      className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm md:text-xs px-2"
                      onClick={() => {
                        setEditMode(false);
                        setrating(0);
                        setmessage("");
                        sethasSpoiler(false);
                        setIsAddReviewOpen(true);
                      }}>
                      زیادکردنی هەڵسەنگاندن
                    </Button>
                  </div>

                  <div className="relative mb-12">
                    {comments.length === 0 && (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-600 dark:text-gray-300">هیچ هەڵسەنگاندنێک بەردەست نیە</p>
                      </div>
                    )}
                    {comments.length > 0 && (
                      <div
                        className="h-72 overflow-y-auto hide-scrollbar cursor-grab overflow-x-auto no-select "
                        ref={scrollContainer}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleDragEnd}
                        onMouseLeave={handleDragEnd}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleDragEnd}
                      >
                        <div className="flex gap-2 h-full">
                          {comments?.map((review) => (
                            <div
                              key={review.id}
                              className="p-2 shadow-md border w-[280px] h-full flex-shrink-0 "
                            >
                              <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar onClick={() => (window.location.href = `/userprofile?username=${review.username}`)} className="h-12 w-12 cursor-pointer">
                                    <AvatarImage src={review.coverImgURL} alt={review.userName} />
                                    <AvatarFallback>{review.username}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 onClick={() => (window.location.href = `/userprofile?username=${review.username}`)} className="font-medium text-sm cursor-pointer">{review.username}</h3>
                                    <div dir="ltr" className="mt-1">
                                      <StarRating rating={review.rating} setRating={() => { }} />
                                    </div>
                                  </div>
                                </div>

                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleEditReview(review.id)} className={`cursor-pointer ${reviewPermissions[review.id] ? "" : "hidden"}`}>
                                      <Edit className="ml-2 h-4 w-4" />
                                      دەستکاری
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleOpenReport(review.id)} className={`cursor-pointer`}>
                                      <Flag className="ml-2 h-4 w-4" />
                                      ڕاپۆرت
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDeleteReview(review.id)} className={`cursor-pointer ${reviewPermissions[review.id] ? "" : "hidden"}`} >
                                      <Trash className="ml-2 h-4 w-4 text-red-500" />
                                      سڕینەوە
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>

                              <div className="mt-4 overflow-x-hidden h-48">
                                {review.isSpoiler === 1 && !revealedSpoilers[review.id] ? (
                                  <div className="rounded">
                                    <div className="text-center">
                                      <AlertTriangle className="inline-block h-5 w-5 mb-1 text-amber-500" />
                                      <p className="text-amber-800 mb-2">
                                        سپۆیلەر
                                      </p>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleRevealSpoiler(review.id)}
                                        className="bg-indigo-500 hover:bg-indigo-600 text-white hover:text-white"
                                      >
                                        پیشاندانی هەڵسەنگاندن
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className={`${review.isSpoiler ? "rounded" : ""}`}>
                                    <p className="text-gray-700 text-[14px] px-4 ">
                                      {review.comment}
                                    </p>
                                    {review.isSpoiler === 1 && revealedSpoilers[review.id] && (
                                      <div className="mt-2 text-right">
                                        <Button variant="ghost" size="sm" onClick={() => handleHideSpoiler(review.id)}>
                                          شاردنەوە
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <style >{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari, Opera */
        }
          .no-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
      `}</style>
                  </div>

                  <Dialog open={isAddReviewOpen} onOpenChange={setIsAddReviewOpen}>
                    <DialogContent>
                      <div className="flex justify-end pt-10 text-right">
                        <DialogHeader>
                          <DialogTitle className="text-right">
                            {editMode ? "گۆڕێنی هەڵسەنگاندنەکەت" : "زیادکردنی هەڵسەنگاندن"}
                          </DialogTitle>
                          <DialogDescription >
                            تکایە هەڵسەنگاندنەکەت بنووسە و نمرەکە دیاری بکە
                          </DialogDescription>
                        </DialogHeader>
                      </div>

                      <div className="space-y-4 text-right">
                        <div>
                          <label className="block mb-2 text-sm font-medium">هەڵسەنگاندن</label>
                          <div className="mb-2">
                            <StarRating
                              rating={rating}
                              setRating={setrating}
                              editable={true}
                            />
                          </div>
                        </div>

                        <div dir='rtl' className="text-right">
                          <label className="block mb-2 text-sm font-medium">بۆچوونەکەت</label>
                          <Textarea
                            value={message}
                            onChange={(e) => setmessage(() => e.target.value)}
                            rows={4}
                            className=" placeholder:text-right"
                            placeholder="هەڵسەنگاندنەکەت بنووسە"
                          />
                        </div>

                        <div className="flex items-center space-x-2 justify-end">
                          <Checkbox
                            id="spoiler"
                            checked={hasSpoiler}
                            onCheckedChange={(checked) =>
                              sethasSpoiler(checked)
                            }
                          />
                          <label
                            htmlFor="spoiler"
                            className="mr-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            ئەم هەڵسەنگاندنە سپۆیلەری تێدایە
                          </label>
                        </div>
                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddReviewOpen(false)}>
                          پاشگەزبوونەوە
                        </Button>
                        <Button className="bg-indigo-500 hover:bg-indigo-600 text-white" onClick={handleAddComment}>
                          {editMode ? "نوێکردنەوە" : "ناردن"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
                    <DialogContent >
                      <DialogHeader className={"pt-4"}>
                        <DialogTitle>ڕاپۆرتکردنی هەڵسەنگاندن</DialogTitle>
                        <DialogDescription>
                          تکایە هۆکاری ڕاپۆرتەکە ڕوون بکەرەوە.
                        </DialogDescription>
                      </DialogHeader>

                      <div dir='rtl'>
                        <label className="block mb-2 text-sm font-medium">هۆکار</label>
                        <Textarea
                          dir='rtl'
                          value={reportMessage}
                          onChange={(e) => setReportMessage(e.target.value)}
                          rows={4}
                          placeholder="هۆکاری ڕاپۆرتەکە بنووسە..."
                        />
                      </div>

                      <DialogFooter >
                        <Button variant="outline" onClick={() => setIsReportOpen(false)}>
                          پاشگەزبوونەوە
                        </Button>
                        <Button onClick={handleReport}>ناردنی ڕاپۆرت</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
      </div >
      <Footer />
    </div >
  );
};

export default BookDetail;
