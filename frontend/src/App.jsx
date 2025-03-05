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
      </Routes>
    </Router>
  );
}

export default App;
