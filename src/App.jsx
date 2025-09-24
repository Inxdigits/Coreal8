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
import CourseManagement from './Components/LMS/Dashboard/AdminPages/CourseManagement.jsx';
import CourseView from './Components/LMS/Dashboard/AdminPages/CourseView.jsx';
import CoursePurchaseView from './Components/Courses/CourseView/CourseView.jsx';
import CheckoutPage from './Components/Courses/CheckoutPage/CheckoutPage.jsx';
import ProgramManagement from './Components/LMS/Dashboard/AdminPages/ProgramManagement.jsx';
import BlogManagement from './Components/LMS/Dashboard/AdminPages/BlogManagement.jsx';
import PodcastManagement from './Components/LMS/Dashboard/AdminPages/PodcastManagement.jsx';
import ResourcesManagement from './Components/LMS/Dashboard/AdminPages/ResourcesManagement.jsx';
import AccountSettings from './Components/LMS/Dashboard/AdminPages/AccountSettings.jsx';
import LMSMyCourses from './Components/LMS/Courses/LMSCourses.jsx';
import LMSMyMentorship from './Components/LMS/MyMentorship/LMSMyMentorship.jsx';
import LMSCoachingSessions from './Components/LMS/CoachingSessions/LMSCoachingSessions.jsx';
import LMSCounsellingServices from './Components/LMS/CounsellingServices/LMSCounsellingServices.jsx';
import LMSSettings from './Components/LMS/Settings/LMSSettings.jsx';
import LMSCalendar from './Components/LMS/Calendar/LMSCalendar.jsx';
import LMSResources from './Components/LMS/Resources/LMSResources.jsx';
import RouteTransition from './Components/RouteTransition/RouteTransition.jsx';

// NEW imports
import { WaitlistProvider } from '../src/context/WaitListcontext.jsx';
import { CourseProvider } from '../src/context/CourseContext.jsx';
import { CartProvider } from '../src/context/CartContext.jsx';
import { PaymentProvider } from '../src/context/PaymentContext.jsx';
import { UserProvider } from '../src/context/UserContext.jsx';
import WaitlistModal from './Components/LMS/Waitlist/Waitlist.jsx';
import ScrollToTop from './ScrollToTop.js';
import Terms from './Components/Terms/Terms.jsx';

function App() {
  return (
    <UserProvider>
      <WaitlistProvider>
      <ScrollToTop />
        <CourseProvider>
          <CartProvider>
            <PaymentProvider>
            <Routes>
        <Route path="/" element={<RouteTransition><HomePage /></RouteTransition>} />
        <Route path="/contact" element={<RouteTransition><Contact /></RouteTransition>} />
        <Route path="/services" element={<RouteTransition><ServicePage /></RouteTransition>} />
        <Route path="/blog" element={<RouteTransition><Blog /></RouteTransition>} />
        <Route path="/cart" element={<RouteTransition><CartPage /></RouteTransition>} />
        <Route path="/courses" element={<RouteTransition><Courses /></RouteTransition>} />
        <Route path="/about" element={<RouteTransition><About /></RouteTransition>} />
        <Route path="/podcast" element={<RouteTransition><Podcasts /></RouteTransition>}/>
        <Route path="/counselling" element={<RouteTransition><Counseling /></RouteTransition>} />
        <Route path="/mentoring" element={<RouteTransition><Mentorship /></RouteTransition>} />
        <Route path="/login" element={<RouteTransition><LoginPage /></RouteTransition>} />
        <Route path="/register" element={<RouteTransition><Register /></RouteTransition>}/>
        <Route path='/privacy-policy' element={<RouteTransition><Privacy /></RouteTransition>}/>
        <Route path='/terms-of-service' element={<Terms />} />
        <Route path="/forgot-password" element={<RouteTransition><ForgotPassword /></RouteTransition>} />
        <Route path='/dashboard' element={<RouteTransition><Dashboard /></RouteTransition>} />
        <Route path='/my-courses' element={<RouteTransition><CourseManagement /></RouteTransition>} />
        <Route path='/course/:courseId' element={<RouteTransition><CoursePurchaseView /></RouteTransition>} />
        <Route path='/checkout/:courseId' element={<RouteTransition><CheckoutPage /></RouteTransition>} />
        <Route path='/admin/program-management' element={<RouteTransition><ProgramManagement /></RouteTransition>} />
        <Route path='/admin/blog-management' element={<RouteTransition><BlogManagement /></RouteTransition>} />
        <Route path='/admin/podcast-management' element={<RouteTransition><PodcastManagement /></RouteTransition>} />
        <Route path='/admin/resources-management' element={<RouteTransition><ResourcesManagement /></RouteTransition>} />
        <Route path='/admin/account-settings' element={<RouteTransition><AccountSettings /></RouteTransition>} />
        <Route path='/lms/courses' element={<RouteTransition><LMSMyCourses /></RouteTransition>} />
        <Route path='/lms/course/:courseId' element={<RouteTransition><CourseView /></RouteTransition>} />
        <Route path='/lms/mentorship' element={<RouteTransition><LMSMyMentorship /></RouteTransition>} />
        <Route path='/lms/coaching' element={<RouteTransition><LMSCoachingSessions /></RouteTransition>} />
        <Route path='/lms/counseling' element={<RouteTransition><LMSCounsellingServices /></RouteTransition>} />
        <Route path='/lms/settings' element={<RouteTransition><LMSSettings /></RouteTransition>} />
        <Route path='/lms/calendar' element={<RouteTransition><LMSCalendar /></RouteTransition>} />
        <Route path='/lms/resources' element={<RouteTransition><LMSResources /></RouteTransition>} />
            </Routes>

            <WaitlistModal />
            </PaymentProvider>
          </CartProvider>
        </CourseProvider>
      </WaitlistProvider>
    </UserProvider>
  );
}

export default App;
