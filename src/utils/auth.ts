import { useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';

import { storageManager } from '@/utils/storage';

/**
 * Utility function to handle complete logout process
 * This function:
 * 1. Signs out the user from Clerk authentication
 * 2. Clears local storage and onboarding data
 * 3. Redirects to the appropriate screen
 */
export const handleLogout = async () => {
  try {
    // Clear local storage and onboarding data
    await storageManager.clearAllData();

    // Redirect to the main index which will handle routing based on auth state
    router.replace('/(mobile)/(onboarding)');

    console.log('🔄 Auth - logout completed successfully');
  } catch (error) {
    console.error('❌ Auth - Error during logout:', error);
    // Even if there's an error, try to redirect
    router.replace('/(mobile)/(onboarding)');
  }
};

/**
 * Hook to get logout functionality with Clerk signOut
 */
export const useLogout = () => {
  const { signOut } = useAuth();

  const logout = async () => {
    try {
      // Sign out from Clerk first
      await signOut();

      // Then clear local data and redirect
      await handleLogout();
    } catch (error) {
      console.error('❌ Auth - Error signing out from Clerk:', error);
      // Fallback: just clear local data and redirect
      await handleLogout();
    }
  };

  return { logout };
};
