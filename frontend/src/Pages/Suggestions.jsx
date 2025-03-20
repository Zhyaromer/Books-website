import BookstoreNavigation from "../Components/layout/Navigation";
import BookCardMain from "../Components/layout/BookCardMain";
import Footer from "../Components/layout/Footer";
import LoadingUi from "@/Components/my-ui/Loading";
import { useState, useEffect } from "react";
import { axiosInstance } from "../context/AxiosInstance";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Suggestions = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [controller, setController] = useState(null);

    const fetchBooksData = async (abortController) => {
        try {
            setLoading(true);
            const res = await axiosInstance.get("/books/getRandomBooks", { signal: abortController.signal });
            if (res.data && res.status === 200) {
                setBooks(res.data);
            } else {
                setBooks([]);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            if (error.name !== "CanceledError") {
                setBooks([]);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const abortController = new AbortController();
        setController(abortController);
        fetchBooksData(abortController);

        return () => abortController.abort();
    }, []);

    const handleFetchBooks = () => {
        if (controller) {
            controller.abort();
        }
        const newController = new AbortController();
        setController(newController);
        fetchBooksData(newController);
    };

    if (loading) {
        return <LoadingUi />;
    }

    return (
        <>
            <BookstoreNavigation />
            <div className="py-20">
                <div className="flex justify-end px-4 md:px-0 py-4 max-w-7xl mx-auto">
                    <button
                        onClick={handleFetchBooks}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                    >
                        پێشنیاری نوێ
                    </button>
                </div>
                <BookCardMain data={books} path={"/Books"} text={"پێشنیاری ئێمە"} />
            </div>
            <Footer />
            <ToastContainer draggable={true} transition={Slide} autoClose={2000} />
        </>
    );
}

export default Suggestions;
