import React, { createContext, useContext, useState, useEffect } from 'react';

const CourseContext = createContext();

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }
  return context;
};

export const CourseProvider = ({ children }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedEnrolled = localStorage.getItem('enrolledCourses');
    const savedCompleted = localStorage.getItem('completedCourses');
    
    if (savedEnrolled) {
      setEnrolledCourses(JSON.parse(savedEnrolled));
    }
    if (savedCompleted) {
      setCompletedCourses(JSON.parse(savedCompleted));
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
  }, [completedCourses]);

  const enrollCourse = (courseId, courseData, purchaseInfo = null) => {
    // Check if course is already enrolled
    const isAlreadyEnrolled = enrolledCourses.some(course => course.id === courseId);
    if (isAlreadyEnrolled) {
      return { success: false, message: 'Course already enrolled' };
    }

    const enrolledCourse = {
      ...courseData,
      enrolledAt: new Date().toISOString(),
      completedModules: [],
      progress: 0,
      // Add purchase information if available
      purchaseInfo: purchaseInfo ? {
        purchaseDate: purchaseInfo.purchaseDate || new Date().toISOString(),
        paymentReference: purchaseInfo.paymentReference,
        amount: purchaseInfo.amount,
        paymentMethod: purchaseInfo.paymentMethod,
        isPurchased: true
      } : {
        isPurchased: false
      }
    };

    setEnrolledCourses(prev => [...prev, enrolledCourse]);
    return { success: true, message: 'Course enrolled successfully' };
  };

  const markModuleComplete = (courseId, moduleId) => {
    setEnrolledCourses(prev => {
      return prev.map(course => {
        if (course.id === courseId) {
          const updatedCompletedModules = [...course.completedModules];
          if (!updatedCompletedModules.includes(moduleId)) {
            updatedCompletedModules.push(moduleId);
          }

          const progress = (updatedCompletedModules.length / course.modules.length) * 100;
          const updatedCourse = {
            ...course,
            completedModules: updatedCompletedModules,
            progress: Math.round(progress)
          };

          // Check if all modules are completed
          if (updatedCompletedModules.length === course.modules.length) {
            // Move to completed courses
            setCompletedCourses(prevCompleted => [...prevCompleted, updatedCourse]);
            return null; // Remove from enrolled courses
          }

          return updatedCourse;
        }
        return course;
      }).filter(course => course !== null);
    });
  };

  const unmarkModuleComplete = (courseId, moduleId) => {
    setEnrolledCourses(prev => {
      return prev.map(course => {
        if (course.id === courseId) {
          const updatedCompletedModules = course.completedModules.filter(id => id !== moduleId);
          const progress = (updatedCompletedModules.length / course.modules.length) * 100;
          
          return {
            ...course,
            completedModules: updatedCompletedModules,
            progress: Math.round(progress)
          };
        }
        return course;
      });
    });
  };

  const getCourseProgress = (courseId) => {
    const course = enrolledCourses.find(course => course.id === courseId);
    return course ? course.progress : 0;
  };

  const isModuleCompleted = (courseId, moduleId) => {
    const course = enrolledCourses.find(course => course.id === courseId);
    return course ? course.completedModules.includes(moduleId) : false;
  };

  const isCourseEnrolled = (courseId) => {
    return enrolledCourses.some(course => course.id === courseId);
  };

  const unenrollCourse = (courseId) => {
    setEnrolledCourses(prev => prev.filter(course => course.id !== courseId));
    return { success: true, message: 'Course unenrolled successfully' };
  };

  const enrollMultipleCourses = (courses, purchaseInfo = null) => {
    const newEnrollments = [];
    const errors = [];

    courses.forEach(course => {
      const isAlreadyEnrolled = enrolledCourses.some(enrolledCourse => enrolledCourse.id === course.id);
      if (!isAlreadyEnrolled) {
        const enrolledCourse = {
          ...course,
          enrolledAt: new Date().toISOString(),
          completedModules: [],
          progress: 0,
          // Add purchase information if available
          purchaseInfo: purchaseInfo ? {
            purchaseDate: purchaseInfo.purchaseDate || new Date().toISOString(),
            paymentReference: purchaseInfo.paymentReference,
            amount: course.price, // Use individual course price
            paymentMethod: purchaseInfo.paymentMethod,
            isPurchased: true
          } : {
            isPurchased: false
          }
        };
        newEnrollments.push(enrolledCourse);
      } else {
        errors.push(`${course.title} is already enrolled`);
      }
    });

    if (newEnrollments.length > 0) {
      setEnrolledCourses(prev => [...prev, ...newEnrollments]);
    }

    return {
      success: newEnrollments.length > 0,
      message: newEnrollments.length > 0 
        ? `${newEnrollments.length} course(s) enrolled successfully` 
        : 'No new courses enrolled',
      errors: errors
    };
  };

  const value = {
    enrolledCourses,
    completedCourses,
    enrollCourse,
    enrollMultipleCourses,
    unenrollCourse,
    markModuleComplete,
    unmarkModuleComplete,
    getCourseProgress,
    isModuleCompleted,
    isCourseEnrolled
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};
