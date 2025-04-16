import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookstoreNavigation from '../Components/layout/Navigation';
import Footer from '../Components/layout/Footer';
import LoadingUi from '../Components/my-ui/Loading';
import DetailedBookCard from '../Components/layout/DetailedBookCard';
import { axiosInstance } from "../context/AxiosInstance";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import NotFound from './NotFound';

const AuthorDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [author, setAuthor] = useState([]);
  const [books, setBooks] = useState([]);
  const [hasfound, setHasFound] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchAuthor = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/authors/getAuthorById/${id}`, { signal });
        if (response.data && response.data.author && response.data.books) {
          setAuthor(response.data.author[0] || null);
          setBooks(response.data.books || []);
        } else {
          toast.error(response.data.message || "Something went wrong");
          setAuthor(null);
          setBooks([]);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
        if (error.response.status === 404) {
          setHasFound(false);
        }
        if (error.name !== 'CanceledError') {
          setAuthor(null);
          setBooks([]);
        }
      } finally {
        setLoading(false);
      }
    };

    const incrementViewCount = async () => {
      try {
        await axiosInstance.get(`/authors/incrementauthorview/${id}`);
      } catch {
        // silent ignore
      }
    }

    fetchAuthor();
    incrementViewCount();

    return () => {
      controller.abort();
    };
  }, [id]);

  if (!hasfound) {
    return <NotFound />
  }

  if (loading) {
    return <LoadingUi />
  }

  return (
    <div>
      <BookstoreNavigation />
      <div dir='rtl' className="bg-[#121212] min-h-screen pt-16">
        <div className="max-w-7xl mx-auto w-full py-8 px-6">
          <div className="bg-[#1a1a1a] text-gray-100 rounded-lg shadow-md overflow-hidden mb-8">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={author.imgURL}
                  alt={author.name}
                  className="w-full h-80 object-cover object-center"
                />
              </div>
              <div className="p-6 md:w-2/3">
                <h1 className="text-3xl font-bold text-white mb-4">{author.name}</h1>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-white">بەرواری لەدایک بوون</p>
                    <p className="font-medium">{new Date(author.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white">وڵاتی لەدایک بوون</p>
                    <p className="font-medium">{author.country}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white">بینەر</p>
                    <p className="font-medium">{author.views}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white">زمان</p>
                    <p onClick={() => navigate(`/authors?language=${author.language}`)} className="font-medium cursor-pointer">{author.language}</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white mb-2">ژیاننامە</h2>
                  <p className="text-white">{author.bio}</p>
                </div>
              </div>
            </div>
          </div>

          <DetailedBookCard books={books} endpoint='author' author={author.name} />
        </div>
      </div>
      <Footer />
      <ToastContainer draggable={true} transition={Slide} autoClose={2000} />
    </div>
  );
};

export default AuthorDetails;