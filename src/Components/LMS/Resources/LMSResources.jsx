import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../Firebase/Firebase.js';
import WelcomeHeader from '../Components/WelcomeHeader';
import './LMSResources.css';

const LMSResources = () => {
  const [activeSection, setActiveSection] = useState('resources');
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const itemsPerPage = 12;

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

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'counseling', label: 'Counseling' },
    { id: 'mentorship', label: 'Mentorship' },
    { id: 'coaching', label: 'Coaching' },
    { id: 'courses', label: 'Courses' }
  ];

  const resources = [
    {
      id: 1,
      title: "Build personal brand & improve time discipline",
      size: "2.5MB",
      pages: "120 Pages",
      type: "PDF",
      category: "counseling",
      icon: "▶️"
    },
    {
      id: 2,
      title: "Build personal brand & improve time discipline",
      size: "2.5MB",
      pages: "120 Pages",
      type: "PDF",
      category: "mentorship",
      icon: "▶️"
    },
    {
      id: 3,
      title: "Build personal brand & improve time discipline",
      size: "2.5MB",
      pages: "120 Pages",
      type: "PDF",
      category: "coaching",
      icon: "▶️"
    },
    {
      id: 4,
      title: "Build personal brand & improve time discipline",
      size: "2.5MB",
      pages: "120 Pages",
      type: "PDF",
      category: "courses",
      icon: "▶️"
    },
    {
      id: 5,
      title: "Build personal brand & improve time discipline",
      size: "2.5MB",
      pages: "120 Pages",
      type: "PDF",
      category: "counseling",
      icon: "▶️"
    },
    {
      id: 6,
      title: "Build personal brand & improve time discipline",
      size: "2.5MB",
      pages: "120 Pages",
      type: "PDF",
      category: "mentorship",
      icon: "▶️"
    },
    {
      id: 7,
      title: "Build personal brand & improve time discipline",
      size: "2.5MB",
      pages: "120 Pages",
      type: "PDF",
      category: "coaching",
      icon: "▶️"
    },
    {
      id: 8,
      title: "Build personal brand & improve time discipline",
      size: "2.5MB",
      pages: "120 Pages",
      type: "PDF",
      category: "courses",
      icon: "▶️"
    },
    {
      id: 9,
      title: "Build personal brand & improve time discipline",
      size: "2.5MB",
      pages: "120 Pages",
      type: "PDF",
      category: "counseling",
      icon: "▶️"
    },
    {
      id: 10,
      title: "Build personal brand & improve time discipline",
      size: "2.5MB",
      pages: "120 Pages",
      type: "PDF",
      category: "mentorship",
      icon: "▶️"
    },
    {
      id: 11,
      title: "Build personal brand & improve time discipline",
      size: "2.5MB",
      pages: "120 Pages",
      type: "PDF",
      category: "coaching",
      icon: "▶️"
    },
    {
      id: 12,
      title: "Build personal brand & improve time discipline",
      size: "2.5MB",
      pages: "120 Pages",
      type: "PDF",
      category: "courses",
      icon: "▶️"
    }
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDownload = (resourceId) => {
    console.log(`Downloading resource ${resourceId}`);
    // In a real app, this would trigger the download
  };

  // Filter resources based on search query and category
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResources = filteredResources.slice(startIndex, endIndex);

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="lms-resources-container">
      {/* Sidebar */}
      <div className="lms-sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">C<span className="logo-8">8</span></div>
            <span className="logo-text">Coreal8</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {sidebarItems.map((item) => (
            item.id === 'logout' ? (
              <button
                key={item.id}
                className={`nav-item logout-btn ${activeSection === item.id ? 'active' : ''}`}
                onClick={handleLogout}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            ) : (
              <Link
                key={item.id}
                to={item.path}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            )
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="profile-image">
              <img src={user.profileImage} alt="Profile" />
            </div>
            <div className="profile-info">
              <div className="profile-name">{user.name}</div>
              <div className="profile-email">{user.email}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lms-main">
        {/* Header */}
        <WelcomeHeader 
          user={user}
          pageSubtitle="This section only shows resources from services you've enrolled in."
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
        />

        {/* Category Filters */}
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Resources Grid or Empty State */}
        {currentResources.length > 0 ? (
          <div className="resources-grid">
            {currentResources.map((resource) => (
              <div key={resource.id} className="resource-card">
                <div className="resource-icon">
                  {resource.icon}
                </div>
                <div className="resource-content">
                  <h3 className="resource-title">{resource.title}</h3>
                  <div className="resource-details">
                    <span className="resource-size">{resource.size}</span>
                    <span className="resource-pages">{resource.pages}</span>
                  </div>
                </div>
                <button 
                  className="download-btn"
                  onClick={() => handleDownload(resource.id)}
                >
                  ⬇️
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📄!</div>
            <h2 className="empty-state-title">No resources available</h2>
            <p className="empty-state-description">
              Once you enroll in a course, coaching program, or mentorship, you'll find helpful downloads, worksheets, and bonus content here.
            </p>
            <button className="empty-state-button">
              Book {activeCategory === 'all' ? 'Services' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button 
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LMSResources;