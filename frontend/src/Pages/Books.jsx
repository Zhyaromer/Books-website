import BookstoreNavigation from "../Components/layout/Navigation";
import BookCollection from "../Components/layout/BookCard";
import Footer from "../Components/layout/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { sortOptions, genreOptions, languageOptions } from "../Helpers/options";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../Components/my-ui/Pagination";
import FilterSection from "../Components/my-ui/FilterSection";

const Books = () => {
    const [Sort, setSort] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalBooks, setTotalBooks] = useState(0);
    const booksPerPage = 12;
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const genreQuery = queryParams.get("genre");
    const languageQuery = queryParams.get("language");
    const pageQuery = queryParams.get("page");
    const [language, setLanguage] = useState(languageOptions?.value || "");

    useEffect(() => {
        if (pageQuery) {
            setCurrentPage(parseInt(pageQuery));
        }
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
        setCurrentPage(1);

        const newParams = new URLSearchParams(location.search);

        if (value.length > 0) {
            const genreString = value.map(genre => genre.value).join(',');
            newParams.set('genre', genreString);
        } else {
            newParams.delete('genre');
        }
        newParams.set('page', '1');

        navigate({
            pathname: location.pathname,
            search: newParams.toString()
        }, { replace: true });
    };

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
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const genreParams = selectedGenres.length > 0
                    ? selectedGenres.map(genre => genre.value).join(',')
                    : genreQuery || '';

                const languageParam = language || languageQuery || '';
                const foundLanguage = languageOptions.find(option => option.value === languageParam);
                setLanguage(foundLanguage?.value);

                const url = `http://localhost:3000/books/getAllBooks?genre=${genreParams}&sorting=${Sort || ''}&language=${foundLanguage?.value || languageParam || ''}&page=${currentPage}&limit=${booksPerPage}`;

                const response = await axios.get(url);

                if (response.status === 200) {
                    if (Array.isArray(response.data)) {
                        setBooks(response.data);
                        setTotalBooks(response.data.length);
                        setTotalPages(Math.ceil(response.data.length / booksPerPage));
                    } else if (response.data.books) {
                        setBooks(response.data.books);
                        setTotalBooks(response.data.total);
                        setTotalPages(Math.ceil(response.data.total / booksPerPage));
                    } else {
                        setBooks([]);
                        setTotalBooks(0);
                        setTotalPages(1);
                    }
                }
            } catch (error) {
                console.error('Error details:', error);
                if (error.response) {
                    console.error('Error response:', error.response.data);
                }
                setBooks([]);
                setTotalBooks(0);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [selectedGenres, Sort, language, genreQuery, currentPage]);

    return (
        <>
            <BookstoreNavigation />
            <FilterSection 
                showGenre={true}
                genreOptions={genreOptions}
                selectedGenres={selectedGenres}
                onGenreChange={handleGenreChange}
                languageOptions={languageOptions}
                language={language}
                onLanguageChange={handleLanguageChange}
                sortOptions={sortOptions}
                sort={Sort}
                onSortChange={handleSortChange}
            />

            {loading ? (
                <div className="flex justify-center items-center min-h-[200px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <>
                    <BookCollection data={books} text={`هەموو کتێبەکان (${totalBooks})`} path="/Books" />
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
            <Footer />
        </>
    );
}

export default Books;