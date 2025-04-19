import BookstoreNavigation from "../Components/layout/Navigation";
import BookCardMain from "../Components/layout/BookCardMain";
import Footer from "../Components/layout/Footer";
import LoadingUi from "@/Components/my-ui/Loading";
import { useState, useEffect, useRef } from "react";
import { axiosInstance } from "../context/AxiosInstance";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from "../context/ThemeContext";

const Suggestions = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const controllerRef = useRef(null);
    const { main, secondary, tertiary } = useTheme();

    const fetchBooksData = async () => {
        try {
            setLoading(true);
            if (controllerRef.current) {
                controllerRef.current.abort();
            }

            const abortController = new AbortController();
            controllerRef.current = abortController;

            const res = await axiosInstance.get("/books/getRandomBooks", {
                signal: abortController.signal
            });

            if (res.data && res.status === 200) {
                setBooks(res.data);
            } else {
                setBooks([]);
            }
        } catch (error) {
            if (error.name !== "CanceledError") {
                toast.error(error.response?.data?.message || "Something went wrong");
                setBooks([]);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooksData();

        return () => {
            if (controllerRef.current) {
                controllerRef.current.abort();
            }
        };
    }, []);

    const handleFetchBooks = () => {
        fetchBooksData();
    };

    if (loading && books.length === 0) {
        return <LoadingUi />;
    }

    return (
        <>
            <BookstoreNavigation />
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center my-8">
                        <h1 className="text-xl md:text-3xl font-bold text-gray-100 mb-3">پێشنیاری کتێب</h1>
                        <p dir="rtl" className="text-sm md:text-lg text-gray-200 max-w-2xl mx-auto">
                            بێزار بویت لە گەڕان بە دوای کتێبێک بۆ خوێندنەوە؟ ئەتوانی پێشنیاری ئێمە وەربگرێت و دەست بە خوێندنەوە بکەیت
                        </p>
                    </div>
                    <div
                        className="max-w-7xl mx-auto flex flex-row justify-between items-center mb-8 border-b border-gray-600 pb-6">
                        <h1 className="text-base md:text-2xl font-bold text-gray-100">پێشنیاری ئێمە</h1>
                        <button
                            style={{ backgroundColor: secondary }}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = secondary)}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = tertiary)}
                            onClick={handleFetchBooks}
                            className="flex flex-row items-center gap-2 text-white font-bold py-2 md:py-3 px-2 md:px-4 rounded transition-colors duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span className="mr-2 text-sm md:text-base">پێشنیاری نوێ وەربگرە</span>
                        </button>
                    </div>
                </div>
                <BookCardMain data={books} path={"/Books"} text={""} />
            </div>
            <Footer />
            <ToastContainer draggable={true} transition={Slide} autoClose={2000} />
        </>
    );
}

export default Suggestions;