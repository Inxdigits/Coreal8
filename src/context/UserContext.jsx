import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../Firebase/Firebase.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Extract user data from Firebase Auth
        const userData = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || 'User',
          email: firebaseUser.email || '',
          profileImage: firebaseUser.photoURL || null,
          phoneNumber: firebaseUser.phoneNumber || '',
          emailVerified: firebaseUser.emailVerified || false,
          providerData: firebaseUser.providerData || [],
          // Additional Google-specific data
          googleId: firebaseUser.providerData.find(provider => provider.providerId === 'google.com')?.uid || null,
          firstName: firebaseUser.displayName ? firebaseUser.displayName.split(' ')[0] : '',
          lastName: firebaseUser.displayName ? firebaseUser.displayName.split(' ').slice(1).join(' ') : '',
        };


        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const updateUserProfile = (updates) => {
    if (user) {
      setUser(prev => ({ ...prev, ...updates }));
    }
  };

  const refreshUserData = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      // The onAuthStateChanged listener will automatically update the user state
    }
  };

  const value = {
    user,
    loading,
    logout,
    updateUserProfile,
    refreshUserData,
    isAuthenticated: !!user,
    isGoogleUser: user?.providerData?.some(provider => provider.providerId === 'google.com') || false,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
