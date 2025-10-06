import { storage } from '../Firebase/Firebase.js';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.js';

class ProfilePhotoService {
  constructor() {
    this.maxFileSize = 5 * 1024 * 1024; // 5MB
    this.allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  }

  /**
   * Validate uploaded file
   * @param {File} file - The file to validate
   * @returns {Object} Validation result
   */
  validateFile(file) {
    console.log('Validating file:', file);
    const errors = [];

    if (!file) {
      errors.push('No file selected');
      return { isValid: false, errors };
    }

    console.log('File type:', file.type);
    console.log('File size:', file.size);
    console.log('Allowed types:', this.allowedTypes);

    if (!this.allowedTypes.includes(file.type)) {
      errors.push('File type not supported. Please upload JPEG, PNG, or WebP images.');
    }

    if (file.size > this.maxFileSize) {
      errors.push('File size too large. Please upload images smaller than 5MB.');
    }

    const result = {
      isValid: errors.length === 0,
      errors
    };
    console.log('Validation result:', result);
    return result;
  }

  /**
   * Upload profile photo to Firebase Storage
   * @param {File} file - The image file to upload
   * @param {string} userId - The user's ID
   * @returns {Promise<string>} Download URL of uploaded image
   */
  async uploadProfilePhoto(file, userId) {
    try {
      console.log('Starting photo upload for user:', userId);
      
      // Validate file
      const validation = this.validateFile(file);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      // Create a unique filename
      const timestamp = Date.now();
      const fileExtension = file.name.split('.').pop();
      const fileName = `profile-photos/${userId}/profile_${timestamp}.${fileExtension}`;
      console.log('Uploading to:', fileName);

      // Create storage reference
      const storageRef = ref(storage, fileName);

      // Upload file
      console.log('Uploading bytes...');
      const snapshot = await uploadBytes(storageRef, file);
      console.log('Upload complete, getting download URL...');
      
      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('Download URL:', downloadURL);
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      throw error;
    }
  }

  /**
   * Update user's profile photo in Firebase Auth
   * @param {string} photoURL - The new photo URL
   * @returns {Promise<void>}
   */
  async updateUserProfilePhoto(photoURL) {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No authenticated user found');
      }

      await updateProfile(user, {
        photoURL: photoURL
      });

      return photoURL;
    } catch (error) {
      console.error('Error updating user profile photo:', error);
      throw error;
    }
  }

  /**
   * Remove profile photo from Firebase Storage
   * @param {string} photoURL - The photo URL to delete
   * @returns {Promise<void>}
   */
  async deleteProfilePhoto(photoURL) {
    try {
      if (!photoURL) {
        return;
      }

      // Extract the file path from the URL
      const url = new URL(photoURL);
      const pathMatch = url.pathname.match(/\/o\/(.+?)\?/);
      
      if (pathMatch) {
        const filePath = decodeURIComponent(pathMatch[1]);
        const photoRef = ref(storage, filePath);
        await deleteObject(photoRef);
      }
    } catch (error) {
      console.error('Error deleting profile photo:', error);
      // Don't throw error for deletion failures as the photo might not exist
    }
  }

  /**
   * Remove user's profile photo from Firebase Auth
   * @returns {Promise<void>}
   */
  async removeUserProfilePhoto() {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No authenticated user found');
      }

      // Delete the old photo from storage if it exists
      if (user.photoURL) {
        await this.deleteProfilePhoto(user.photoURL);
      }

      // Update user profile to remove photo
      await updateProfile(user, {
        photoURL: null
      });

      return null;
    } catch (error) {
      console.error('Error removing user profile photo:', error);
      throw error;
    }
  }

  /**
   * Complete profile photo update process
   * @param {File} file - The new image file
   * @param {string} userId - The user's ID
   * @returns {Promise<string>} New photo URL
   */
  async updateProfilePhoto(file, userId) {
    try {
      // Upload new photo
      const newPhotoURL = await this.uploadProfilePhoto(file, userId);
      
      // Get current user to delete old photo
      const user = auth.currentUser;
      const oldPhotoURL = user?.photoURL;

      // Update user profile with new photo
      await this.updateUserProfilePhoto(newPhotoURL);

      // Delete old photo from storage
      if (oldPhotoURL && oldPhotoURL !== newPhotoURL) {
        await this.deleteProfilePhoto(oldPhotoURL);
      }

      return newPhotoURL;
    } catch (error) {
      console.error('Error updating profile photo:', error);
      throw error;
    }
  }

  /**
   * Complete profile photo removal process
   * @returns {Promise<void>}
   */
  async removeProfilePhoto() {
    try {
      await this.removeUserProfilePhoto();
    } catch (error) {
      console.error('Error removing profile photo:', error);
      throw error;
    }
  }
}

export default new ProfilePhotoService();
