import { useState, useEffect } from 'react';
import Footer from '../Components/layout/Footer';
import QuotesCards from '../Components/layout/QuotesCards';
import BookstoreNavigation from '../Components/layout/Navigation';
import LoadingUi from '../Components/my-ui/Loading';
import { axiosInstance } from "../context/AxiosInstance";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Quotes = () => {
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
            {loading ? (
                <>
                    <LoadingUi />
                </>
            ) : (
                <div>
                    <div className='py-32 md:py-48'>
                        <div className='flex justify-center'>
                            <button
                                onClick={() => fetchQuotes()}
                                className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mb-4'
                            >
                                وتەی تازە
                            </button>
                        </div>
                        <QuotesCards quotes={quotes} />
                    </div>
                </div>
            )}
            <Footer />
            <ToastContainer draggable={true} transition={Slide} autoClose={2000} />
        </>
    );
};

export default Quotes;