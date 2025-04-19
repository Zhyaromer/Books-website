import { useState, useEffect } from 'react';
import Footer from '../Components/layout/Footer';
import QuotesCards from '../Components/layout/QuotesCards';
import BookstoreNavigation from '../Components/layout/Navigation';
import LoadingUi from '../Components/my-ui/Loading';
import { axiosInstance } from "../context/AxiosInstance";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from "../context/ThemeContext";

const Quotes = () => {
    const { secondary, tertiary } = useTheme();
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchQuotes = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/books/getBookQuotes');

            if (response.data && response.status === 200) {
                setQuotes(response.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuotes();
    }, []);

    return (
        <>
            <BookstoreNavigation />

            <div className="bg-[#1a1a1a] min-h-screen pt-20">
                <div className="max-w-7xl mx-auto px-8 w-full pt-8 pb-16">
                    <div className="max-w-7xl mx-auto w-full flex flex-row justify-between items-center mb-8 border-b border-gray-600 pb-6">
                        <h1 className="text-xl md:text-3xl font-bold text-gray-100">وتەی کتێبەکان</h1>

                        <button
                            onClick={() => fetchQuotes()}
                            style={{
                                backgroundColor: secondary
                            }}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = secondary)}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = tertiary)}
                            className="text-white px-4 md:px-6 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            وتەی تازە
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-16">
                            <LoadingUi />
                        </div>
                    ) : (
                        <div className="quotes-container mt-8">
                            <QuotesCards quotes={quotes} />
                        </div>
                    )}
                </div>
            </div>

            <Footer />
            <ToastContainer
                position="bottom-right"
                draggable={true}
                transition={Slide}
                autoClose={2000}
            />
        </>
    );
};

export default Quotes;