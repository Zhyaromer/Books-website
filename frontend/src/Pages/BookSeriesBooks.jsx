import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookstoreNavigation from '../Components/layout/Navigation';
import Footer from '../Components/layout/Footer';
import LoadingUi from '../Components/my-ui/Loading';
import DetailedBookCard from '../Components/layout/DetailedBookCard';

const BookSeriesBooks = () => {
    const { id } = useParams();
    const [books, setBooks] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3000/bookseries/getBookSeriesById/${id}`);
                if (response.data && response.status === 200) {
                    setBooks(response.data.books);
                    setSeries(response?.data?.series);
                } else {
                    setBooks([]);
                }
            } catch (error) {
                console.error(error);
                setBooks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [id]);

    if (loading) {
        return <LoadingUi />;
    }

    return (
        <div>
            <BookstoreNavigation />

            <div className="relative h-full px-4 md:px-12 pt-20 md:pt-32">
                <img className="w-full h-48 md:h-72 object-cover" src={series.cover_img} alt="" />
                <div className='absolute bottom-2 left-0 right-0 text-center'>
                    <p className="text-xl md:text-2xl font-bold text-white px-4 py-2 bg-purple-500 rounded-full shadow-lg inline-block">
                        {series.series_title}
                    </p>
                </div>
            </div>


            <div dir='rtl' className="max-w-6xl mx-auto py-8 px-4 pt-12">
                <DetailedBookCard books={books} />
            </div>
            <Footer />
        </div>
    )
}

export default BookSeriesBooks