import "./index.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from "./Pages/Main";
import Books from "./Pages/Books";
import BookDetail from "./Pages/BookDetails";
import Authors from "./Pages/Authors";
import AuthorDetails from "./Pages/AuthorDetails";
import Quotes from "./Pages/Quotes";
import Suggestions from "./Pages/Suggestions";
import NewsPage from "./Pages/NewsPage";
import NewsDetails from "./Pages/NewsDetails";
import About from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import BookSeriesPage from "./Pages/BookSeriesPage";
import BookSeriesBooks from "./Pages/BookSeriesBooks";
import Signup from "./Pages/Signup";
import KurdishLoginForm from "./Pages/Login";
import Profile from "./Pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/books" element={<Books />} />
        <Route path="/booksDetail/:id" element={<BookDetail />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/AuthorDetails/:id" element={<AuthorDetails />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/newsdetails/:id" element={<NewsDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/bookseries" element={<BookSeriesPage />} />
        <Route path="/seriesbooks/:id" element={<BookSeriesBooks />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<KurdishLoginForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;