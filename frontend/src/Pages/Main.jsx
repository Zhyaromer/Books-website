import BookstoreNavigation from "./A";
import BookSlider from "./B";
import BookCollection from "./C";
import { useState, useEffect } from "react";
import axios from "axios";

const Main = () => {
    const [kurdishbooks, setkurdishbooks] = useState([]);
    const [englishbooks, setenglishbooks] = useState([]);
    const [trendingbooks, settrendingbooks] = useState([]);
    const [romancebooks, setromancebooks] = useState([]);

    useEffect(() => {
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

        kurdishBooks();
        EnglishBooks();
        TrendingBooks();
        RomanceBooks();
    }, []);

    return (
        <div>
            <BookstoreNavigation />
            <BookSlider />
            <BookCollection data={kurdishbooks} text="نوێترین کتێبە کوردیەکان" path="/kurdish" />
            <BookCollection data={englishbooks} text="نوێترین کتێبە ئینگلیزیەکان" path="/english" />
            <BookCollection data={trendingbooks} text="کتێبی تریندینگ" path="/trending" />
            <BookCollection data={romancebooks} text="کتێبی ڕۆمانس" path="/romance" />
        </div>
    );
};

export default Main;