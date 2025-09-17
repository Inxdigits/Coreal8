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

// NEW imports
import { WaitlistProvider } from '../src/context/WaitListcontext.jsx';
import WaitlistModal from './Components/LMS/Waitlist/Waitlist.jsx';
import ScrollToTop from './ScrollToTop.js';
import Terms from './Components/Terms/Terms.jsx';

function App() {
  return (
    <WaitlistProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/about" element={<About />} />
        <Route path="/podcast" element={<Podcasts />}/>
        <Route path="/counselling" element={<Counseling />} />
        <Route path="/mentoring" element={<Mentorship />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />}/>
        <Route path='/privacy-policy' element={<Privacy/>}/>
        <Route path='/terms-of-service' element={<Terms />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>

      <WaitlistModal />
    </WaitlistProvider>
  );
}

export default App;
