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
import LoginForm from "./Pages/Login";
import Profile from "./Pages/Profile";
import SettingsPage from "./Pages/Settings";
import UserProfile from "./Pages/UserProfile";
import ForgotPassword from "./Pages/ForgotPassword";
import PasswordResetPage from "./Pages/ChangePassword";
import Admin from "./Pages/Admin";
import NotFoundPage from "./Pages/NotFound";

function App() {
  return (
    <div className="bg-[#121212]">
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
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/changepassword/:token" element={<PasswordResetPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;