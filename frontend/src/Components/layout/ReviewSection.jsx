import { useState } from "react";
import { MoreVertical, Star, Edit, Trash, Flag, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
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

const ReviewSection = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      userName: "ئارام عەلی",
      bookName: "مەم و زین",
      rating: 4,
      message: "کتێبێکی زۆر باشە، من زۆر چێژم لێ وەرگرت. ئەم کتێبە ڕەنگدانەوەی کەلتوری کوردییە و زۆر بە جوانی دەربڕینی بۆ کردووە. پێشنیاری دەکەم بۆ هەموو کەسێک کە حەز لە ئەدەبی کوردی دەکات. من دوو جار خوێندمەوە و هەر جارەی شتی نوێم دۆزییەوە.",
      hasSpoiler: false,
      profileImage: "/api/placeholder/40/40",
      revealed: false,
    },
    {
      id: 2,
      userName: "شیلان محەمەد",
      bookName: "قەڵای دمدم",
      rating: 5,
      message: "یەکێک لە باشترین کتێبەکانە کە خوێندوومەتەوە. کۆتاییەکەی زۆر سەرنجڕاکێش بوو کاتێک پاڵەوان بەرەنگاری دوژمن بۆوە و سەرکەوتنی بەدەست هێنا!",
      hasSpoiler: true,
      profileImage: "/api/placeholder/40/40",
      revealed: false,
    },
    {
      id: 3,
      userName: "سۆران حەسەن",
      bookName: "شاری مۆسیقارەکان",
      rating: 3,
      message: "کتێبەکە ئاستی باش بوو، بەڵام پێم وابوو کۆتاییەکەی باشتر دەبێت. ئەو بەشەی کە کەسایەتی سەرەکی بڕیاری گەڕانەوە بۆ لای خێزانەکەی دەدات پێویستی بە گەشەسەندنی زیاتر هەبوو.",
      hasSpoiler: true,
      profileImage: "/api/placeholder/40/40",
      revealed: false,
    },
    {
      id: 4,
      userName: "هانا کەریم",
      bookName: "سنووری خەون",
      rating: 5,
      message: "خوێندنەوەی ئەم کتێبە یەکێک لە باشترین بڕیارەکانی ژیانم بوو. نووسەر توانیویەتی بە شێوەیەکی نایاب وێنەی کوردستان بکێشێت.",
      hasSpoiler: false,
      profileImage: "/api/placeholder/40/40",
      revealed: false,
    },
    {
      id: 5,
      userName: "ئاکۆ مەحموود",
      bookName: "ڕێگای بێ کۆتایی",
      rating: 4,
      message: "چیرۆکێکی سەرنجڕاکێش کە مرۆڤ ناچار دەکات بیر لە ژیان بکاتەوە. پێشنیاری دەکەم بۆ هەموو کەسێک.",
      hasSpoiler: false,
      profileImage: "/api/placeholder/40/40",
      revealed: false,
    },
  ]);

  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [newReview, setNewReview] = useState({
    message: "",
    rating: 0,
    hasSpoiler: false,
  });
  const [reportMessage, setReportMessage] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleAddReview = () => {
    if (editMode && selectedReview) {
      setReviews(
        reviews.map((review) =>
          review.id === selectedReview.id
            ? {
              ...review,
              message: newReview.message,
              rating: newReview.rating,
              hasSpoiler: newReview.hasSpoiler,
              revealed: false,
            }
            : review
        )
      );
      setEditMode(false);
    } else {
      const newReviewItem = {
        id: reviews.length + 1,
        userName: "بەکارهێنەر",
        bookName: "ناوی کتێب",
        rating: newReview.rating,
        message: newReview.message,
        hasSpoiler: newReview.hasSpoiler,
        revealed: false,
        profileImage: "/api/placeholder/40/40",
      };
      setReviews([...reviews, newReviewItem]);
    }

    setNewReview({ message: "", rating: 0, hasSpoiler: false });
    setIsAddReviewOpen(false);
  };

  const handleEditReview = (review) => {
    setSelectedReview(review);
    setNewReview({
      message: review.message,
      rating: review.rating,
      hasSpoiler: review.hasSpoiler,
    });
    setEditMode(true);
    setIsAddReviewOpen(true);
  };

  const handleDeleteReview = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  const handleReport = () => {
    setReportMessage("");
    setIsReportOpen(false);
  };

  const handleOpenReport = (review) => {
    setSelectedReview(review);
    setIsReportOpen(true);
  };

  const toggleSpoilerReveal = (id) => {
    setReviews(
      reviews.map((review) =>
        review.id === id ? { ...review, revealed: !review.revealed } : review
      )
    );
  };


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
            <Star className="w-5 h-5 fill-current" />
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

  return (
    <div dir="rtl" className="w-full max-w-4xl mx-auto p-0 md:p-4 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base md:text-2xl font-bold">هەڵسەنگاندنەکان</h2>
        <Button 
          className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs px-2 md:px-6 md:text-lg"
          onClick={() => {
            setEditMode(false);
            setNewReview({ message: "", rating: 0, hasSpoiler: false });
            setIsAddReviewOpen(true);
          }}>
          زیادکردنی هەڵسەنگاندن
        </Button>
      </div>

      <div className="relative mb-12">
        <div className="overflow-hidden relative rounded-lg shadow-lg bg-white dark:bg-gray-800 h-64">
          <div className="relative h-full">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className={`p-6 transition-all duration-300 absolute top-0 left-0 right-0 h-full ${currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              >
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-3">
                      <AvatarImage src={review.profileImage} alt={review.userName} />
                      <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-lg">{review.userName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {review.bookName}
                      </p>
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
                      <DropdownMenuItem onClick={() => handleEditReview(review)}>
                        <Edit className="ml-2 h-4 w-4" />
                        دەستکاری
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteReview(review.id)}>
                        <Trash className="ml-2 h-4 w-4" />
                        سڕینەوە
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleOpenReport(review)}>
                        <Flag className="ml-2 h-4 w-4" />
                        ڕاپۆرت
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mt-4 overflow-y-auto h-32">
                  {review.hasSpoiler && !review.revealed ? (
                    <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded border border-amber-200 dark:border-amber-700">
                      <div className="text-center">
                        <AlertTriangle className="inline-block h-5 w-5 mb-1 text-amber-500" />
                        <p className="text-amber-800 dark:text-amber-300 mb-2">
                          ئەم هەڵسەنگاندنە سپۆیلەر لە خۆ دەگرێت
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleSpoilerReveal(review.id)}
                          className="bg-indigo-500 hover:bg-indigo-600 text-white hover:text-white"
                        >
                          پیشاندانی هەڵسەنگاندن
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className={`pr-2 ${review.hasSpoiler ? "bg-amber-50/50 dark:bg-amber-900/10 p-3 rounded" : ""}`}>
                      <p className="text-gray-700 dark:text-gray-200 p-4">{review.message}</p>
                      {review.hasSpoiler && review.revealed && (
                        <div className="mt-2 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSpoilerReveal(review.id)}
                          >
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

          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between pointer-events-none">
            <button
              onClick={prevSlide}
              className="pointer-events-auto bg-white/80 text-indigo-600 rounded-full p-2 shadow-md ml-2"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <button
              onClick={nextSlide}
              className="pointer-events-auto bg-white/80 text-indigo-600 rounded-full p-2 shadow-md mr-2"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 transform translate-y-6">
          <div className="flex items-center justify-center gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index
                  ? "bg-blue-600 scale-125"
                  : "bg-gray-300 dark:bg-gray-600"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <Dialog open={isAddReviewOpen} onOpenChange={setIsAddReviewOpen}>
        <DialogContent>
          <div className="flex justify-end pt-10 text-right">
            <DialogHeader>
              <DialogTitle className="text-right">
                {editMode ? "دەستکاری هەڵسەنگاندن" : "زیادکردنی هەڵسەنگاندن"}
              </DialogTitle>
              <DialogDescription >
                تکایە هەڵسەنگاندنەکەت بنووسە و نمرەکە دیاری بکە.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="space-y-4 text-right">
            <div>
              <label className="block mb-2 text-sm font-medium">هەڵسەنگاندن</label>
              <div className="mb-2">
                <StarRating
                  rating={newReview.rating}
                  setRating={(rating) => setNewReview({ ...newReview, rating })}
                  editable={true}
                />
              </div>
            </div>

            <div className="text-right">
              <label className="block mb-2 text-sm font-medium">بۆچوونەکەت</label>
              <Textarea
                value={newReview.message}
                onChange={(e) => setNewReview({ ...newReview, message: e.target.value })}
                rows={4}
                className=" placeholder:text-right"
                placeholder="هەڵسەنگاندنەکەت بنووسە"
              />
            </div>

            <div className="flex items-center space-x-2 justify-end">
              <Checkbox
                id="spoiler"
                checked={newReview.hasSpoiler}
                onCheckedChange={(checked) =>
                  setNewReview({ ...newReview, hasSpoiler: checked })
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
            <Button className="bg-indigo-500 hover:bg-indigo-600 text-white" onClick={handleAddReview}>
              {editMode ? "نوێکردنەوە" : "ناردن"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ڕاپۆرتکردنی هەڵسەنگاندن</DialogTitle>
            <DialogDescription>
              تکایە هۆکاری ڕاپۆرتەکە ڕوون بکەرەوە.
            </DialogDescription>
          </DialogHeader>

          <div>
            <label className="block mb-2 text-sm font-medium">هۆکار</label>
            <Textarea
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
    </div>
  );
};

export default ReviewSection;