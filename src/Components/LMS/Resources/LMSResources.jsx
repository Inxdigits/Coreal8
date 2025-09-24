import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../Firebase/Firebase.js';
import { signOut } from 'firebase/auth';
import { useCourseContext } from '../../../context/CourseContext.jsx';
import DashboardSidebar from '../Dashboard/Components/DashboardSidebar';
import LMSHeader from '../Components/LMSHeader';
import resourcesService from '../../../services/ResourcesService.js';
import '../Dashboard/Dashboard.css';
import './LMSResources.css';

const LMSResources = () => {
  const [activeSection, setActiveSection] = useState('resources');
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { enrolledCourses } = useCourseContext();

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

  // Load resources based on enrolled courses and category
  useEffect(() => {
    const loadResources = () => {
      setIsLoading(true);
      try {
        const availableResources = resourcesService.getResourcesForEnrolledCourses(
          enrolledCourses, 
          activeCategory
        );
        setResources(availableResources);
        setFilteredResources(availableResources);
      } catch (error) {
        console.error('Error loading resources:', error);
        setResources([]);
        setFilteredResources([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadResources();
  }, [enrolledCourses, activeCategory]);

  // Filter resources based on search query
  useEffect(() => {
    const filtered = resourcesService.searchResources(resources, searchQuery);
    setFilteredResources(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [resources, searchQuery]);

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDownload = async (resource) => {
    try {
      const result = await resourcesService.downloadResource(resource);
      if (result.success) {
        // Show success message or notification
        console.log(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Download failed. Please try again.');
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  // Get paginated resources
  const paginationData = resourcesService.getPaginatedResources(
    filteredResources, 
    currentPage, 
    itemsPerPage
  );

  // Check if user has access to current category
  const hasAccess = resourcesService.hasAccessToCategory(enrolledCourses, activeCategory);
  const isEmpty = !isLoading && filteredResources.length === 0;
  const showEmptyState = isEmpty || !hasAccess;

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container resources-page">
      <DashboardSidebar />
      <div className="dashboard-main">
        <LMSHeader 
          user={user}
          pageSubtitle="This section only shows resources from services you've enrolled in."
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
        />
        <div className="dashboard-content">

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
        {isLoading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading resources...</p>
          </div>
        ) : showEmptyState ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="12" width="48" height="40" rx="4" stroke="#8B0000" strokeWidth="2" fill="none"/>
                <path d="M20 24h24M20 32h16M20 40h20" stroke="#8B0000" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="48" cy="20" r="4" fill="#8B0000"/>
              </svg>
            </div>
            <h2 className="empty-state-title">No resources available</h2>
            <p className="empty-state-description">
              {resourcesService.getEmptyStateMessage(activeCategory)}
            </p>
            <button 
              className="empty-state-button"
              onClick={() => {
                // Navigate to appropriate service page
                if (activeCategory === 'courses') {
                  navigate('/courses');
                } else if (activeCategory === 'mentorship') {
                  navigate('/mentorship');
                } else if (activeCategory === 'coaching') {
                  navigate('/coaching');
                } else if (activeCategory === 'counseling') {
                  navigate('/counseling');
                } else {
                  navigate('/courses');
                }
              }}
            >
              {resourcesService.getCallToActionText(activeCategory)}
            </button>
          </div>
        ) : (
          <div className="resources-grid">
            {paginationData.data.map((resource) => (
              <div key={resource.id} className="resource-card">
                <div className="resource-icon">
                  {resourcesService.getResourceIcon(resource.type)}
                </div>
                <div className="resource-content">
                  <h3 className="resource-title">{resource.title}</h3>
                  <p className="resource-description">{resource.description}</p>
                  <div className="resource-details">
                    <span className="resource-size">{resource.size}</span>
                    <span className="resource-pages">{resource.pages}</span>
                    <span className="resource-type">{resource.type}</span>
                  </div>
                </div>
                <button 
                  className="download-btn"
                  onClick={() => handleDownload(resource)}
                  title={`Download ${resource.title}`}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2V14M10 14L6 10M10 14L14 10M2 16H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {paginationData.totalPages > 1 && !showEmptyState && (
          <div className="pagination">
            <button 
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!paginationData.hasPrevPage}
            >
              ←
            </button>
            {Array.from({ length: paginationData.totalPages }, (_, i) => i + 1).map((page) => (
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
              disabled={!paginationData.hasNextPage}
            >
              →
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default LMSResources;