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
import LMSCourses from './Components/LMS/Courses/LMSCourses.jsx';
import LMSMentorship from './Components/LMS/Mentorship/LMSMentorship.jsx';
import LMSCoaching from './Components/LMS/Coaching/LMSCoaching.jsx';
import LMSCounseling from './Components/LMS/Counseling/LMSCounseling.jsx';
import LMSSettings from './Components/LMS/Settings/LMSSettings.jsx';
import LMSCalendar from './Components/LMS/Calendar/LMSCalendar.jsx';
import LMSResources from './Components/LMS/Resources/LMSResources.jsx';
import RouteTransition from './Components/RouteTransition/RouteTransition.jsx';

// NEW imports
import { WaitlistProvider } from '../src/context/WaitListcontext.jsx';
import WaitlistModal from './Components/LMS/Waitlist/Waitlist.jsx';

function App() {
  return (
    <WaitlistProvider>
      <Routes>
        <Route path="/" element={<RouteTransition><HomePage /></RouteTransition>} />
        <Route path="/contact" element={<RouteTransition><Contact /></RouteTransition>} />
        <Route path="/services" element={<RouteTransition><ServicePage /></RouteTransition>} />
        <Route path="/blog" element={<RouteTransition><Blog /></RouteTransition>} />
        <Route path="/cart" element={<RouteTransition><CartPage /></RouteTransition>} />
        <Route path="/courses" element={<RouteTransition><Courses /></RouteTransition>} />
        <Route path="/about" element={<RouteTransition><About /></RouteTransition>} />
        <Route path="/podcast" element={<RouteTransition><Podcasts /></RouteTransition>}/>
        <Route path="/counseling" element={<RouteTransition><Counseling /></RouteTransition>} />
        <Route path="/mentoring" element={<RouteTransition><Mentorship /></RouteTransition>} />
        <Route path="/login" element={<RouteTransition><LoginPage /></RouteTransition>} />
        <Route path="/register" element={<RouteTransition><Register /></RouteTransition>}/>
        <Route path='/privacy' element={<RouteTransition><Privacy /></RouteTransition>}/>
        <Route path="/forgot-password" element={<RouteTransition><ForgotPassword /></RouteTransition>} />
        <Route path='/dashboard' element={<RouteTransition><Dashboard /></RouteTransition>} />
        <Route path='/lms/courses' element={<RouteTransition><LMSCourses /></RouteTransition>} />
        <Route path='/lms/mentorship' element={<RouteTransition><LMSMentorship /></RouteTransition>} />
        <Route path='/lms/coaching' element={<RouteTransition><LMSCoaching /></RouteTransition>} />
        <Route path='/lms/counseling' element={<RouteTransition><LMSCounseling /></RouteTransition>} />
        <Route path='/lms/settings' element={<RouteTransition><LMSSettings /></RouteTransition>} />
        <Route path='/lms/calendar' element={<RouteTransition><LMSCalendar /></RouteTransition>} />
        <Route path='/lms/resources' element={<RouteTransition><LMSResources /></RouteTransition>} />
      </Routes>

      <WaitlistModal />
    </WaitlistProvider>
  );
}

export default App;
