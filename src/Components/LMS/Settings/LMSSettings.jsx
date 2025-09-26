import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../../Firebase/Firebase.js';
import { useUser } from '../../../context/UserContext.jsx';
import ProfilePhotoService from '../../../services/ProfilePhotoService.js';
import DashboardSidebar from '../Dashboard/Components/DashboardSidebar';
import LMSHeader from '../Components/LMSHeader';
import '../Dashboard/Dashboard.css';
import './LMSSettings.css';

// Import mini-components
import ProfileSection from './Components/ProfileSection';
import SecuritySection from './Components/SecuritySection';
import PaymentSection from './Components/PaymentSection';
import NotificationsSection from './Components/NotificationsSection';
import PrivacySection from './Components/PrivacySection';

const LMSSettings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const { user, logout, loading, refreshUserData } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  
  // Two-factor authentication modal state
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);

  // Notifications state
  const [emailNotifications, setEmailNotifications] = useState({
    sessionReminders: true,
    courseUpdates: false,
    promotionsOffers: false,
    communityAnnouncements: false
  });

  const [inAppNotifications, setInAppNotifications] = useState({
    upcomingSessionAlerts: true,
    newLessonDrops: false,
    assignmentDeadlines: false,
    liveEventReminders: false
  });

  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('GMT+1');

  // Privacy state
  const [dataVisibility, setDataVisibility] = useState({
    sessionHistory: false,
    anonymizedData: false
  });

  // Payment state
  const [savedCards, setSavedCards] = useState([]);
  const [billingHistory, setBillingHistory] = useState([
    {
      id: 1,
      date: 'Jul 10, 2025',
      item: 'Emotional Resilience Course',
      amount: '₩15,000',
      status: 'Paid',
      invoiceId: 'INV-001'
    },
    {
      id: 2,
      date: 'Jul 10, 2025',
      item: 'Emotional Resilience Course',
      amount: '₩15,000',
      status: 'Paid',
      invoiceId: 'INV-002'
    },
    {
      id: 3,
      date: 'Jul 10, 2025',
      item: 'Emotional Resilience Course',
      amount: '₩15,000',
      status: 'Paid',
      invoiceId: 'INV-003'
    },
    {
      id: 4,
      date: 'Jul 10, 2025',
      item: 'Emotional Resilience Course',
      amount: '₩15,000',
      status: 'Paid',
      invoiceId: 'INV-004'
    },
    {
      id: 5,
      date: 'Jul 10, 2025',
      item: 'Emotional Resilience Course',
      amount: '₩15,000',
      status: 'Paid',
      invoiceId: 'INV-005'
    }
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [photoError, setPhotoError] = useState('');
  const navigate = useNavigate();

  // Initialize form data when user data is available
  useEffect(() => {
      if (user) {
      const displayName = user.name || '';
        const nameParts = displayName.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        
        setFormData({
          firstName: firstName,
          lastName: lastName,
          email: user.email || '',
          phone: user.phoneNumber || ''
        });
    }
  }, [user]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);


  // Clear password data when component unmounts for security
  useEffect(() => {
    return () => {
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    };
  }, []);

  // Event Handlers
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddPhoto = (fileInputRef) => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = async () => {
    if (!user?.profileImage) {
      setPhotoError('No photo to remove');
      return;
    }

    setIsUploadingPhoto(true);
    setPhotoError('');
    
    try {
      await ProfilePhotoService.removeProfilePhoto();
      console.log('Profile photo removed successfully');
      // Refresh user data to get the updated photo
      await refreshUserData();
    } catch (error) {
      console.error('Error removing profile photo:', error);
      setPhotoError(error.message || 'Failed to remove photo. Please try again.');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhotoError('');
    
    // Validate file
    const validation = ProfilePhotoService.validateFile(file);
    if (!validation.isValid) {
      setPhotoError(validation.errors.join(', '));
      return;
    }

    // Upload photo
    setIsUploadingPhoto(true);
    try {
      const newPhotoURL = await ProfilePhotoService.updateProfilePhoto(file, user.uid);
      console.log('Profile photo updated successfully:', newPhotoURL);
      // Refresh user data to get the updated photo
      await refreshUserData();
    } catch (error) {
      console.error('Error updating profile photo:', error);
      setPhotoError(error.message || 'Failed to upload photo. Please try again.');
    } finally {
      setIsUploadingPhoto(false);
      // Clear file input
      if (e.target) {
        e.target.value = '';
      }
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
      const displayName = user.name || '';
      const nameParts = displayName.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      setFormData({
        firstName: firstName,
        lastName: lastName,
        email: user.email || '',
        phone: user.phoneNumber || ''
      });
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const newDisplayName = `${formData.firstName} ${formData.lastName}`.trim();
      
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName
      });
      
      if (formData.email !== user.email) {
        await updateEmail(auth.currentUser, formData.email);
      }
      
      setUser(prev => ({
        ...prev,
        name: newDisplayName,
        email: formData.email
      }));
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangePassword = async () => {
    if (!user) return;
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      alert('New password must be at least 6 characters');
      return;
    }
    
    setIsChangingPassword(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, passwordData.oldPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      
      await updatePassword(auth.currentUser, passwordData.newPassword);
      
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setPasswordVisibility({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false
      });
      
      alert('Password updated successfully!');
    } catch (error) {
      console.error('Error changing password:', error);
      if (error.code === 'auth/wrong-password') {
        alert('Current password is incorrect');
      } else if (error.code === 'auth/weak-password') {
        alert('New password is too weak');
      } else {
        alert('Error changing password. Please try again.');
      }
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleCancelPassword = () => {
    setPasswordData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordVisibility({
      oldPassword: false,
      newPassword: false,
      confirmPassword: false
    });
  };

  const handleTwoFactorToggle = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        alert('No user is currently signed in');
        return;
      }

      if (!twoFactorEnabled) {
        // Enable 2FA by sending email verification
        await sendEmailVerification(currentUser);
        setShowTwoFactorModal(true);
      } else {
        // Disable 2FA
        setTwoFactorEnabled(false);
        alert('Two-Factor Authentication disabled');
      }
    } catch (error) {
      console.error('Error toggling 2FA:', error);
      let errorMessage = 'Failed to update Two-Factor Authentication settings.';
      
      if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many requests. Please try again later.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection and try again.';
      }
      
      alert(errorMessage);
    }
  };

  const handleVerifyTwoFactorCode = async () => {
    if (!twoFactorCode.trim()) {
      alert('Please enter the verification code');
      return;
    }

    setIsVerifyingCode(true);
    try {
      // In a real implementation, you would verify the code here
      // For now, we'll simulate verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTwoFactorEnabled(true);
      setShowTwoFactorModal(false);
      setTwoFactorCode('');
      alert('Two-Factor Authentication enabled successfully!');
    } catch (error) {
      console.error('Error verifying code:', error);
      alert('Invalid verification code. Please try again.');
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const handleCloseTwoFactorModal = () => {
    setShowTwoFactorModal(false);
    setTwoFactorCode('');
  };

  // Notification handlers
  const handleEmailNotificationChange = (key, value) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleInAppNotificationChange = (key, value) => {
    setInAppNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  const handleTimezoneChange = (value) => {
    setTimezone(value);
  };

  const handleSaveEmailChanges = () => {
    console.log('Saving email notification changes:', emailNotifications);
    alert('Email notification preferences saved successfully!');
  };

  const handleSaveInAppChanges = () => {
    console.log('Saving in-app notification changes:', inAppNotifications);
    alert('In-app notification preferences saved successfully!');
  };

  const handleSaveLanguageChanges = () => {
    console.log('Saving language change:', language);
    alert('Language preference saved successfully!');
  };

  const handleSaveTimezoneChanges = () => {
    console.log('Saving timezone change:', timezone);
    alert('Timezone preference saved successfully!');
  };

  // Privacy handlers
  const handleDataVisibilityChange = (key, value) => {
    setDataVisibility(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSavePreferences = () => {
    console.log('Saving privacy preferences:', dataVisibility);
    alert('Privacy preferences saved successfully!');
  };

  const handleRequestAccountDeletion = () => {
    console.log('Requesting account deletion for user:', user?.email);
    alert('Account deletion request submitted. You will receive an email confirmation shortly.');
  };

  // Payment handlers
  const handleAddPaymentMethod = (cardData) => {
    setSavedCards(prev => [...prev, cardData]);
    alert('Payment method added successfully!');
  };


  // Calculate pagination
  const totalPages = Math.ceil(billingHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBillingHistory = billingHistory.slice(startIndex, startIndex + itemsPerPage);



  const handleAddNewCard = () => {
    alert('Add New Card functionality will be implemented here');
  };

  const handleRemoveCard = (cardId) => {
    setSavedCards(prev => prev.filter(card => card.id !== cardId));
  };

  const handleDownloadInvoice = (invoiceId) => {
    alert(`Downloading invoice for transaction ${invoiceId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const settingsSections = [
    { id: 'profile', label: 'Profile Info', icon: '👤⚙️' },
    { id: 'security', label: 'Security & Login', icon: '🛡️✓' },
    { id: 'payment', label: 'Payment & Billing', icon: '💳' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'privacy', label: 'Privacy & Data', icon: 'ℹ️' }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <ProfileSection
            user={user}
            isEditing={isEditing}
            formData={formData}
            isLoading={isLoading || isUploadingPhoto}
            onInputChange={handleInputChange}
            onEditProfile={handleEditProfile}
            onCancel={handleCancel}
            onSave={handleSave}
            onAddPhoto={handleAddPhoto}
            onRemovePhoto={handleRemovePhoto}
            onFileChange={handleFileChange}
            photoError={photoError}
            isUploadingPhoto={isUploadingPhoto}
          />
        );
      case 'security':
        return (
          <SecuritySection
            passwordData={passwordData}
            twoFactorEnabled={twoFactorEnabled}
            isChangingPassword={isChangingPassword}
            onPasswordChange={handlePasswordChange}
            onChangePassword={handleChangePassword}
            onCancelPassword={handleCancelPassword}
            onTwoFactorToggle={handleTwoFactorToggle}
          />
        );
      case 'payment':
        return (
          <PaymentSection
            savedCards={savedCards}
            billingHistory={billingHistory}
            currentPage={currentPage}
            totalPages={totalPages}
            currentBillingHistory={currentBillingHistory}
            onAddPaymentMethod={handleAddPaymentMethod}
            onRemoveCard={handleRemoveCard}
            onSetDefaultCard={handleSetDefaultCard}
            onDownloadInvoice={handleDownloadInvoice}
            onPageChange={handlePageChange}
          />
        );
      case 'notifications':
        return (
          <NotificationsSection
            emailNotifications={emailNotifications}
            inAppNotifications={inAppNotifications}
            language={language}
            timezone={timezone}
            onEmailNotificationChange={handleEmailNotificationChange}
            onInAppNotificationChange={handleInAppNotificationChange}
            onLanguageChange={handleLanguageChange}
            onTimezoneChange={handleTimezoneChange}
            onSaveEmailChanges={handleSaveEmailChanges}
            onSaveInAppChanges={handleSaveInAppChanges}
            onSaveLanguageChanges={handleSaveLanguageChanges}
            onSaveTimezoneChanges={handleSaveTimezoneChanges}
          />
        );
      case 'privacy':
        return (
          <PrivacySection
            dataVisibility={dataVisibility}
            onDataVisibilityChange={handleDataVisibilityChange}
            onSavePreferences={handleSavePreferences}
            onRequestAccountDeletion={handleRequestAccountDeletion}
          />
        );
      default:
        return (
          <ProfileSection
            user={user}
            isEditing={isEditing}
            formData={formData}
            isLoading={isLoading || isUploadingPhoto}
            onInputChange={handleInputChange}
            onEditProfile={handleEditProfile}
            onCancel={handleCancel}
            onSave={handleSave}
            onAddPhoto={handleAddPhoto}
            onRemovePhoto={handleRemovePhoto}
            onFileChange={handleFileChange}
            photoError={photoError}
            isUploadingPhoto={isUploadingPhoto}
          />
        );
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
          pageSubtitle="Manage your account settings and preferences"
          searchQuery={searchQuery} 
          onSearchChange={handleSearch} 
        />
        <div className="dashboard-content">

        <div className="settings-content">
          <div className="settings-sidebar">
            <nav className="settings-nav">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  className={`settings-nav-item ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <span className="settings-nav-icon">{section.icon}</span>
                  <span className="settings-nav-label">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="settings-main">
            {renderActiveSection()}
          </div>
        </div>
        </div>
      </div>

      {/* Two-Factor Authentication Modal */}
      {showTwoFactorModal && (
        <div className="modal-overlay">
          <div className="lms-settings-modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Enable Two-Factor Authentication</h3>
            </div>
            <div className="modal-body">
              <div className="two-factor-setup">
                <div className="setup-step">
                  <div className="step-icon">📧</div>
                  <div className="step-content">
                    <h4>Step 1: Check Your Email</h4>
                    <p>We've sent a verification code to <strong>{user?.email}</strong></p>
                    <p>Please check your email and enter the 6-digit code below.</p>
                  </div>
                </div>
                
                <div className="verification-code-section">
                  <label htmlFor="twoFactorCode" className="code-label">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    id="twoFactorCode"
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="code-input"
                    maxLength="6"
                    disabled={isVerifyingCode}
                  />
                </div>
                
                <div className="resend-section">
                  <p>Didn't receive the code?</p>
                  <button 
                    className="resend-btn"
                    onClick={() => sendEmailVerification(auth.currentUser)}
                    disabled={isVerifyingCode}
                  >
                    Resend Code
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="cancel-btn" 
                onClick={handleCloseTwoFactorModal}
                disabled={isVerifyingCode}
              >
                Cancel
              </button>
              <button 
                className="verify-btn" 
                onClick={handleVerifyTwoFactorCode}
                disabled={isVerifyingCode || twoFactorCode.length !== 6}
              >
                {isVerifyingCode ? 'Verifying...' : 'Verify & Enable'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LMSSettings;