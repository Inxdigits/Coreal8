class GoogleProfileService {
  constructor() {
    this.baseUrl = 'https://www.googleapis.com/oauth2/v2';
  }

  /**
   * Fetch additional user profile information from Google API
   * @param {string} accessToken - Google access token
   * @returns {Promise<Object>} Enhanced user profile data
   */
  async fetchGoogleProfile(accessToken) {
    try {
      const response = await fetch(`${this.baseUrl}/userinfo?access_token=${accessToken}`);
      
      if (!response.ok) {
        throw new Error(`Google API request failed: ${response.status}`);
      }

      const profileData = await response.json();
      
      return {
        googleId: profileData.id,
        name: profileData.name,
        email: profileData.email,
        profileImage: profileData.picture,
        firstName: profileData.given_name,
        lastName: profileData.family_name,
        locale: profileData.locale,
        verifiedEmail: profileData.verified_email,
        // Additional Google-specific data
        googleProfileUrl: profileData.link,
        gender: profileData.gender,
        birthday: profileData.birthday,
        ageRange: profileData.age_range,
      };
    } catch (error) {
      console.error('Error fetching Google profile:', error);
      throw error;
    }
  }

  /**
   * Get high-resolution profile image URL
   * @param {string} profileImageUrl - Original profile image URL
   * @param {number} size - Desired image size (default: 200)
   * @returns {string} High-resolution profile image URL
   */
  getHighResProfileImage(profileImageUrl, size = 200) {
    if (!profileImageUrl) return null;
    
    // For Google profile images, we can modify the URL to get different sizes
    if (profileImageUrl.includes('googleusercontent.com')) {
      return `${profileImageUrl}?sz=${size}`;
    }
    
    return profileImageUrl;
  }

  /**
   * Extract initials from user name
   * @param {string} name - User's full name
   * @returns {string} User's initials
   */
  getInitials(name) {
    if (!name) return 'U';
    
    const nameParts = name.trim().split(' ');
    if (nameParts.length === 1) {
      return nameParts[0][0].toUpperCase();
    }
    
    return nameParts
      .slice(0, 2)
      .map(part => part[0])
      .join('')
      .toUpperCase();
  }

  /**
   * Format user data for display
   * @param {Object} userData - Raw user data
   * @returns {Object} Formatted user data
   */
  formatUserData(userData) {
    return {
      ...userData,
      displayName: userData.name || `${userData.firstName} ${userData.lastName}`.trim(),
      initials: this.getInitials(userData.name || `${userData.firstName} ${userData.lastName}`.trim()),
      profileImage: this.getHighResProfileImage(userData.profileImage),
      isGoogleUser: !!userData.googleId,
    };
  }

  /**
   * Validate Google profile data
   * @param {Object} profileData - Profile data from Google
   * @returns {boolean} Whether the profile data is valid
   */
  validateProfileData(profileData) {
    return !!(
      profileData &&
      profileData.id &&
      profileData.email &&
      profileData.name
    );
  }
}

export default new GoogleProfileService();
