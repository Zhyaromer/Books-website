import "./index.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from "./Pages/Main";
import Books from "./Pages/Books";
import BookDetail from "./Pages/BookDetails";
import ReviewSection from "./Components/layout/ReviewSection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/books" element={<Books />} />
        <Route path="/booksDetail/:id" element={<BookDetail />} />
        <Route path="/test" element={<ReviewSection />} />
      </Routes>
    </Router>
  )
}

export default App
