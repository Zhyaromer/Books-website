import { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Edit, Trash, Flag, AlertTriangle, MoreVertical } from "lucide-react";
import { axiosInstance } from "../../context/AxiosInstance";
import { Slide, ToastContainer, toast } from 'react-toastify';
import StarRating from "../my-ui/StarRating";
import 'react-toastify/dist/ReactToastify.css'
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
import PropTypes from 'prop-types';

const CommentsSection = ({ bookId }) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hasSpoiler, setHasSpoiler] = useState(false);
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

    setMessage(reviewToEdit.comment);
    setRating(reviewToEdit.rating);

    if (reviewToEdit.isSpoiler === true || reviewToEdit.isSpoiler === 1 || reviewToEdit.isSpoiler === "true") {
      setHasSpoiler(true);
    } else {
      setHasSpoiler(false);
    }

    setIsAddReviewOpen(true);
  };

  const handleDeleteReview = async (delId) => {
    try {
      const res = await axiosInstance.delete(`/user/removeReview/${delId}`);
      if (res.status === 200) {
        toast.success(res.data.message);
        setComments((prevComments) => prevComments.filter(comment => comment.id !== delId));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
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
      return response.data.canModify;
    } catch {
      return false;
    }
  };

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

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:3000/user/getallreviews?book_id=${bookId}`);
        setComments(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, [bookId]);

  const handleAddComment = async () => {
    if (message.trim() === "") {
      toast.warning("Please enter a comment");
      return;
    }

    if (message.length > 3000 || message.length < 1) {
      toast.warning("Comment must be between 1 and 3000 characters");
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
        response = await axiosInstance.post(
          `http://localhost:3000/user/addReview/${bookId}`,
          {
            rating,
            comment: message,
            hasSpoiler
          }
        );
      }

      setIsAddReviewOpen(false);

      const updatedComments = await axiosInstance.get(`http://localhost:3000/user/getallreviews?book_id=${bookId}`);
      setComments(updatedComments.data);

      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
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

  return (
    <div dir="rtl" className="w-full max-w-7xl mx-auto p-0 md:p-4 font-sans">
      <div className="flex justify-between items-center mb-6 mt-4 md:mt-0">
        <h2 className="text-base md:text-2xl font-bold">هەڵسەنگاندنەکان</h2>
        <Button
          className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs md:text-sm px-1 md:px-2"
          onClick={() => {
            setEditMode(false);
            setRating(0);
            setMessage("");
            setHasSpoiler(false);
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
            className="h-72 overflow-y-auto hide-scrollbar cursor-grab overflow-x-auto no-select"
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
                  className="p-2 shadow-md border w-[280px] h-full flex-shrink-0"
                >
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar onClick={() => navigate(`/userprofile?username=${review.username}`)} className="h-12 w-12 cursor-pointer">
                        <AvatarImage src={review.coverImgURL} alt={review.userName} />
                        <AvatarFallback>{review.username}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 onClick={() => navigate(`/userprofile?username=${review.username}`)} className="font-medium text-sm cursor-pointer">{review.username}</h3>
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
                        <p className="text-gray-700 text-[14px] px-4">
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

        <style>{`
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
              <DialogDescription>
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
                  setRating={setRating}
                  editable={true}
                />
              </div>
            </div>

            <div dir='rtl' className="text-right">
              <label className="block mb-2 text-sm font-medium">بۆچوونەکەت</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="placeholder:text-right"
                placeholder="هەڵسەنگاندنەکەت بنووسە"
              />
            </div>

            <div className="flex items-center space-x-2 justify-end">
              <Checkbox
                id="spoiler"
                checked={hasSpoiler}
                onCheckedChange={(checked) =>
                  setHasSpoiler(checked)
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
        <DialogContent>
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

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReportOpen(false)}>
              پاشگەزبوونەوە
            </Button>
            <Button onClick={handleReport}>ناردنی ڕاپۆرت</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ToastContainer draggable={true} transition={Slide} autoClose={2000} />
    </div>
  );
};

CommentsSection.propTypes = {
  bookId: PropTypes.string.isRequired
};

export default CommentsSection;