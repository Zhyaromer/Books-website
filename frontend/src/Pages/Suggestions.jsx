import BookstoreNavigation from "../Components/layout/Navigation";
import BookCollection from "../Components/layout/BookCard";
import Footer from "../Components/layout/Footer";
import LoadingUi from "@/Components/my-ui/Loading";
import { useState, useEffect } from "react";
import axios from "axios";

const Suggestions = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [controller, setController] = useState(null);

    const fetchBooksData = async (abortController) => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:3000/books/getRandomBooks", { signal: abortController.signal });
            if (res.data && res.status === 200) {
                setBooks(res.data);
            } else {
                setBooks([]);
            }
        } catch (error) {
            if (error.name !== "CanceledError") {
                console.error(error);
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

        return () => abortController.abort(); // Cleanup on unmount
    }, []);

    const handleFetchBooks = () => {
        if (controller) {
            controller.abort(); // Cancel previous request
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
                <div className="flex justify-end px-8 py-4">
                    <button 
                        onClick={handleFetchBooks} 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                    >
                        پێشنیاری ئێمە
                    </button>
                </div>
                <BookCollection data={books} path={"/Bookdetails"} text={"پێشنیاری ئێمە"} />
            </div>
            <Footer />
        </>
    );
}

export default Suggestions;
