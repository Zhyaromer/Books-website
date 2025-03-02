import BookstoreNavigation from "../Components/layout/Navigation";
import BookCollection from "../Components/layout/BookCard";
import Footer from "../Components/layout/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import Selection from "../Components/my-ui/Selection";
import MultipleSelection from "@/Components/my-ui/MultipleSelection";
import { sortOptions, genreOptions, languageOptions } from "../Helpers/options";
import { useLocation, useNavigate } from "react-router-dom";

const Books = () => {
    const [Sort, setSort] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [books, setBooks] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const genreQuery = queryParams.get("genre");
    const languageQuery = queryParams.get("language");
    const [language, setLanguage] = useState(languageOptions?.value || "");

    useEffect(() => {
        if (genreQuery) {
            const genreValues = genreQuery.split(',');
            
            const matchedGenres = genreValues.map(genreValue => {
                return genreOptions.find(option => option.value === genreValue);
            }).filter(Boolean); 
            
            if (matchedGenres.length > 0) {
                setSelectedGenres(matchedGenres);
            }
        }
    }, []);

    const handleGenreChange = (value) => {
        setSelectedGenres(value);
        
        const newParams = new URLSearchParams(location.search);
        
        if (value.length > 0) {
            const genreString = value.map(genre => genre.value).join(',');
            newParams.set('genre', genreString);
        } else {
            newParams.delete('genre');
        }
        
        navigate({
            pathname: location.pathname,
            search: newParams.toString()
        }, { replace: true });
    };

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const genreParams = selectedGenres.length > 0
                    ? selectedGenres.map(genre => genre.value).join(',')
                    : genreQuery || '';

                console.log("Genre params for API call:", genreParams);
                console.log("Current selected genres:", selectedGenres);

                const languageParam = language || languageQuery || '';
                const foundLanguage = languageOptions.find(option => option.value === languageParam);
                setLanguage(foundLanguage?.value);
                
                const response = await axios.get(
                    `http://localhost:3000/books/getAllBooks?genre=${genreParams}&sorting=${Sort || ''}&language=${foundLanguage?.value || languageParam || ''}`
                );
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, [selectedGenres, Sort, language, genreQuery]);

    return (
        <>
            <BookstoreNavigation />
            <div className="relative z-30 space-y-6 px-4 sm:px-6 lg:px-8 py-6 pt-20 md:pt-32">
                <div dir="rtl" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="w-full">
                        <MultipleSelection
                            options={genreOptions}
                            label="چەشنەکان"
                            placeholder="چەشنێک هەڵبژێرە"
                            onChange={handleGenreChange}
                            value={selectedGenres}
                            className="w-full"
                        />
                    </div>
                    <div className="w-full">
                        <Selection
                            options={languageOptions}
                            label="زمان"
                            placeholder="زمانێک هەڵبژێرە"
                            value={language}
                            onChange={(value) => setLanguage(value)}
                            className="w-full h-[42px]"
                        />
                    </div>
                    <div className="w-full">
                        <Selection
                            options={sortOptions}
                            label="ڕیزبەندی"
                            placeholder="ڕیزبەندیەک هەڵبژێرە"
                            value={Sort}
                            onChange={(value) => setSort(value)}
                            className="w-full h-[42px]"
                        />
                    </div>
                </div>
            </div>

            <BookCollection data={books} text="هەموو کتێبەکان" path="/Books" />
            <Footer />
        </>
    );
}

export default Books