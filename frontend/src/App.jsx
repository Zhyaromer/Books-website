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
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/newsdetails/:id" element={<NewsDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/bookseries" element={<BookSeriesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
