import { useState, useEffect } from "react";
import AuthorCard from "../Components/layout/AuthordetailsCard";
import axios from "axios";
import BookstoreNavigation from "../Components/layout/Navigation";
import Footer from "../Components/layout/Footer";
import { sortOptionsAuthors, languageOptions } from "../Helpers/options";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../Components/my-ui/Pagination";
import FilterSection from "../Components/my-ui/FilterSection";

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
    if (pageQuery) {
      setCurrentPage(parseInt(pageQuery));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);

    return () => clearTimeout(timer);
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

        const response = await axios.get(
          `http://localhost:3000/authors/getallauthors?language=${foundLanguage?.value || languageParam || ''}&sorting=${Sort || ''}&page=${currentPage}&limit=${authorsPerPage}`,
          { signal }
        );

        if (response.data.authors) {
          setAuthors(response.data.authors);
          setTotalAuthors(response.data.total);
          setTotalPages(Math.ceil(response.data.total / authorsPerPage));
        } else {
          setAuthors(response.data);
          setTotalAuthors(response.data.length);
          setTotalPages(Math.ceil(response.data.length / authorsPerPage));
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error(error);
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
  }, [isLoaded, language, Sort, currentPage]);

  return (
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
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
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
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Authors;
