import { useState, useEffect } from "react";
import AuthorCard from "../Components/layout/AuthorCard";
import axios from "axios";
import BookstoreNavigation from "../Components/layout/Navigation";
import Footer from "../Components/layout/Footer";
import Selection from "../Components/my-ui/Selection";
import { sortOptionsAuthors, languageOptions } from "../Helpers/options";
import { useLocation, useNavigate } from "react-router-dom";

const Authors = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [language, setLanguage] = useState(languageOptions?.value || "");
  const [Sort, setSort] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const languageQuery = queryParams.get("language");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const languageParam = language || languageQuery || '';
        const foundLanguage = languageOptions.find(option => option.value === languageParam);
        setLanguage(foundLanguage?.value);

        const response = await axios.get(`http://localhost:3000/authors/getallauthors?language=${foundLanguage?.value || languageParam || ''}&sorting=${Sort || ''}`);
        setAuthors(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAuthors();
  }, [isLoaded, authors, language, Sort]);

  return (
    <div>
      <BookstoreNavigation />

      <div className="relative z-30 space-y-6 px-4 sm:px-6 lg:px-8 py-6 pt-20 md:pt-32">
        <div dir="rtl" className="grid grid-cols-1 sm:grid-cols-2 px-0 md:px-64 gap-4">
          <div className="w-full">
            <Selection
              options={languageOptions}
              label="زمانی نووسەر"
              placeholder="زمانێک هەڵبژێرە"
              value={language}
              onChange={(value) => setLanguage(value)}
              className="w-full h-[42px]"
            />
          </div>
          <div className="w-full">
            <Selection
              options={sortOptionsAuthors}
              label="ڕیزبەندی"
              placeholder="ڕیزبەندیەک هەڵبژێرە"
              value={Sort}
              onChange={(value) => setSort(value)}
              className="w-full h-[42px]"
            />
          </div>
        </div>
      </div>

      <div dir="rtl" className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 overflow-hidden">
        <div className="container mx-auto py-12 px-4 relative z-10">
          <h1 className="text-3xl font-bold text-slate-600 dark:text-slate-300 pb-10">{language === 'Kurdish' ? 'نووسەرە کوردیەکان' : language === 'English' ? 'نووسەرە ئینگلیزیەکان' : 'نووسەرەکان'} {`(${authors.length})`}</h1>
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Authors;
