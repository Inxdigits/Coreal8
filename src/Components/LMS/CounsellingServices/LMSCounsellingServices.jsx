import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../Firebase/Firebase.js';
import DashboardSidebar from '../Dashboard/Components/DashboardSidebar';
import LMSHeader from '../Components/LMSHeader';
import '../Dashboard/Dashboard.css';
import './LMSCounsellingServices.css';

const LMSCounsellingServices = () => {
  const [activeSection, setActiveSection] = useState('counseling');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          name: user.displayName || 'User',
          email: user.email || 'user@example.com',
          profileImage: user.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
        });
      } else {
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '⊞', path: '/dashboard' },
    { id: 'courses', label: 'My Courses', icon: '🎓', path: '/lms/courses' },
    { id: 'mentorship', label: 'My Mentorship', icon: '👥', path: '/lms/mentorship' },
    { id: 'coaching', label: 'Coaching Sessions', icon: '👥➡️', path: '/lms/coaching' },
    { id: 'counseling', label: 'Counseling Services', icon: '👥', path: '/lms/counseling' },
    { id: 'calendar', label: 'Calendar', icon: '📅', path: '/lms/calendar' },
    { id: 'resources', label: 'Resources', icon: '⊞+', path: '/lms/resources' },
    { id: 'settings', label: 'Account Settings', icon: '👤', path: '/lms/settings' },
    { id: 'logout', label: 'Logout', icon: '↪️', path: null }
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <DashboardSidebar />
      <div className="dashboard-main">
        <LMSHeader 
          user={user}
          pageSubtitle="Professional counseling and mental health support"
          searchQuery=""
          onSearchChange={() => {}}
        />
        <div className="dashboard-content">
          <div className="coming-soon">
            <div className="coming-soon-icon">💬</div>
            <h2>Coming Soon</h2>
            <p>Counseling services feature is under development. Stay tuned!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LMSCounsellingServices;
