// Service for managing course resources and downloads
import { 
  courseResources, 
  mentorshipResources, 
  coachingResources, 
  counselingResources,
  getResourcesByCategory,
  getResourcesForEnrolledCourses 
} from '../data/courseResources.js';

class ResourcesService {
  constructor() {
    this.downloadHistoryKey = 'resourceDownloadHistory';
  }

  // Get all resources for a specific category
  getResourcesByCategory(category) {
    return getResourcesByCategory(category);
  }

  // Get resources for enrolled courses only
  getResourcesForEnrolledCourses(enrolledCourses, category) {
    return getResourcesForEnrolledCourses(enrolledCourses, category);
  }

  // Get resources for a specific course
  getResourcesForCourse(courseId) {
    const course = courseResources[courseId];
    return course ? course.resources : [];
  }

  // Search resources by query
  searchResources(resources, query) {
    if (!query || query.trim() === '') {
      return resources;
    }

    const searchTerm = query.toLowerCase();
    return resources.filter(resource => 
      resource.title.toLowerCase().includes(searchTerm) ||
      resource.description.toLowerCase().includes(searchTerm) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  // Filter resources by type
  filterResourcesByType(resources, type) {
    if (!type || type === 'all') {
      return resources;
    }
    return resources.filter(resource => resource.type.toLowerCase() === type.toLowerCase());
  }

  // Get paginated resources
  getPaginatedResources(resources, page = 1, itemsPerPage = 12) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return {
      data: resources.slice(startIndex, endIndex),
      totalPages: Math.ceil(resources.length / itemsPerPage),
      currentPage: page,
      totalItems: resources.length,
      hasNextPage: endIndex < resources.length,
      hasPrevPage: page > 1
    };
  }

  // Download a resource
  async downloadResource(resource) {
    try {
      // Track download in history
      this.trackDownload(resource);

      // Simulate download (in a real app, this would trigger actual download)
      console.log(`Downloading resource: ${resource.title}`);
      
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = resource.downloadUrl;
      link.download = `${resource.title}.${resource.type.toLowerCase()}`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return {
        success: true,
        message: `Download started for ${resource.title}`
      };
    } catch (error) {
      console.error('Download failed:', error);
      return {
        success: false,
        message: 'Download failed. Please try again.'
      };
    }
  }

  // Track download in localStorage
  trackDownload(resource) {
    try {
      const downloadHistory = this.getDownloadHistory();
      const downloadRecord = {
        resourceId: resource.id,
        title: resource.title,
        downloadedAt: new Date().toISOString(),
        type: resource.type,
        category: resource.category || 'courses'
      };

      // Add to beginning of array (most recent first)
      downloadHistory.unshift(downloadRecord);

      // Keep only last 50 downloads
      if (downloadHistory.length > 50) {
        downloadHistory.splice(50);
      }

      localStorage.setItem(this.downloadHistoryKey, JSON.stringify(downloadHistory));
    } catch (error) {
      console.error('Failed to track download:', error);
    }
  }

  // Get download history
  getDownloadHistory() {
    try {
      const stored = localStorage.getItem(this.downloadHistoryKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading download history:', error);
      return [];
    }
  }

  // Get recently downloaded resources
  getRecentDownloads(limit = 5) {
    const downloadHistory = this.getDownloadHistory();
    return downloadHistory.slice(0, limit);
  }

  // Check if user has access to resources for a category
  hasAccessToCategory(enrolledCourses, category) {
    if (category === 'all') {
      return enrolledCourses.length > 0 || this.hasAccessToNonCourseCategories();
    }
    
    if (category === 'courses') {
      return enrolledCourses.length > 0;
    }
    
    // For other categories (mentorship, coaching, counseling), 
    // check if user is enrolled in those services
    return this.hasAccessToNonCourseCategories();
  }

  // Check if user has access to non-course categories
  hasAccessToNonCourseCategories() {
    // In a real app, this would check actual enrollment status
    // For now, we'll simulate based on localStorage or user preferences
    const userServices = localStorage.getItem('userServices') || '{}';
    const services = JSON.parse(userServices);
    
    return services.mentorship || services.coaching || services.counseling || false;
  }

  // Get empty state message for a category
  getEmptyStateMessage(category) {
    const messages = {
      all: "Once you enroll in a course, coaching program, or mentorship, you'll find helpful downloads, worksheets, and bonus content here.",
      courses: "Enroll in a course to access exclusive resources, worksheets, and bonus materials.",
      mentorship: "Join our mentorship program to access personalized resources and guidance materials.",
      coaching: "Book a coaching session to unlock specialized resources and tools for your development.",
      counseling: "Schedule a counseling session to access therapeutic resources and support materials."
    };

    return messages[category] || messages.all;
  }

  // Get call-to-action button text for a category
  getCallToActionText(category) {
    const actions = {
      all: "Explore Services",
      courses: "Browse Courses",
      mentorship: "Join Mentorship",
      coaching: "Book Coaching",
      counseling: "Book Counseling"
    };

    return actions[category] || actions.all;
  }

  // Get resource statistics
  getResourceStats(enrolledCourses) {
    const courseResources = this.getResourcesForEnrolledCourses(enrolledCourses, 'courses');
    const mentorshipRes = this.getResourcesForEnrolledCourses(enrolledCourses, 'mentorship');
    const coachingRes = this.getResourcesForEnrolledCourses(enrolledCourses, 'coaching');
    const counselingRes = this.getResourcesForEnrolledCourses(enrolledCourses, 'counseling');

    return {
      total: courseResources.length + mentorshipRes.length + coachingRes.length + counselingRes.length,
      byCategory: {
        courses: courseResources.length,
        mentorship: mentorshipRes.length,
        coaching: coachingRes.length,
        counseling: counselingRes.length
      }
    };
  }

  // Export resources as CSV
  exportResourcesAsCSV(resources) {
    const csvContent = [
      ['Title', 'Description', 'Type', 'Size', 'Pages', 'Category', 'Downloaded At'],
      ...resources.map(resource => [
        resource.title,
        resource.description,
        resource.type,
        resource.size,
        resource.pages,
        resource.category || 'courses',
        new Date().toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resources-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  // Get resource icon based on type
  getResourceIcon(type) {
    const icons = {
      'PDF': '📄',
      'Excel': '📊',
      'Word': '📝',
      'PowerPoint': '📽️',
      'Video': '🎥',
      'Audio': '🎵',
      'Image': '🖼️',
      'Zip': '📦',
      'default': '📁'
    };

    return icons[type] || icons.default;
  }

  // Format file size for display
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

const resourcesService = new ResourcesService();
export default resourcesService;
