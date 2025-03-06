import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookstoreNavigation from '../Components/layout/Navigation';
import Footer from '../Components/layout/Footer';
import LoadingUi from '../Components/my-ui/Loading';
import DetailedBookCard from '../Components/layout/DetailedBookCard';

const AuthorDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [author, setAuthor] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchAuthor = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/authors/getAuthorById/${id}`, { signal });

        if (response.data && response.data.author && response.data.books) {
          setAuthor(response.data.author[0] || null);
          setBooks(response.data.books || []);
        } else {
          setAuthor(null);
          setBooks([]);
        }
      } catch (error) {
        if (error.name !== 'CanceledError') {
          console.error(error);
          setAuthor(null);
          setBooks([]);
        }
      } finally {
        setLoading(false);
      }
    };

    const incrementViewCount = async () => {
      try {
        await axios.get(`http://localhost:3000/authors/incrementauthorview/${id}`);
      } catch (error) {
        console.error('Failed to increment view count', error);
      }
    }

    fetchAuthor();
    incrementViewCount();

    return () => {
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return <LoadingUi />
  }

  return (
    <div>
      <BookstoreNavigation />
      <div dir='rtl' className="bg-gray-50 min-h-screen pt-16">
        <div className="max-w-6xl mx-auto py-8 px-4">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-lg shadow-md overflow-hidden mb-8">
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

          <DetailedBookCard books={books} author={author.name} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthorDetails;