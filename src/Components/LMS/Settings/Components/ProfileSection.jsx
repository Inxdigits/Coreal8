import React, { useRef } from 'react';
import ProfileImage from '../../../Shared/ProfileImage.jsx';

const ProfileSection = ({ 
  user, 
  isEditing, 
  formData, 
  isLoading, 
  onInputChange, 
  onEditProfile, 
  onCancel, 
  onSave, 
  onAddPhoto, 
  onRemovePhoto, 
  onFileChange,
  photoError,
  isUploadingPhoto
}) => {
  const fileInputRef = useRef(null);

  return (
    <div className="profile-section">
      <div className="profile-header">
        <h2 className="section-title">My Profile</h2>
        {isEditing && (
          <div className="profile-actions">
            <button 
              className="cancel-btn" 
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              className="save-btn" 
              onClick={onSave}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        )}
      </div>
      
      <div className="profile-picture-section">
        <div className="profile-picture">
          <ProfileImage 
            user={user} 
            size={120} 
            className="settings-profile-image"
            showInitials={true}
            fallbackImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face"
          />
        </div>
        <div className="profile-photo-actions">
          <button 
            className="add-photo-btn" 
            onClick={() => onAddPhoto(fileInputRef)}
            disabled={isLoading || isUploadingPhoto}
          >
            {isUploadingPhoto ? 'Uploading...' : '+ Add Photo'}
          </button>
          <button 
            className="remove-photo-btn" 
            onClick={onRemovePhoto}
            disabled={isLoading || isUploadingPhoto || !user?.profileImage}
          >
            {isUploadingPhoto ? 'Removing...' : 'Remove Photo'}
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
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

      <div className="personal-info-section">
        <h3 className="info-title">Personal Information</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              name="firstName"
              value={formData.firstName}
              onChange={onInputChange}
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
              value={formData.lastName}
              onChange={onInputChange}
              className="form-input"
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email (editable with verification)</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={onInputChange}
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
              value={formData.phone}
              onChange={onInputChange}
              className="form-input"
              disabled={!isEditing}
            />
          </div>
        </div>
        {!isEditing && (
          <button 
            className="edit-profile-btn" 
            onClick={onEditProfile}
            disabled={isLoading}
          >
            <span className="edit-icon">✏️</span>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
