import "./index.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1 className="text-3xl text-sky-500">Home</h1>} />
      </Routes>
    </Router>
  )
}

export default App
