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
    setLoading(true);
    setLanguage(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setLoading(true);
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
          `http://localhost:3000/authors/getallauthors?language=${foundLanguage?.value || languageParam || ''}&sorting=${Sort || ''}&page=${currentPage}&limit=${authorsPerPage}`,
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
        toast.error(error.response?.data.message || 'هەڵەیەک ڕوویدا لە پەیوەندی بە سێرڤەرەکە');
        if (!axiosInstance.isCancel(error)) {
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
          <FilterSection
            showGenre={false}
            languageOptions={languageOptions}
            language={language}
            onLanguageChange={handleLanguageChange}
            sortOptions={sortOptionsAuthors}
            sort={Sort}
            onSortChange={handleSortChange}
            languageLabel="زمانی نووسەر"
            className="grid grid-cols-1 sm:grid-cols-2 px-0 md:px-64 gap-4"
          />

          <div dir="rtl" className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 overflow-hidden">
            <div className="container mx-auto py-12 px-4 relative z-10">
              <h1 className="text-3xl font-bold text-slate-600 dark:text-slate-300 pb-10">
                {language === 'Kurdish' ? 'نووسەرە کوردیەکان' : language === 'English' ? 'نووسەرە ئینگلیزیەکان' : 'نووسەرەکان'} {`(${totalAuthors})`}
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {authors.map((author, index) => (
                  <div
                    key={author.id}
                    className={`transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${150 * index}ms` }}
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

              <Suspense fallback={<LoadingUi />}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </Suspense>
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
