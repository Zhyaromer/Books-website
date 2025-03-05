import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookstoreNavigation from '../Components/layout/Navigation';
import Footer from '../Components/layout/Footer';
import LoadingUi from '../Components/my-ui/Loading';

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

          <div className={books.length === 0 ? "hidden" : "block"}>
            <div className='flex flex-row gap-2'>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">کتێبەکانی {author.name}</h2>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{`(${books.length})`}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {books.map((book, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex">
                  <div className="w-1/3 bg-gray-200">
                    <img
                      src={book.cover_image}
                      alt={book.title}
                      className="w-full h-[248px] md:h-full object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{book.title}</h3>
                    <p className="text-gray-500 md:text-base text-sm mb-2">بەرواری بڵاوکردنەوە {new Date(book.published_date).getFullYear()} • {book.page_count} لاپەڕە</p>
                    <p className="text-gray-700 md:text-base text-sm hidden md:block">{book?.description?.length > 170 ? `${book.description.substring(0, 170)}...` : book.description}</p>
                    <p className="text-gray-700 md:text-base text-sm block md:hidden">{book?.description?.length > 80 ? `${book.description.substring(0, 80)}...` : book.description}</p>
                    <button onClick={() => navigate(`/booksDetail/${book.id}`)} className='mt-4 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded'>بینینی کتێب</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthorDetails;