import "./index.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from "./Pages/Main";
import Books from "./Pages/Books";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </Router>
  )
}

export default App
