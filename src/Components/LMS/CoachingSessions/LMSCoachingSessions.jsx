import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../Firebase/Firebase.js';
import DashboardSidebar from '../Dashboard/Components/DashboardSidebar';
import LMSHeader from '../Components/LMSHeader';
import '../Dashboard/Dashboard.css';
import './LMSCoachingSessions.css';

const LMSCoachingSessions = () => {
  const [activeSection, setActiveSection] = useState('coaching');
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


  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <DashboardSidebar />
      <div className="dashboard-main">
        <LMSHeader 
          user={user}
          pageSubtitle="Professional coaching to accelerate your growth"
          searchQuery=""
          onSearchChange={() => {}}
        />
        <div className="dashboard-content">
          <div className="coming-soon">
            <div className="coming-soon-icon">🚀</div>
            <h2>Coming Soon</h2>
            <p>Coaching sessions feature is under development. Stay tuned!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LMSCoachingSessions;
