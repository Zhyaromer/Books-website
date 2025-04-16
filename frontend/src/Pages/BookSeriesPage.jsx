import SeriesCard from "../Components/layout/SeriesCard";
import { useState, useEffect } from "react";
import BookstoreNavigation from "../Components/layout/Navigation";
import Footer from "../Components/layout/Footer";
import { useNavigate } from 'react-router-dom';
import Pagination from "../Components/my-ui/Pagination";
import { useLocation } from 'react-router-dom';
import { axiosInstance } from "../context/AxiosInstance";
import LoadingUi from '../Components/my-ui/Loading';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const BookSeriesPage = () => {
  const navigate = useNavigate();
  const [bookSeries, setBookSeries] = useState([]);
  const seriesPerPage = 6;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageQuery = queryParams.get("page");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [seriesLength, setSeriesLength] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pageQuery) {
      setCurrentPage(parseInt(pageQuery));
    }
  }, [pageQuery]);

  const handlePageChange = (newPage) => {
    setLoading(true);
    setCurrentPage(newPage);
    const newParams = new URLSearchParams(location.search);
    newParams.set('page', newPage.toString());
    navigate({
      pathname: location.pathname,
      search: newParams.toString()
    }, { replace: true });
    setLoading(false);
  };

  useEffect(() => {
    const fetchBookSeries = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/bookseries/getAllBookSeries?page=${currentPage}&limit=${seriesPerPage}`);
        if (res.data && res.status === 200) {
          setBookSeries(res.data.bookseries);
          setTotalPages(Math.ceil((res.data.total || 0) / seriesPerPage));
          setSeriesLength(res.data.total);
        } else {
          toast.error(res?.data?.message || "Something went wrong");
          setBookSeries([]);
          setTotalPages(0);
          setSeriesLength(0);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
        setBookSeries([]);
        setTotalPages(0);
        setSeriesLength(0);
      } finally {
        setLoading(false);
      }
    }

    fetchBookSeries();
  }, [currentPage]);

  if (loading) return <LoadingUi />

  return (
    <div>
      <BookstoreNavigation />
      <div className="!bg-[#121212] min-h-screen bg-background py-8 pt-28" dir="rtl">
        <div className="max-w-7xl mx-auto w-full px-6">
          <h1 className="text-xl md:text-3xl !text-gray-100 font-bold text-right mb-6 md:mb-8 text-primary">
            زنجیرە کتێبەکان ({seriesLength})
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {bookSeries.map((series) => (
              <SeriesCard key={series.id} series={series} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <Footer />
      <ToastContainer draggable={true} transition={Slide} autoClose={2000} />
    </div>
  );
};


export default BookSeriesPage; 