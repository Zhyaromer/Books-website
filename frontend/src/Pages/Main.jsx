import BookstoreNavigation from "../Components/layout/Navigation";
import BookSlider from "../Components/layout/BookSlider";
import BookCardMain from "../Components/layout/BookCardMain";
import MultipleAuthorsCard from "../Components/layout/AuthorsCardLanding";
import Footer from "../Components/layout/Footer";
import Quotes from "../Components/layout/QuotesCards";
import SeriesCard from "../Components/layout/SeriesCard";
import { useState, useEffect } from "react";
import axios from "axios";

const Main = () => {
    const [sliderbooks, setsliderbooks] = useState([]);
    const [kurdishbooks, setkurdishbooks] = useState([]);
    const [englishbooks, setenglishbooks] = useState([]);
    const [trendingbooks, settrendingbooks] = useState([]);
    const [romancebooks, setromancebooks] = useState([]);
    const [famousauthors, setfamousauthors] = useState([]);
    const [series, setseries] = useState([]);
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
                const response = await axios.get("http://localhost:3000/books/getTrendingBooks");
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

                if (Array.isArray(response.data)) {
                    setquotes(response.data);
                } else {
                    console.error("Expected an array but got:", response.data);
                    setquotes([]);
                }
            } catch (error) {
                console.error("Error fetching quotes:", error);
                setquotes([]);
            }
        };

        const getseries = async () => {
            try {
                const response = await axios.get("http://localhost:3000/bookseries/getseriesmainpage");
                console.log(response.data);
                setseries(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        sliderBooks();
        kurdishBooks();
        EnglishBooks();
        TrendingBooks();
        RomanceBooks();
        famousAuthors();
        getQuotes();
        getseries();
    }, []);

    return (
        <div>
            <BookstoreNavigation />
            <BookSlider data={sliderbooks} />
            <BookCardMain data={kurdishbooks} text="نوێترین کتێبە کوردیەکان" path="/books?language=Kurdish" />
            <BookCardMain data={englishbooks} text="نوێترین کتێبە ئینگلیزیەکان" path="/books?language=English" />
            <BookCardMain data={trendingbooks} text="کتێبی تریندینگ" path="/trending" />
            <BookCardMain data={romancebooks} text="کتێبی ڕۆمانس" path="/books?genre=ڕۆمانس" />
            <Quotes quotes={getquotes} />
            <div>
                <div className={`flex pb-4 md:pb-8 flex-row-reverse items-center justify-between px-8 md:px-24`}>
                    <div>
                        <h1 className="font-sans text-base md:text-2xl font-bold text-indigo-700">زنجیرە کتێبەکان</h1>
                    </div>
                    <div >
                        <p
                            onClick={() => (window.location.href = "/bookseries")}
                            className="text-sm lg:text-base font-bold text-indigo-500 cursor-pointer hover:text-indigo-700 transition-colors"
                        >
                            بینینی هەمووی
                        </p>
                    </div>
                </div>

                <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-8 md:px-20">
                    {series.map((series) => (
                        <SeriesCard key={series.id} series={series} />
                    ))}
                </div>
            </div>
            <MultipleAuthorsCard data={famousauthors} />
            <Footer />
        </div>
    );
};

export default Main;