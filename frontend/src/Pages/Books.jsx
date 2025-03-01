import BookstoreNavigation from "../Components/layout/Navigation";
import BookCollection from "../Components/layout/BookCard";
import Footer from "../Components/layout/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import Selection from "../Components/my-ui/Selection";
import MultipleSelection from "@/Components/my-ui/MultipleSelection";
import { sortOptions, genreOptions, languageOptions } from "@/Helpers/Options";

const Books = () => {
    const [Sort, setSort] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                console.log(Sort);
                const genreParams = selectedGenres.map(genre => genre.value).join(',');
                const response = await axios.get(`http://localhost:3000/books/getAllBooks?genre=${genreParams}&sorting=${Sort}`);
                setBooks(response.data);
               console.log(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
    
        fetchBooks();
    }, [selectedGenres, Sort]);

    return (
        <>

            <Selection
                options={sortOptions}
                label="Sort By"
                placeholder="Sort By"
                value={Sort}
                onChange={(value) => setSort(value)}
            />

            <MultipleSelection
                options={genreOptions}
                label="Genre"
                placeholder="Genre"
                onChange={(value) => setSelectedGenres(value)}
            />

           <BookCollection data={books} text="Book Collection" path="/Books" />
        </>
    )
}

export default Books