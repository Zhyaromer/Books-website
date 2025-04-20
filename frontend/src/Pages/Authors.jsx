import { useState, useEffect } from "react";
import AuthorCard from "../Components/layout/AuthordetailsCard";
import BookstoreNavigation from "../Components/layout/Navigation";
import { sortOptionsAuthors, languageOptions } from "../Helpers/options";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingUi from '../Components/my-ui/Loading';
import 'react-toastify/dist/ReactToastify.css'
import { axiosInstance } from "../context/AxiosInstance";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { lazy, Suspense } from "react";
const FilterSection = lazy(() => import("../Components/my-ui/FilterSection"));
const Pagination = lazy(() => import("../Components/my-ui/Pagination"));
const Footer = lazy(() => import("../Components/layout/Footer"));

const Authors = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [language, setLanguage] = useState(languageOptions?.value || "");
  const [Sort, setSort] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAuthors, setTotalAuthors] = useState(0);
  const [loading, setLoading] = useState(false);
  const authorsPerPage = 12;
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const languageQuery = queryParams.get("language");
  const pageQuery = queryParams.get("page");

  useEffect(() => {
    setLoading(true);
    if (pageQuery) {
      setCurrentPage(parseInt(pageQuery));
    }
  }, [pageQuery]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = (newPage) => {
    setLoading(true);
    setCurrentPage(newPage);
    const newParams = new URLSearchParams(location.search);
    newParams.set('page', newPage.toString());
    navigate({
      pathname: location.pathname,
      search: newParams.toString()
    }, { replace: true });
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSort(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchAuthors = async () => {
      setLoading(true);
      try {
        const languageParam = language || languageQuery || '';
        const foundLanguage = languageOptions.find(option => option.value === languageParam);
        setLanguage(foundLanguage?.value);

        const response = await axiosInstance.get(
          `/authors/getallauthors?language=${foundLanguage?.value || languageParam || ''}&sorting=${Sort || ''}&page=${currentPage}&limit=${authorsPerPage}`,
          { signal }
        );

        if (response.data.authors && response.data.authors.length > 0 && response.status === 200) {
          setAuthors(response.data.authors);
          setTotalAuthors(response.data.total);
          setTotalPages(Math.ceil(response.data.total / authorsPerPage));
        } else {
          toast.error(response?.data.message || 'هەڵەیەک ڕوویدا لە پەیوەندی بە سێرڤەرەکە');
          setAuthors([]);
          setTotalAuthors(0);
          setTotalPages(1);
        }
      } catch (error) {
        if (error.name !== 'CanceledError') { // Ignore cancellation errors
          toast.error(error.response?.data.message || 'هەڵەیەک ڕوویدا لە پەیوەندی بە سێرڤەرەکە');
          setAuthors([]);
          setTotalAuthors(0);
          setTotalPages(1);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchAuthors();

    return () => {
      controller.abort();
    };
  }, [isLoaded, language, Sort, currentPage, languageQuery]);

  return (
    <div>
      {loading ? (
        <LoadingUi />
      ) : (
        <div>
          <BookstoreNavigation />
          <div className="max-w-7xl mx-auto w-full">
            <FilterSection
              showGenre={false}
              languageOptions={languageOptions}
              language={language}
              onLanguageChange={handleLanguageChange}
              sortOptions={sortOptionsAuthors}
              sort={Sort}
              onSortChange={handleSortChange}
              languageLabel="زمانی نووسەر"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-7xl mx-auto w-full"
            />
            <div dir="rtl" className="min-h-screen px-6 bg-[#121212] overflow-hidden">
              <div className="container mx-auto py-12 px-4 relative z-10">
                <h1 className="text-3xl font-bold text-gray-100 pb-10">
                  {language === 'Kurdish' ? 'نووسەرە کوردیەکان' : language === 'English' ? 'نووسەرە ئینگلیزیەکان' : 'نووسەرەکان'} {`(${totalAuthors})`}
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {authors.map((author, index) => (
                    <div
                      key={author.id}
                      className={`
                      transform transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] 
                      ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                    `}
                      style={{ transitionDelay: `${index * 75}ms` }}
                    >
                      <AuthorCard
                        name={author.name}
                        imageUrl={author.imgURL}
                        bio={author.bio}
                        id={author.id}
                      />
                    </div>
                  ))}
                </div>

                {authors.length == 0 && (
                  <div className="col-span-full">
                    <p className="text-center text-sm md:text-base font-bold text-white md:pb-56">هیچ نووسەرێک نەدۆزرایەوە</p>
                  </div>
                )}

                <Suspense fallback={<LoadingUi />}>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </Suspense>
              </div>
            </div>
          </div>
          <Suspense fallback={<LoadingUi />}>
            <Footer />
          </Suspense>
        </div>
      )}
      <ToastContainer draggable={true} transition={Slide} autoClose={2000} />
    </div>
  );
};

export default Authors;
