import BookstoreNavigation from "../Components/layout/Navigation";
import BookCollection from "../Components/layout/BookCard";
import Footer from "../Components/layout/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import Selection from "../Components/my-ui/Selection";
import MultipleSelection from "@/Components/my-ui/MultipleSelection";
import { sortOptions, genreOptions, languageOptions } from "../Helpers/options";

const Books = () => {
    const [Sort, setSort] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [language, setLanguage] = useState(languageOptions?.value || "");
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                console.log(language);
                const genreParams = selectedGenres.map(genre => genre.value).join(',');
                const response = await axios.get(`http://localhost:3000/books/getAllBooks?genre=${genreParams}&sorting=${Sort}&language=${language}`);
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, [selectedGenres, Sort, language]);

    return (
        <>
            <BookstoreNavigation />
            <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6 pt-20 md:pt-32">
                <div dir="rtl" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="w-full">
                        <MultipleSelection
                            options={genreOptions}
                            label="چەشنەکان"
                            placeholder="چەشنێک هەڵبژێرە"
                            onChange={(value) => setSelectedGenres(value)}
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

            <BookCollection data={books} text="هەموو فیلمەکان" path="/Books" />
            <Footer />
        </>
    );
}

export default Books