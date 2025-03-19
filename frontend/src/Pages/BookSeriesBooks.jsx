import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookstoreNavigation from '../Components/layout/Navigation';
import Footer from '../Components/layout/Footer';
import LoadingUi from '../Components/my-ui/Loading';
import DetailedBookCard from '../Components/layout/DetailedBookCard';
import { Card } from "@/Components/ui/card";
import { BookOpen } from "lucide-react";
import { axiosInstance } from "../context/AxiosInstance";

const BookSeriesBooks = () => {
    const { id } = useParams();
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`http://localhost:3000/bookseries/getBookSeriesById/${id}`);
                if (response.data && response.status === 200) {
                    setBooks(response.data.books);
                    setSeries(response?.data?.series);
                } else {
                    setBooks([]);
                }
            } catch (error) {
                if (error.response.status === 404) {
                    navigate('/404');
                  }
                setBooks([]);
                setSeries([]);
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

            <div className="bg-background py-8 px-4 pt-20" dir="rtl">
                <div className="max-w-6xl mx-auto">
                    <Card
                        className="group relative overflow-hidden h-48 md:h-56"
                    >
                        <div className="absolute inset-0">
                            <img
                                src={series.cover_img}
                                alt={series.series_title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-l from-black/90 to-black/60" />
                        </div>

                        <div className="relative h-full p-4 md:p-6 flex flex-col justify-between text-white">
                            <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl md:text-2xl font-bold">{series.series_title}</h3>
                                    <span className={`text-xs md:text-sm px-2 py-0.5 rounded-full ${series.state === "بەردەوامە"
                                        ? "bg-green-500/20 text-green-200 ring-1 ring-green-500/50"
                                        : "bg-blue-500/20 text-blue-200 ring-1 ring-blue-500/50"
                                        }`}>
                                        {series.state}
                                    </span>
                                </div>
                                <p className="text-sm md:text-base text-gray-300 line-clamp-3">
                                    {series.description}
                                </p>
                            </div>

                            <div className="flex flex-row-reverse items-center justify-end gap-2 text-gray-300">
                                <span className="text-sm md:text-base">{books.length} کتێب</span>
                                <BookOpen className="w-4 h-4 md:w-5 md:h-5 opacity-75" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="max-w-6xl mx-auto py-8 px-4 pt-12">
                <DetailedBookCard books={books} />
            </div>
            <Footer />
        </div>
    )
}

export default BookSeriesBooks