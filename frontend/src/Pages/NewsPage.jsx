import NewsCard from '../Components/layout/NewsCard';
import BookstoreNavigation from "../Components/layout/Navigation";
import Footer from "../Components/layout/Footer";
import LoadingUi from "@/Components/my-ui/Loading";
import { useState, useEffect } from "react";
import axios from "axios";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:3000/news/getallnews");
        if (res.data && res.status === 200) {
          setLoading(false);
          setNews(res.data);
        }
      } catch (error) {
        console.error(error);
        setNews([]);
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (Loading) {
    return <LoadingUi />
  }

  return (
    <div>
      <BookstoreNavigation />
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold mb-8 text-right">دوایین هەواڵەکان</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {news.map(news => (
            <NewsCard
              key={news.id}
              data={news}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsPage; 