import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { Edit, Trash, AlertTriangle, MoreVertical } from "lucide-react";
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
  const [selectedReview, setSelectedReview] = useState(null);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hasSpoiler, setHasSpoiler] = useState(false);
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
        const response = await axiosInstance.get(`/user/getallreviews?book_id=${bookId}`);
        setComments(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
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

      if (editMode && selectedReview) {
        await axiosInstance.patch(
          `/user/updateReview?review_id=${selectedReview.id}`,
          {
            rating,
            comment: message,
            hasSpoiler
          }
        );
      } else {
        await axiosInstance.post(
          `/user/addReview/${bookId}`,
          {
            rating,
            comment: message,
            hasSpoiler
          }
        );
      }

      setIsAddReviewOpen(false);

      setTimeout(async () => {
        const updatedComments = await axiosInstance.get(`/user/getallreviews?book_id=${bookId}`);
        setComments(updatedComments.data);
      }, 100);

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

  const handleScroll = useCallback(() => {
    if (!scrollContainer.current) return;

    const container = scrollContainer.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth / Math.min(3, comments.length);
    const newIndex = Math.round(scrollPosition / cardWidth);

    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < comments.length) {
      setActiveIndex(newIndex);
    }
  }, [activeIndex, comments.length]);

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
  }, [activeIndex, handleScroll]);

  return (
    <div dir="rtl" className="w-full max-w-7xl mx-auto p-0 md:p-4 font-sans">
      <div className="flex justify-between items-center px-4 md:px-0 mb-6 mt-4 md:mt-0">
        <h2 className="text-gray-100 text-base md:text-2xl font-bold">هەڵسەنگاندنەکان</h2>
        <Button
          className="bg-[#1db954] hover:bg-[#1ed760] text-white text-xs md:text-sm px-1 md:px-2"
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
            <p className="text-gray-100">هیچ هەڵسەنگاندنێک بەردەست نیە</p>
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
            <div className="flex gap-2 h-full px-2">
              {comments?.map((review) => (
                <div
                  key={review.id}
                  className="p-2 shadow-md border-none bg-[#1a1a1a] w-[280px] h-full flex-shrink-0"
                >
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar onClick={() => navigate(`/userprofile?username=${review.username}`)} className="h-12 w-12 cursor-pointer">
                        <AvatarImage src={review.coverImgURL} alt={review.userName} />
                        <AvatarFallback>{review.username}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 onClick={() => navigate(`/userprofile?username=${review.username}`)} className="font-medium text-gray-100 text-sm cursor-pointer">{review.username}</h3>
                        <div dir="ltr" className="mt-1">
                          <StarRating rating={review.rating} setRating={() => { }} />
                        </div>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className={`cursor-pointer hover:bg-transparent ${reviewPermissions[review.id] ? "" : "hidden"}`} variant="ghost" size="sm">
                          <MoreVertical className="text-white h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-[#1a1a1a] border-none" align="end">
                        <DropdownMenuItem onClick={() => handleEditReview(review.id)} className={`cursor-pointer text-gray-100 ${reviewPermissions[review.id] ? "" : "hidden"}`}>
                          <Edit className="ml-2 h-4 w-4" />
                          دەستکاری
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteReview(review.id)} className={`cursor-pointer text-gray-100 ${reviewPermissions[review.id] ? "" : "hidden"}`} >
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
                          <AlertTriangle className="inline-block h-5 w-5 mb-1 text-yellow-500" />
                          <p className="text-white mb-2">
                            سپۆیلەر
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRevealSpoiler(review.id)}
                            className="border-none bg-[#1db954] hover:bg-[#1ed760] text-white hover:text-white"
                          >
                            پیشاندانی هەڵسەنگاندن
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className={`${review.isSpoiler ? "rounded" : ""}`}>
                        <p className="text-white text-[14px] px-4">
                          {review.comment}
                        </p>
                        {review.isSpoiler === 1 && revealedSpoilers[review.id] && (
                          <div className="mt-2 text-right">
                            <Button className="border-none bg-[#1db954] hover:bg-[#1ed760] text-white hover:text-white" variant="ghost" size="sm" onClick={() => handleHideSpoiler(review.id)}>
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
      </div>

      <Dialog open={isAddReviewOpen} onOpenChange={setIsAddReviewOpen}>
        <DialogContent className='bg-[#1a1a1a] border-none'>
          <div className="flex justify-end pt-10 text-right">
            <DialogHeader>
              <DialogTitle className="text-right text-gray-100">
                {editMode ? "گۆڕێنی هەڵسەنگاندنەکەت" : "زیادکردنی هەڵسەنگاندن"}
              </DialogTitle>
              <DialogDescription className="text-right text-gray-100 pt-4">
                تکایە هەڵسەنگاندنەکەت بنووسە و نمرەکە دیاری بکە
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="space-y-4 text-right">
            <div>
              <label className="block text-gray-100 mb-2 text-sm font-medium">هەڵسەنگاندن</label>
              <div className="mb-2">
                <StarRating rating={rating} setRating={setRating} editable={true} />
              </div>
            </div>

            <div dir='rtl' className="text-right">
              <label className="block text-gray-100 mb-2 text-sm font-medium">بۆچوونەکەت</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="text-gray-100 placeholder:text-right placeholder:text-gray-300"
                placeholder="هەڵسەنگاندنەکەت بنووسە"
              />
            </div>

            <div className="flex items-center space-x-2 justify-end">
              <Checkbox
                id="spoiler"
                className="border-white data-[state=checked]:bg-[#1db954] data-[state=checked]:border-[#1db954]"
                checked={hasSpoiler}
                onCheckedChange={(checked) => setHasSpoiler(checked)}
              />
              <label
                htmlFor="spoiler"
                className="text-gray-100 py-4 mr-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                ئەم هەڵسەنگاندنە سپۆیلەری تێدایە
              </label>
            </div>
          </div>

          <DialogFooter className="sm:justify-end flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setIsAddReviewOpen(false)}
              className="w-full sm:w-auto"
            >
              پاشگەزبوونەوە
            </Button>
            <Button
              className="bg-[#1db954] hover:bg-[#1ed760] text-white w-full sm:w-auto"
              onClick={handleAddComment}
            >
              {editMode ? "نوێکردنەوە" : "ناردن"}
            </Button>
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