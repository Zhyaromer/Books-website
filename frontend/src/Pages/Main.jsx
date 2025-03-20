import BookstoreNavigation from "../Components/layout/Navigation";
import BookSlider from "../Components/layout/BookSlider";
import BookCardMain from "../Components/layout/BookCardMain";
import MultipleAuthorsCard from "../Components/layout/AuthorsCardLanding";
import Footer from "../Components/layout/Footer";
import Quotes from "../Components/layout/QuotesCards";
import SeriesCard from "../Components/layout/SeriesCard";
import { useState, useEffect } from "react";
import LoadingUi from '../Components/my-ui/Loading';
import { axiosInstance } from "../context/AxiosInstance";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom";

const Main = () => {
    const navigate = useNavigate();
    const [sliderbooks, setsliderbooks] = useState([]);
    const [kurdishbooks, setkurdishbooks] = useState([]);
    const [englishbooks, setenglishbooks] = useState([]);
    const [trendingbooks, settrendingbooks] = useState([]);
    const [romancebooks, setromancebooks] = useState([]);
    const [famousauthors, setfamousauthors] = useState([]);
    const [series, setseries] = useState([]);
    const [getquotes, setquotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            setIsLoading(true);

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
                    axiosInstance.get("/books/getnwewestbooks"),
                    axiosInstance.get("/books/getBooksMainPage/?language=kurdish"),
                    axiosInstance.get("/books/getBooksMainPage/?language=English"),
                    axiosInstance.get("/books/getTrendingBooks"),
                    axiosInstance.get("/books/getBooksMainPage/?genre=ڕۆمانس"),
                    axiosInstance.get("/authors/getfamousauthors"),
                    axiosInstance.get("/books/getBookQuotes"),
                    axiosInstance.get("/bookseries/getseriesmainpage")
                ]);

                setsliderbooks(sliderResponse.data);
                setkurdishbooks(kurdishResponse.data);
                setenglishbooks(englishResponse.data);
                settrendingbooks(trendingResponse.data);
                setromancebooks(romanceResponse.data);
                setfamousauthors(authorsResponse.data);
                setquotes(Array.isArray(quotesResponse.data) ? quotesResponse.data : []);
                setseries(seriesResponse.data);
            } catch {
               toast.error("هەڵەیەک ڕوویدا، تکایە دووبارە هەوڵ بدە")
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, []);

    return (
        <div>
            {isLoading ? (
                <LoadingUi />
            ) : (
                <div>
                    <BookstoreNavigation />
                    <div className="pt-20">
                        <BookSlider data={sliderbooks} />
                    </div>
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
                                    onClick={() => navigate("/bookseries")}
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
            <ToastContainer draggable={true} transition={Slide} autoClose={2000} />
        </div>
    );
};

export default Main;