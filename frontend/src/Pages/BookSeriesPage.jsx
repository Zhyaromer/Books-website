import SeriesCard from "../Components/layout/SeriesCard";
import { useState, useEffect } from "react";
import axios from "axios";
import BookstoreNavigation from "../Components/layout/Navigation";
import Footer from "../Components/layout/Footer";
import { useNavigate } from 'react-router-dom';
import Pagination from "../Components/my-ui/Pagination";
import { useLocation } from 'react-router-dom';

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

  useEffect(() => {
    if (pageQuery) {
      setCurrentPage(parseInt(pageQuery));
    }
  }, [pageQuery]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const newParams = new URLSearchParams(location.search);
    newParams.set('page', newPage.toString());
    navigate({
      pathname: location.pathname,
      search: newParams.toString()
    }, { replace: true });
  };

  useEffect(() => {
    const fetchBookSeries = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/bookseries/getAllBookSeries?page=${currentPage}&limit=${seriesPerPage}`);
        console.log(res.data);
        if (res.data && res.status === 200) {
          setBookSeries(res.data.bookseries);
          setTotalPages(Math.ceil((res.data.total || 0) / seriesPerPage));
          setSeriesLength(res.data.total);
        } else {
          setBookSeries([]);
        }
      } catch (error) {
        console.error(error);
        setBookSeries([]);
      }
    }

    fetchBookSeries();
  }, [currentPage]);

  return (
    <div>
      <BookstoreNavigation />
      <div className="min-h-screen bg-background py-8 px-4 pt-20" dir="rtl">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl md:text-3xl font-bold text-right mb-6 md:mb-8 text-primary">
            زنجیرە کتێبەکان {seriesLength}
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
    </div>
  );
};


export default BookSeriesPage; 