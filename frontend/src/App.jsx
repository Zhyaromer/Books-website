import "./index.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookstoreNavigation from "./Pages/A";
import BookSlider from "./Pages/B";
import BookCollection from "./Pages/C";
import Main from "./Pages/Main";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1 className="text-3xl text-sky-500">Home</h1>} />
        <Route path="/nav" element={<BookstoreNavigation />} />
        <Route path="/slider" element={<BookSlider />} />
        <Route path="/col" element={<BookCollection />} />
        <Route path="/m" element={<Main />} />
      </Routes>
    </Router>
  )
}

export default App
