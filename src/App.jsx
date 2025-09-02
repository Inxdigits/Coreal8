import { Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage.jsx';
import Contact from './Components/Contact/Contact.jsx';
import Courses from './Components/Courses/Courses.jsx';
import About from "./Components/About/About.jsx";
import Counseling from "./Components/Counseling/Counseling.jsx";
import ServicePage from './Components/ServicePage/ServicePage.jsx';
import Podcasts from './Components/Podcasts/Podcasts.jsx';
import Mentorship from './Components/Mentorship/Mentorship.jsx';
import Blog from './Components/Blog/Blog.jsx';
import Privacy from "./Components/Privacy/Privacy.jsx"
import './App.css';
import CartPage from './Components/CartPage/CartPage.jsx';
import LoginPage from './Components/LoginPage/LoginPage.jsx';
import Register from './Components/LoginPage/Register/Register.jsx';
import ForgotPassword from './Components/LoginPage/ForgotPassword/ForgotPassword.jsx';
import Dashboard from './Components/LMS/Dashboard/Dashboard.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<ServicePage />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/about" element={<About />} />
      <Route path="/podcast" element={<Podcasts />}/>
      <Route path="/counseling" element={<Counseling />} />
      <Route path="/mentoring" element={<Mentorship />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />}/>
      <Route path='/privacy' element={<Privacy/>}/>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path='/dashboard' element={<Dashboard />} />
      {/* Add other routes as needed */}
    </Routes>
  );
}

export default App;
