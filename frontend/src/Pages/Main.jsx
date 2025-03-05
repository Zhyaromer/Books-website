import BookstoreNavigation from "../Components/layout/Navigation";
import BookSlider from "../Components/layout/BookSlider";
import BookCollection from "../Components/layout/BookCard";
import MultipleAuthorsCard from "../Components/layout/AuthorsCardLanding";
import Footer from "../Components/layout/Footer";
import Quotes from "../Components/layout/QuotesCards";
import { useState, useEffect } from "react";
import axios from "axios";

const Main = () => {
    const [sliderbooks, setsliderbooks] = useState([]);
    const [kurdishbooks, setkurdishbooks] = useState([]);
    const [englishbooks, setenglishbooks] = useState([]);
    const [trendingbooks, settrendingbooks] = useState([]);
    const [romancebooks, setromancebooks] = useState([]);
    const [famousauthors, setfamousauthors] = useState([]);
    const [getquotes, setquotes] = useState([]);

    useEffect(() => {
        const sliderBooks = async () => {
            try {
                const response = await axios.get("http://localhost:3000/books/getnwewestbooks");
                setsliderbooks(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const kurdishBooks = async () => {
            try {
                const response = await axios.get("http://localhost:3000/books/getBooksMainPage/?language=kurdish");
                setkurdishbooks(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const EnglishBooks = async () => {
            try {
                const response = await axios.get("http://localhost:3000/books/getBooksMainPage/?language=English");
                setenglishbooks(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const TrendingBooks = async () => {
            try {
                const response = await axios.get("http://localhost:3000/books/getTrendingBooks/");
                settrendingbooks(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const RomanceBooks = async () => {
            try {
                const response = await axios.get("http://localhost:3000/books/getBooksMainPage/?genre=ڕۆمانس");
                setromancebooks(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const famousAuthors = async () => {
            try {
                const response = await axios.get("http://localhost:3000/authors/getfamousauthors");
                setfamousauthors(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const getQuotes = async () => {
            try {
                const response = await axios.get("http://localhost:3000/books/getBookQuotes");
                console.log("API Response:", response.data); // Debugging
        
                if (Array.isArray(response.data)) {
                    setquotes(response.data);  // ✅ Set the whole array
                } else {
                    console.error("Expected an array but got:", response.data);
                    setquotes([]);  // Safe fallback
                }
                
            } catch (error) {
                console.error("Error fetching quotes:", error);
                setquotes([]);  // Prevent crashes
            }
        };

        sliderBooks();
        kurdishBooks();
        EnglishBooks();
        TrendingBooks();
        RomanceBooks();
        famousAuthors();
        getQuotes();
    }, []);

    return (
        <div>
            <BookstoreNavigation />
            <BookSlider data={sliderbooks} />
            <BookCollection data={kurdishbooks} text="نوێترین کتێبە کوردیەکان" path="/books?language=Kurdish" />
            <BookCollection data={englishbooks} text="نوێترین کتێبە ئینگلیزیەکان" path="/books?language=English" />
            <BookCollection data={trendingbooks} text="کتێبی تریندینگ" path="/trending" />
            <BookCollection data={romancebooks} text="کتێبی ڕۆمانس" path="/books?genre=ڕۆمانس" />
            <Quotes quotes={getquotes} />
            <MultipleAuthorsCard data={famousauthors} />
            <Footer />
        </div>
    );
};

export default Main;