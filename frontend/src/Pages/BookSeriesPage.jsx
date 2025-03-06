import SeriesCard from "../Components/layout/SeriesCard";
import { useState, useEffect } from "react";
import axios from "axios";
import BookstoreNavigation from "../Components/layout/Navigation";
import Footer from "../Components/layout/Footer";

const BookSeriesPage = () => {
  const [bookSeries, setBookSeries] = useState([]);

  useEffect(() => {
    const fetchBookSeries = async () => {
      try {
        const res = await axios.get("http://localhost:3000/bookseries/getAllBookSeries");
        if (res.data && res.status === 200) {
          setBookSeries(res.data);
        } else {
          setBookSeries([]);
        }
      } catch (error) {
        console.error(error);
        setBookSeries([]);
      }
    }

    fetchBookSeries();
  }, []);

  return (
    <div>
      <BookstoreNavigation />
      <div className="min-h-screen bg-background py-8 px-4 pt-20" dir="rtl">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl md:text-3xl font-bold text-right mb-6 md:mb-8 text-primary">
            زنجیرە کتێبەکان
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {bookSeries.map((series) => (
              <SeriesCard key={series.id} series={series} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default BookSeriesPage; 