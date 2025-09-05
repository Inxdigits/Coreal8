import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, updateProfile, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '../../../Firebase/Firebase.js';
import './LMSSettings.css';

// Import mini-components
import LMSSidebar from './Components/LMSSidebar';
import LMSHeader from './Components/LMSHeader';
import ProfileSection from './Components/ProfileSection';
import SecuritySection from './Components/SecuritySection';
import PaymentSection from './Components/PaymentSection';
import NotificationsSection from './Components/NotificationsSection';
import PrivacySection from './Components/PrivacySection';

const LMSSettings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [user, setUser] = useState(null);
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
  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  });
  const [savedCards, setSavedCards] = useState([
    {
      id: 1,
      type: 'Visa',
      lastFour: '4421',
      expiry: '09/2027',
      isDefault: true
    }
  ]);
  const [billingHistory, setBillingHistory] = useState([
    {
      id: 1,
      date: 'Jul 10, 2025',
      item: 'Emotional Resilience Course',
      amount: '₦15,000',
      status: 'Paid',
      invoice: 'Download'
    },
    {
      id: 2,
      date: 'Jul 10, 2025',
      item: 'Emotional Resilience Course',
      amount: '₦15,000',
      status: 'Paid',
      invoice: 'Download'
    },
    {
      id: 3,
      date: 'Jul 10, 2025',
      item: 'Emotional Resilience Course',
      amount: '₦15,000',
      status: 'Paid',
      invoice: 'Download'
    },
    {
      id: 4,
      date: 'Jul 10, 2025',
      item: 'Emotional Resilience Course',
      amount: '₦15,000',
      status: 'Paid',
      invoice: 'Download'
    },
    {
      id: 5,
      date: 'Jul 10, 2025',
      item: 'Emotional Resilience Course',
      amount: '₦15,000',
      status: 'Paid',
      invoice: 'Download'
    },
    {
      id: 6,
      date: 'Jul 8, 2025',
      item: 'Leadership Mastery Program',
      amount: '₦25,000',
      status: 'Paid',
      invoice: 'Download'
    },
    {
      id: 7,
      date: 'Jul 5, 2025',
      item: 'Mentorship Session',
      amount: '₦8,000',
      status: 'Paid',
      invoice: 'Download'
    },
    {
      id: 8,
      date: 'Jul 3, 2025',
      item: 'Coaching Session',
      amount: '₦12,000',
      status: 'Paid',
      invoice: 'Download'
    },
    {
      id: 9,
      date: 'Jul 1, 2025',
      item: 'Counseling Session',
      amount: '₦10,000',
      status: 'Paid',
      invoice: 'Download'
    },
    {
      id: 10,
      date: 'Jun 28, 2025',
      item: 'Advanced Course Bundle',
      amount: '₦35,000',
      status: 'Paid',
      invoice: 'Download'
    }
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  // Get current user from Firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const displayName = user.displayName || '';
        const nameParts = displayName.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        
        setUser({
          name: displayName || 'User',
          email: user.email || '',
          profileImage: user.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
        });
        
        setFormData({
          firstName: firstName,
          lastName: lastName,
          email: user.email || '',
          phone: user.phoneNumber || ''
        });
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Calculate pagination
  const totalPages = Math.ceil(billingHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBillingHistory = billingHistory.slice(startIndex, endIndex);

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
      await signOut(auth);
      navigate('/login');
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

  const handleRemovePhoto = () => {
    if (user) {
      updateProfile(auth.currentUser, {
        photoURL: null
      }).then(() => {
        setUser(prev => ({
          ...prev,
          profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
        }));
      }).catch((error) => {
        console.error('Error removing photo:', error);
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const photoURL = event.target.result;
        updateProfile(auth.currentUser, {
          photoURL: photoURL
        }).then(() => {
          setUser(prev => ({
            ...prev,
            profileImage: photoURL
          }));
        }).catch((error) => {
          console.error('Error updating photo:', error);
        });
      };
      reader.readAsDataURL(file);
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

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    alert(twoFactorEnabled ? 'Two-Factor Authentication disabled' : 'Two-Factor Authentication enabled');
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleAddPaymentMethod = () => {
    alert('Add Payment Method functionality will be implemented here');
  };

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
            isLoading={isLoading}
            onInputChange={handleInputChange}
            onEditProfile={handleEditProfile}
            onCancel={handleCancel}
            onSave={handleSave}
            onAddPhoto={handleAddPhoto}
            onRemovePhoto={handleRemovePhoto}
            onFileChange={handleFileChange}
          />
        );
      case 'security':
        return (
          <SecuritySection
            passwordData={passwordData}
            passwordVisibility={passwordVisibility}
            twoFactorEnabled={twoFactorEnabled}
            isChangingPassword={isChangingPassword}
            onPasswordChange={handlePasswordChange}
            onChangePassword={handleChangePassword}
            onCancelPassword={handleCancelPassword}
            onTwoFactorToggle={handleTwoFactorToggle}
            onTogglePasswordVisibility={togglePasswordVisibility}
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
            onRemoveCard={handleRemoveCard}
            onAddNewCard={handleAddNewCard}
            onAddPaymentMethod={handleAddPaymentMethod}
            onDownloadInvoice={handleDownloadInvoice}
            onPageChange={handlePageChange}
          />
        );
      case 'notifications':
        return <NotificationsSection />;
      case 'privacy':
        return <PrivacySection />;
      default:
        return (
          <ProfileSection
            user={user}
            isEditing={isEditing}
            formData={formData}
            isLoading={isLoading}
            onInputChange={handleInputChange}
            onEditProfile={handleEditProfile}
            onCancel={handleCancel}
            onSave={handleSave}
            onAddPhoto={handleAddPhoto}
            onRemovePhoto={handleRemovePhoto}
            onFileChange={handleFileChange}
          />
        );
    }
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="lms-settings-container">
      <LMSSidebar 
        user={user} 
        activeSection="settings" 
        onLogout={handleLogout} 
      />

      <div className="lms-main">
        <LMSHeader 
          searchQuery={searchQuery} 
          onSearchChange={handleSearch} 
        />

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
  );
};

export default LMSSettings;