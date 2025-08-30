import { handleLogout, useLogout } from '../auth';
import { storageManager } from '../storage';
import { router } from 'expo-router';

// Mock the storage manager
jest.mock('../storage', () => ({
  storageManager: {
    clearAllData: jest.fn(),
  },
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
  },
}));

// Mock Clerk auth
jest.mock('@clerk/clerk-expo', () => ({
  useAuth: () => ({
    signOut: jest.fn(),
  }),
}));

const mockStorageManager = storageManager as jest.Mocked<typeof storageManager>;
const mockRouter = router as jest.Mocked<typeof router>;

describe('auth utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('handleLogout', () => {
    it('should clear storage and redirect to onboarding', async () => {
      mockStorageManager.clearAllData.mockResolvedValue(undefined);
      mockRouter.replace.mockReturnValue(undefined);

      await handleLogout();

      expect(mockStorageManager.clearAllData).toHaveBeenCalledTimes(1);
      expect(mockRouter.replace).toHaveBeenCalledWith('/(mobile)/(onboarding)');
    });

    it('should handle errors gracefully and still redirect', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      mockStorageManager.clearAllData.mockRejectedValue(new Error('Storage error'));
      mockRouter.replace.mockReturnValue(undefined);

      await handleLogout();

      expect(mockStorageManager.clearAllData).toHaveBeenCalledTimes(1);
      expect(mockRouter.replace).toHaveBeenCalledWith('/(mobile)/(onboarding)');
      expect(consoleErrorSpy).toHaveBeenCalledWith('❌ Auth - Error during logout:', expect.any(Error));

      consoleErrorSpy.mockRestore();
    });

    it('should log success message', async () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      mockStorageManager.clearAllData.mockResolvedValue(undefined);
      mockRouter.replace.mockReturnValue(undefined);

      await handleLogout();

      expect(consoleLogSpy).toHaveBeenCalledWith('🔄 Auth - logout completed successfully');

      consoleLogSpy.mockRestore();
    });
  });

  describe('useLogout', () => {
    it('should return a logout function', () => {
      const { logout } = useLogout();
      expect(typeof logout).toBe('function');
    });

    it('should call signOut and handleLogout when logout is called', async () => {
      const mockSignOut = jest.fn().mockResolvedValue(undefined);
      jest.doMock('@clerk/clerk-expo', () => ({
        useAuth: () => ({
          signOut: mockSignOut,
        }),
      }));

      // Re-import to get the mocked version
      const { useLogout: useLogoutMocked } = require('../auth');
      const { logout } = useLogoutMocked();

      mockStorageManager.clearAllData.mockResolvedValue(undefined);
      mockRouter.replace.mockReturnValue(undefined);

      await logout();

      expect(mockSignOut).toHaveBeenCalledTimes(1);
      expect(mockStorageManager.clearAllData).toHaveBeenCalledTimes(1);
      expect(mockRouter.replace).toHaveBeenCalledWith('/(mobile)/(onboarding)');
    });

    it('should handle signOut errors and fallback to handleLogout', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const mockSignOut = jest.fn().mockRejectedValue(new Error('Sign out error'));
      
      jest.doMock('@clerk/clerk-expo', () => ({
        useAuth: () => ({
          signOut: mockSignOut,
        }),
      }));

      // Re-import to get the mocked version
      const { useLogout: useLogoutMocked } = require('../auth');
      const { logout } = useLogoutMocked();

      mockStorageManager.clearAllData.mockResolvedValue(undefined);
      mockRouter.replace.mockReturnValue(undefined);

      await logout();

      expect(mockSignOut).toHaveBeenCalledTimes(1);
      expect(mockStorageManager.clearAllData).toHaveBeenCalledTimes(1);
      expect(mockRouter.replace).toHaveBeenCalledWith('/(mobile)/(onboarding)');
      expect(consoleErrorSpy).toHaveBeenCalledWith('❌ Auth - Error signing out from Clerk:', expect.any(Error));

      consoleErrorSpy.mockRestore();
    });
  });
});
