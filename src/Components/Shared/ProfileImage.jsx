import React, { useState } from 'react';
import GoogleProfileService from '../../services/GoogleProfileService.js';

const ProfileImage = ({ 
  user, 
  size = 40, 
  className = '', 
  showInitials = true,
  fallbackImage = null 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Get the appropriate image URL
  const getImageUrl = () => {
    if (user?.profileImage && !imageError) {
      return GoogleProfileService.getHighResProfileImage(user.profileImage, size);
    }
    return fallbackImage;
  };

  // Get user initials
  const getInitials = () => {
    if (!user?.name) return 'U';
    return GoogleProfileService.getInitials(user.name);
  };

  // Handle image load error
  const handleImageError = () => {
    console.log('Profile image failed to load:', user?.profileImage);
    setImageError(true);
  };

  // Handle successful image load
  const handleImageLoad = () => {
    console.log('Profile image loaded successfully:', user?.profileImage);
    setImageLoaded(true);
  };

  const imageUrl = getImageUrl();
  const initials = getInitials();


  // Simple fallback for debugging
  if (!user) {
    return (
      <div 
        className={`profile-image-container ${className}`} 
        style={{ 
          width: size, 
          height: size, 
          borderRadius: '50%',
          backgroundColor: '#6366f1',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size * 0.4,
          fontWeight: 'bold'
        }}
      >
        ?
      </div>
    );
  }

  return (
    <div className={`profile-image-container ${className}`} style={{ width: size, height: size, position: 'relative' }}>
      {imageUrl && !imageError ? (
        <img
          src={imageUrl}
          alt={`${user?.name || 'User'} profile`}
          className="profile-image"
          onError={handleImageError}
          onLoad={handleImageLoad}
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1
          }}
        />
      ) : null}
      
      {/* Fallback: Show initials or default avatar */}
      <div 
        className="profile-image-fallback"
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: '#6366f1',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size * 0.4,
          fontWeight: 'bold',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0
        }}
      >
        {showInitials ? initials : '👤'}
      </div>
    </div>
  );
};

export default ProfileImage;
