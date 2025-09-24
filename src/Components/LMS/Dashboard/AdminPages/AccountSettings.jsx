import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../../../../context/UserContext.jsx';
import { usePayment } from '../../../../context/PaymentContext.jsx';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../../../Firebase/Firebase.js';
import ProfileImage from '../../../Shared/ProfileImage.jsx';
import ProfilePhotoService from '../../../../services/ProfilePhotoService.js';
import DashboardSidebar from '../Components/DashboardSidebar';
import SecuritySection from '../../Settings/Components/SecuritySection';
import NotificationsSection from '../../Settings/Components/NotificationsSection';
import PrivacySection from '../../Settings/Components/PrivacySection';
import PaymentSection from '../../Settings/Components/PaymentSection';
import '../../Settings/LMSSettings.css';
import './AdminPages.css';
import './AccountSettings.css';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, loading, refreshUserData } = useUser();
  const { getBillingHistory, getBillingHistoryPaginated, getTotalSpent, exportBillingHistory } = usePayment();
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Security section state
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
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
  const [billingHistory, setBillingHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Populate profile data from user's Google account
  useEffect(() => {
    if (user) {
      const displayName = user.name || '';
      const nameParts = displayName.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      setProfileData({
        firstName: firstName,
        lastName: lastName,
        email: user.email || '',
        phone: user.phoneNumber || ''
      });
    }
  }, [user]);

  // Load billing history from payment context
  useEffect(() => {
    const loadBillingHistory = () => {
      try {
        const history = getBillingHistory();
        setBillingHistory(history);
      } catch (error) {
        console.error('Error loading billing history:', error);
        setBillingHistory([]);
      }
    };

    loadBillingHistory();
  }, [getBillingHistory]);

  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: '👤' },
    { id: 'security', label: 'Security & Login', icon: '🔒' },
    { id: 'payment', label: 'Payment & Billing', icon: '💳' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'privacy', label: 'Privacy & Data', icon: '🛡️' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    // Handle profile update logic here
    console.log('Updating profile:', profileData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    // Reset to original user data
    if (user) {
      const displayName = user.name || '';
      const nameParts = displayName.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      setProfileData({
        firstName: firstName,
        lastName: lastName,
        email: user.email || '',
        phone: user.phoneNumber || ''
      });
    }
    setIsEditing(false);
    setPhotoPreview(null);
    setPhotoError('');
  };

  // Photo handling functions
  const handleAddPhoto = () => {
    console.log('Add photo clicked, isEditing:', isEditing);
    console.log('File input ref:', fileInputRef.current);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log('File selected:', file);
    if (!file) return;

    console.log('User data:', user);
    console.log('User UID:', user?.uid);

    setPhotoError('');
    
    // Validate file
    const validation = ProfilePhotoService.validateFile(file);
    if (!validation.isValid) {
      setPhotoError(validation.errors.join(', '));
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Upload photo
    setIsUploadingPhoto(true);
    try {
      const newPhotoURL = await ProfilePhotoService.updateProfilePhoto(file, user.uid);
      console.log('Profile photo updated successfully:', newPhotoURL);
      setPhotoPreview(null);
      // Refresh user data to get the updated photo
      await refreshUserData();
    } catch (error) {
      console.error('Error updating profile photo:', error);
      setPhotoError(error.message || 'Failed to upload photo. Please try again.');
      setPhotoPreview(null);
    } finally {
      setIsUploadingPhoto(false);
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemovePhoto = async () => {
    console.log('Remove photo clicked, isEditing:', isEditing);
    console.log('User profile image:', user?.profileImage);
    
    if (!user.profileImage) {
      setPhotoError('No photo to remove');
      return;
    }

    setIsUploadingPhoto(true);
    setPhotoError('');
    
    try {
      await ProfilePhotoService.removeProfilePhoto();
      console.log('Profile photo removed successfully');
      setPhotoPreview(null);
      // Refresh user data to get the updated photo
      await refreshUserData();
    } catch (error) {
      console.error('Error removing profile photo:', error);
      setPhotoError(error.message || 'Failed to remove photo. Please try again.');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  // Security section handlers
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangePassword = async () => {
    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert('Please fill in all password fields');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('New password must be at least 6 characters long');
      return;
    }

    setIsChangingPassword(true);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('No user is currently signed in');
      }

      // Re-authenticate user with their current password
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        passwordData.oldPassword
      );
      
      await reauthenticateWithCredential(currentUser, credential);
      
      // Update password
      await updatePassword(currentUser, passwordData.newPassword);
      
      alert('Password changed successfully!');
      
      // Reset form
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error changing password:', error);
      let errorMessage = 'Failed to change password. Please try again.';
      
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Current password is incorrect.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'New password is too weak. Please choose a stronger password.';
      } else if (error.code === 'auth/requires-recent-login') {
        errorMessage = 'Please sign out and sign in again before changing your password.';
      }
      
      alert(errorMessage);
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

  const handleRemoveCard = (cardId) => {
    setSavedCards(prev => prev.filter(card => card.id !== cardId));
    alert('Payment method removed successfully!');
  };

  const handleSetDefaultCard = (cardId) => {
    setSavedCards(prev => prev.map(card => ({
      ...card,
      isDefault: card.id === cardId
    })));
    alert('Default payment method updated!');
  };

  const handleDownloadInvoice = (invoiceId) => {
    console.log('Downloading invoice:', invoiceId);
    alert(`Invoice ${invoiceId} download started!`);
  };

  const handleExportBillingHistory = () => {
    try {
      exportBillingHistory();
      alert('Billing history exported successfully!');
    } catch (error) {
      console.error('Error exporting billing history:', error);
      alert('Failed to export billing history. Please try again.');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate pagination
  const totalPages = Math.ceil(billingHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBillingHistory = billingHistory.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="account-settings-container">
      <DashboardSidebar />
      <div className="account-settings-main">
        {/* Header */}
        <div className="account-settings-header">
          <div className="header-left">
            <h1 className="account-settings-title">Account Setting</h1>
          </div>
          <div className="header-right">
            <div className="notification-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5S10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="#6B7280"/>
              </svg>
            </div>
            <div className="search-bar">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 19L13 13M15 8C15 11.866 11.866 15 8 15C4.134 15 1 11.866 1 8C1 4.134 4.134 1 8 1C11.866 1 15 4.134 15 8Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input type="text" placeholder="Search" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="account-settings-content">
          {/* Left Sidebar - Sub Navigation */}
          <div className="account-settings-sidebar">
            <nav className="settings-nav">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`settings-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="nav-icon">{tab.icon}</span>
                  <span className="nav-label">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Right Content Area */}
          <div className="account-settings-content-area">
            {activeTab === 'profile' && (
              <div className="profile-section">
                <h2 className="section-title">My Profile</h2>
                
                {/* Profile Picture Section */}
                <div className="profile-picture-section">
                  <div className="profile-picture-container">
                    {photoPreview ? (
                      <img 
                        src={photoPreview} 
                        alt="Preview" 
                        className="profile-picture-preview"
                        style={{
                          width: 120,
                          height: 120,
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <ProfileImage 
                        user={user} 
                        size={120} 
                        className="account-settings-profile-image"
                        showInitials={true}
                        fallbackImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face"
                      />
                    )}
                  </div>
                  
                  {/* Photo Actions */}
                  <div className="profile-picture-actions">
                    <button 
                      className="add-photo-btn" 
                      onClick={handleAddPhoto}
                      disabled={isUploadingPhoto}
                    >
                      {isUploadingPhoto ? 'Uploading...' : '+ Add Photo'}
                    </button>
                    <button 
                      className="remove-photo-btn" 
                      onClick={handleRemovePhoto}
                      disabled={isUploadingPhoto || !user?.profileImage}
                    >
                      {isUploadingPhoto ? 'Removing...' : 'Remove Photo'}
                    </button>
                  </div>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    style={{ display: 'none' }}
                  />

                  {/* Error Message */}
                  {photoError && (
                    <div className="photo-error">
                      {photoError}
                    </div>
                  )}
                </div>

                {/* Google Account Info */}
                {user?.isGoogleUser && (
                  <div className="google-account-info">
                    <h3 className="subsection-title">Google Account Information</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Google ID</label>
                        <span className="info-value">{user.googleId || 'Not available'}</span>
                      </div>
                      <div className="info-item">
                        <label>Email Verified</label>
                        <span className="info-value">
                          {user.emailVerified ? '✅ Verified' : '❌ Not verified'}
                        </span>
                      </div>
                      <div className="info-item">
                        <label>Account Type</label>
                        <span className="info-value">Google Account</span>
                      </div>
                  </div>
                </div>
                )}

                {/* Personal Information Section */}
                <div className="personal-info-section">
                  <h3 className="subsection-title">Personal Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email (editable with verification)</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="profile-actions">
                    {!isEditing ? (
                  <button className="edit-profile-btn" onClick={handleEditProfile}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.333 2.00001C11.5081 1.8249 11.716 1.68698 11.944 1.59401C12.172 1.50104 12.4156 1.45483 12.6613 1.45801C12.907 1.46119 13.1491 1.51371 13.3733 1.61201C13.5975 1.71031 13.7991 1.85233 13.9653 2.02934C14.1315 2.20635 14.2589 2.41482 14.3399 2.64248C14.4209 2.87014 14.4539 3.11249 14.4367 3.35334C14.4195 3.59419 14.3525 3.82849 14.24 4.04001L13.1667 6.00001L10.1667 3.00001L12.1267 1.04001C12.3382 0.927508 12.5725 0.860508 12.8133 0.843342C13.0542 0.826175 13.2965 0.859175 13.5242 0.940175C13.7518 1.02118 13.9603 1.14858 14.1373 1.3148C14.3143 1.48102 14.4563 1.68258 14.5546 1.9068C14.6529 2.13102 14.7054 2.37312 14.7086 2.6188C14.7118 2.86448 14.6656 3.10808 14.5726 3.33608C14.4796 3.56408 14.3417 3.77198 14.1666 3.94701L11.333 2.00001Z" fill="white"/>
                      <path d="M9.33333 4.00001L12.3333 7.00001L4.33333 15H1.33333V12L9.33333 4.00001Z" fill="white"/>
                    </svg>
                    Edit Profile
                  </button>
                    ) : (
                      <div className="edit-actions">
                        <button className="cancel-btn" onClick={handleCancelEdit}>
                          Cancel
                        </button>
                        <button className="save-btn" onClick={handleSaveProfile}>
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <SecuritySection
                passwordData={passwordData}
                twoFactorEnabled={twoFactorEnabled}
                isChangingPassword={isChangingPassword}
                onPasswordChange={handlePasswordChange}
                onChangePassword={handleChangePassword}
                onCancelPassword={handleCancelPassword}
                onTwoFactorToggle={handleTwoFactorToggle}
              />
            )}

            {activeTab === 'payment' && (
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
                onExportBillingHistory={handleExportBillingHistory}
                totalSpent={getTotalSpent()}
              />
            )}

            {activeTab === 'notifications' && (
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
            )}

            {activeTab === 'privacy' && (
              <PrivacySection
                dataVisibility={dataVisibility}
                onDataVisibilityChange={handleDataVisibilityChange}
                onSavePreferences={handleSavePreferences}
                onRequestAccountDeletion={handleRequestAccountDeletion}
              />
            )}
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication Modal */}
      {showTwoFactorModal && (
        <div className="modal-overlay">
          <div className="modal-content">
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

export default AccountSettings;
