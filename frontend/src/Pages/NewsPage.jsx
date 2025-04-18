import NewsCard from '../Components/layout/NewsCard';
import BookstoreNavigation from "../Components/layout/Navigation";
import Footer from "../Components/layout/Footer";
import LoadingUi from "@/Components/my-ui/Loading";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../Components/my-ui/Pagination";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { axiosInstance } from "../context/AxiosInstance";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalNews, setTotalNews] = useState(0);
  const [sort, setSort] = useState();
  const [category, setCategory] = useState();
  const newsPerPage = 12;
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const pageQuery = queryParams.get("page");
  const categoryQuery = queryParams.get("category");
  const sortQuery = queryParams.get("sort");

  useEffect(() => {
    if (pageQuery) {
      setCurrentPage(parseInt(pageQuery));
    }
    if (categoryQuery) {
      setCategory(categoryQuery);
    }
    if (sortQuery) {
      setSort(sortQuery);
    }
  }, []);

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
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/news/getallnews?category=${category || ''}&sorting=${sort || ''}&page=${currentPage}&limit=${newsPerPage}`
        );

        if (response.data.news) {
          setNews(response.data.news);
          setTotalNews(response.data.total);
          setTotalPages(Math.ceil(response.data.total / newsPerPage));
        } else {
          setNews(response.data);
          setTotalNews(response.data.length);
          setTotalPages(Math.ceil(response.data.length / newsPerPage));
        }
      } catch (error) {
        toast.error(error.response.data.message || 'Something went wrong');
        setNews([]);
        setTotalNews(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, sort, currentPage]);

  return (
    <div>
      {loading ? (
        <LoadingUi />
      ) : (
        <>
          <div dir='rtl'>
            <BookstoreNavigation />
            <div className="max-w-7xl w-full container mx-auto px-6 py-8 pt-32">
              <h1 className="text-3xl text-white font-bold mb-8 text-right">
                دوایین هەواڵەکان {totalNews > 0 && `(${totalNews})`}
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map(newsItem => (
                  <NewsCard
                    key={newsItem.id}
                    data={newsItem}
                  />
                ))}
              </div>
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
            <Footer />
          </div>
        </>
      )}

      <ToastContainer draggable={true} transition={Slide} autoClose={2000} />
    </div>
  );
};

export default NewsPage; 