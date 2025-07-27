import { Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage.jsx';
import Contact from './Components/Contact/Contact.jsx';
import Courses from './Components/Courses/Courses.jsx';
import About from "./Components/About/About.jsx";
import Counseling from "./Components/Counseling/Counseling.jsx";
import ServicePage from './Components/ServicePage/ServicePage.jsx';
import Podcasts from './Components/Podcasts/Podcasts.jsx';
import Blog from './Components/Blog/Blog.jsx';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<ServicePage />} />
      <Route path="/blog" element={<Blog />} />
      {/* <Route path="/cart" element={<Cart />} /> */}
      <Route path="/courses" element={<Courses />} />
      <Route path="/about" element={<About />} />
      <Route path="/podcast" element={<Podcasts />}/>
      <Route path="/counseling" element={<Counseling />} />
    </Routes>
  );
}

export default App;
