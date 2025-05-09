import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookstoreNavigation from "../Components/layout/Navigation";
import Footer from "../Components/layout/Footer";
import LoadingUi from "@/Components/my-ui/Loading";
import { Eye, Calendar } from 'lucide-react';
import LatestNewsCard from '../Components/layout/LatestNewsCard';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { axiosInstance } from "../context/AxiosInstance";
import NotFound from './NotFound';

const NewsDetails = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasFound, setHasFound] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res1 = await axiosInstance.get(`/news/getNewsById/${id}`);
        const res2 = await axiosInstance.get('/news/getnewestnews');

        if (res1.status === 200 && res2.status === 200) {
          setNews(res1.data);
          setLoading(false);
          const filteredNews = res2.data.filter(item => item.id !== parseInt(id));
          setLatestNews(filteredNews);
          await axiosInstance.get(`/news/incrementnewsview/${id}`);
        }
      } catch (error) {
        toast.error(error.response.data.message || "Something went wrong");
        if (error.response.status === 404) {
          setHasFound(false);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (!hasFound) return <NotFound />;

  return (
    <div >
      <BookstoreNavigation />
      {loading ? (
        <> <LoadingUi /></>
      ) : (
        <div>
          <div dir='rtl' className="container mx-auto px-4 py-8 pt-24">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-3/4">
                <div className="relative h-[400px] w-full mb-8">
                  <img
                    src={news.cover_image}
                    alt={news.title}
                    className="w-full h-full object-cover rounded-xl"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/1200x400?text=No+Image';
                    }}
                  />
                </div>

                <div className="rtl">
                  <h1 className="text-4xl font-bold text-gray-100 mb-4">
                    {news.title}
                  </h1>

                  <div className="flex items-center gap-6 text-gray-300 mb-8 border-b border-gray-600 pb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={20} />
                      <span>{new Date(news.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye size={20} />
                      <span>{news.views} بینین</span>
                    </div>
                  </div>

                  <div className="prose prose-lg max-w-none text-gray-200 leading-relaxed">
                    <p className="whitespace-pre-wrap">{news.description}</p>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/4">
                <div className="bg-[#1a1a1a] rounded-xl p-6 rtl sticky top-24">
                  <h2 className="text-xl font-bold mb-6 text-gray-200 border-b border-gray-600 pb-2">
                    دوایین هەواڵەکان
                  </h2>
                  <div className="space-y-6">
                    {latestNews.length > 0 ? (
                      latestNews.map((item) => (
                        <LatestNewsCard key={item.id} news={item} />
                      ))
                    ) : (
                      <div className="text-center text-gray-100">
                        هیچ هەواڵێکی تر نییە
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
      <ToastContainer transition={Slide} />
    </div>
  );
};

export default NewsDetails; 