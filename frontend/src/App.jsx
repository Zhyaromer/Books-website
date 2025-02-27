import "./index.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookstoreNavigation from "./Pages/A";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1 className="text-3xl text-sky-500">Home</h1>} />
        <Route path="/nav" element={<BookstoreNavigation />} />
      </Routes>
    </Router>
  )
}

export default App
