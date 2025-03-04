import { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../Components/layout/Footer';
import QuotesCards from '../Components/layout/QuotesCards';
import BookstoreNavigation from '../Components/layout/Navigation';
import LoadingUi from '../Components/my-ui/Loading';

const Quotes = () => {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchQuotes = async () => {
        const controller = new AbortController();
        const signal = controller.signal;

        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/books/getBookQuotes', { signal });
            if (response.data && response.status === 200) {
                setQuotes(response.data);
            } else {
                setQuotes([]);
            }
        } catch (error) {
            if (error.name !== 'CanceledError') {
                console.error(error);
                setQuotes([]);
            }
        } finally {
            setLoading(false);
        }

        return () => {
            controller.abort();
        };
    };

    useEffect(() => {
        fetchQuotes();
    }, []);

    if (loading) {
        return <LoadingUi />;
    }

    return (
        <div>
            <BookstoreNavigation />
            <div className='py-32 md:py-48'>
                <div className='flex justify-center '>
                    <button onClick={() => fetchQuotes()} className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mb-4' >وتەی تازە</button>
                </div>
                <QuotesCards quotes={quotes} />
            </div>
            <Footer />
        </div>
    )
}

export default Quotes