import BookstoreNavigation from "../Components/layout/Navigation";
import BookSlider from "../Components/layout/BookSlider";
import BookCardMain from "../Components/layout/BookCardMain";
import MultipleAuthorsCard from "../Components/layout/AuthorsCardLanding";
import Footer from "../Components/layout/Footer";
import Quotes from "../Components/layout/QuotesCards";
import SeriesCard from "../Components/layout/SeriesCard";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import LoadingUi from '../Components/my-ui/Loading';
const results = {
    books: [
        { id: 1, title: 'مەم و زین', author: 'ئەحمەدی خانی', cover_image: null, genre: 'کلاسیک' },
        { id: 2, title: 'دیوانی نالی', author: 'نالی', cover_image: null, genre: 'شیعر' },
        { id: 3, title: 'ئەو پیاوەی بە لاى سەگەوە دەڕۆيشت', author: 'کامەران سوبحان', cover_image: null, genre: 'ڕۆمان' },
        { id: 4, title: 'تاریکی ڕووناکی', author: 'شێرکۆ بێکەس', cover_image: null, genre: 'شیعر' },
    ],
    authors: [
        { id: 1, name: 'ئەحمەدی خانی', books: 5, image: null, bio: 'شاعیر و نووسەری بەناوبانگی کلاسیکی کورد' },
        { id: 2, name: 'نالی', books: 8, image: null, bio: 'شاعیری گەورەی کورد' },
        { id: 3, name: 'شێرکۆ بێکەس', books: 12, image: null, bio: 'شاعیری هاوچەرخی کورد' },
    ],
    users: [
        { id: 1, username: 'کاردۆ', coverImgURL: null, name: 'کاردۆ محەمەد' },
        { id: 2, username: 'شەیدا', coverImgURL: null, name: 'شەیدا ئەحمەد' },
    ]
};
const Main = () => {

    const [sliderbooks, setsliderbooks] = useState([]);
    const [kurdishbooks, setkurdishbooks] = useState([]);
    const [englishbooks, setenglishbooks] = useState([]);
    const [trendingbooks, settrendingbooks] = useState([]);
    const [romancebooks, setromancebooks] = useState([]);
    const [famousauthors, setfamousauthors] = useState([]);
    const [series, setseries] = useState([]);
    const [getquotes, setquotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const fetchAllData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const [
                    sliderResponse,
                    kurdishResponse,
                    englishResponse,
                    trendingResponse,
                    romanceResponse,
                    authorsResponse,
                    quotesResponse,
                    seriesResponse
                ] = await Promise.all([
                    axios.get("http://localhost:3000/books/getnwewestbooks"),
                    axios.get("http://localhost:3000/books/getBooksMainPage/?language=kurdish"),
                    axios.get("http://localhost:3000/books/getBooksMainPage/?language=English"),
                    axios.get("http://localhost:3000/books/getTrendingBooks"),
                    axios.get("http://localhost:3000/books/getBooksMainPage/?genre=ڕۆمانس"),
                    axios.get("http://localhost:3000/authors/getfamousauthors"),
                    axios.get("http://localhost:3000/books/getBookQuotes"),
                    axios.get("http://localhost:3000/bookseries/getseriesmainpage")
                ]);

                setsliderbooks(sliderResponse.data);
                setkurdishbooks(kurdishResponse.data);
                setenglishbooks(englishResponse.data);
                settrendingbooks(trendingResponse.data);
                setromancebooks(romanceResponse.data);
                setfamousauthors(authorsResponse.data);
                setquotes(Array.isArray(quotesResponse.data) ? quotesResponse.data : []);
                setseries(seriesResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load data. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, []);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div>
            {isLoading ? (
                <LoadingUi />
            ) : (
                <div>
                    <BookstoreNavigation />
                    <BookSlider data={sliderbooks} />
                    <BookCardMain data={kurdishbooks} text="نوێترین کتێبە کوردیەکان" path="/books?language=Kurdish" />
                    <BookCardMain data={englishbooks} text="نوێترین کتێبە ئینگلیزیەکان" path="/books?language=English" />
                    <BookCardMain data={trendingbooks} text="کتێبی تریندینگ" path="/Books" />
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
            )}
        </div>
    );
};

export default Main;