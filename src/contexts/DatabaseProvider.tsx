import { useAuth, useUser } from '@clerk/clerk-expo';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Platform } from 'react-native';

// Conditionally import native modules only on mobile
let database: any = null;
let syncDatabase: any = null;
let syncService: any = null;
let useDataStore: any = null;
let storageManager: any = null;

interface DatabaseContextType {
  isInitialized: boolean;
  error: string | null;
  userId: string | null;
  // Onboarding status
  isFirstTimeUser: boolean;
  isOnboardingCompleted: boolean;
  isLoading: boolean;
  isUserSetupComplete: boolean; // New flag to indicate user setup is complete
  completeOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
  // Sync methods
  syncNow: () => Promise<void>;
  toggleBackgroundSync: (enabled: boolean) => void;
  // Test methods
  createTestData: () => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

interface DatabaseProviderProps {
  children: ReactNode;
}

export function DatabaseProvider({ children }: DatabaseProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Clerk authentication
  const { isSignedIn, isLoaded: isAuthLoaded } = useAuth();
  const { user: clerkUser } = useUser();

  // Onboarding state
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Handle web platform differently
  useEffect(() => {
    if (Platform.OS === 'web') {
      // Web platform: provide mock implementation
      setIsInitialized(true);
      setIsLoading(false);
      setIsFirstTimeUser(false);
      setIsOnboardingCompleted(true);
      if (clerkUser) {
        setUserId(clerkUser.id);
      }
      return;
    }

    // Mobile platform: use actual database logic
    if (!database || !syncDatabase || !syncService || !storageManager) {
      console.warn('Database modules not available on this platform');
      return;
    }

    let isMounted = true;
    
    const handleUserAuth = async () => {
      if (!isAuthLoaded || !isInitialized || !isMounted) return;

      if (isSignedIn && clerkUser) {
        try {
          console.log('🔄 DatabaseProvider - user authenticated:', clerkUser);
          console.log('🔄 DatabaseProvider - user authenticated:', clerkUser.id);

          // Check if user exists in local database
          const existingUser = await database.getUserByClerkId(clerkUser.id);

          if (existingUser) {
            // User exists, check if we need to update their data
            const needsUpdate =
              existingUser.name !== (clerkUser.fullName || undefined) ||
              existingUser.email !== (clerkUser.primaryEmailAddress?.emailAddress || undefined);

            if (needsUpdate) {
              console.log('🔄 DatabaseProvider - updating existing user data');
              await database.updateUser(existingUser.id, {
                name: clerkUser.fullName || undefined,
                email: clerkUser.primaryEmailAddress?.emailAddress || undefined,
              });

              // Trigger sync to update cloud database
              try {
                await syncService.syncNow();
                console.log('🔄 DatabaseProvider - updated user data synced to cloud');
              } catch (syncError) {
                console.warn('⚠️ DatabaseProvider - user update sync failed:', syncError);
              }
            }

            // Batch state updates to prevent race conditions
            React.startTransition(() => {
              setUserId(existingUser.id);
            });
            console.log('🔄 DatabaseProvider - existing user found:', existingUser.id);
          } else {
            // Create new user in local database
            const newUser = {
              id: clerkUser.id, // Use Clerk ID as local ID for simplicity
              clerkId: clerkUser.id,
              name: clerkUser.fullName || undefined,
              email: clerkUser.primaryEmailAddress?.emailAddress || undefined,
            };

            await database.createUser(newUser);
            // Batch state updates to prevent race conditions
            React.startTransition(() => {
              setUserId(newUser.id);
            });
            console.log('🔄 DatabaseProvider - new user created:', newUser.id);

            // Trigger immediate sync for the new user
            try {
              await syncService.syncNow();
              console.log('🔄 DatabaseProvider - user data synced to cloud');
            } catch (syncError) {
              console.warn('⚠️ DatabaseProvider - user sync failed:', syncError);
              // Don't fail the user creation if sync fails
            }
          }

          // Check onboarding status for authenticated user
          const [firstTime, completed] = await Promise.all([
            storageManager.isFirstTimeUser(),
            storageManager.isOnboardingCompleted(),
          ]);

          // Debug the onboarding status
          await storageManager.debugOnboardingStatus();

          // Ensure we always have boolean values
          const isFirstTime = Boolean(firstTime);
          const isCompleted = Boolean(completed);

          // Auto-fix: If user is authenticated and not a first-time user but onboarding is not completed,
          // assume they have completed onboarding (they've used the app before)
          let finalIsCompleted = isCompleted;
          if (!isFirstTime && !isCompleted) {
            console.log('🔄 DatabaseProvider - Auto-fixing onboarding status for existing user');
            await storageManager.forceCompleteOnboardingForExistingUser(clerkUser.id);
            finalIsCompleted = true;
          }

          // Batch state updates to prevent race conditions
          React.startTransition(() => {
            setIsFirstTimeUser(isFirstTime);
            setIsOnboardingCompleted(finalIsCompleted);
          });
          console.log('🔄 DatabaseProvider - onboarding status for authenticated user:', {
            firstTime: isFirstTime,
            completed: finalIsCompleted,
          });
        } catch (error) {
          console.error('❌ DatabaseProvider - Error handling user auth:', error);
          if (isMounted) {
            setError('Failed to handle user authentication');
          }
        }
      } else {
        // User not signed in, clear user ID and check onboarding status for non-authenticated users
        React.startTransition(() => {
          setUserId(null);
        });
        console.log('🔄 DatabaseProvider - user not signed in');

        // Check onboarding status for non-authenticated users
        const [firstTime, completed] = await Promise.all([
          storageManager.isFirstTimeUser(),
          storageManager.isOnboardingCompleted(),
        ]);

        // Debug the onboarding status
        await storageManager.debugOnboardingStatus();

        // Ensure we always have boolean values
        const isFirstTime = Boolean(firstTime);
        const isCompleted = Boolean(completed);

        // Auto-fix: If user is not a first-time user but onboarding is not completed,
        // assume they have completed onboarding (they've used the app before)
        let finalIsCompleted = isCompleted;
        if (!isFirstTime && !isCompleted) {
          console.log(
            '🔄 DatabaseProvider - Auto-fixing onboarding status for non-authenticated existing user'
          );
          await storageManager.forceCompleteOnboardingForExistingUser();
          finalIsCompleted = true;
        }

        // Batch state updates to prevent race conditions
        React.startTransition(() => {
          setIsFirstTimeUser(isFirstTime);
          setIsOnboardingCompleted(finalIsCompleted);
        });
        console.log('🔄 DatabaseProvider - onboarding status for non-authenticated user:', {
          firstTime: isFirstTime,
          completed: finalIsCompleted,
        });
      }
    };

    handleUserAuth();

    return () => {
      isMounted = false;
    };
  }, [isAuthLoaded, isSignedIn, clerkUser, isInitialized]);

  useEffect(() => {
    let isMounted = true;

    const initializeApp = async () => {
      if (!isMounted) return;

      try {
        console.log('🔄 DatabaseProvider - starting initialization');

        if (Platform.OS === 'web') {
          // Web platform: skip database initialization
          if (!isMounted) return;
          setIsInitialized(true);
          console.log('🔄 DatabaseProvider - web platform initialized');
          return;
        }

        // Mobile platform: initialize database
        if (!database || !syncService) {
          console.warn('Database modules not available on this platform');
          if (!isMounted) return;
          setIsInitialized(true);
          return;
        }

        // Initialize database first
        await database.init();
        await initializeSyncTables();

        if (!isMounted) return;
        setIsInitialized(true);
        console.log('🔄 DatabaseProvider - database initialized');

        // Initialize sync service
        if (isMounted) {
          console.log('🔄 DatabaseProvider - initializing sync service');
          await syncService.initialize();

          // Initialize data store with user data if available
          if (userId && useDataStore) {
            console.log('🔄 DatabaseProvider - initializing data store');
            const dataStore = useDataStore.getState();
            await dataStore.refreshAllData(userId);
          }
        }
      } catch (err) {
        if (!isMounted) return;

        const errorMessage = err instanceof Error ? err.message : 'Failed to initialize app';
        setError(errorMessage);
        console.error('❌ DatabaseProvider - initialization failed:', errorMessage);
        setIsLoading(false);
      }
    };

    initializeApp();

    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - only run once

  // Update data store when user ID changes
  useEffect(() => {
    const updateDataStore = async () => {
      if (Platform.OS === 'web') {
        return; // Skip on web platform
      }

      if (userId && isInitialized && useDataStore) {
        console.log('🔄 DatabaseProvider - updating data store for user:', userId);
        const dataStore = useDataStore.getState();
        await dataStore.refreshAllData(userId);
      }
    };

    updateDataStore();
  }, [userId, isInitialized]);

  // Update sync service when user ID changes
  useEffect(() => {
    if (Platform.OS === 'web') {
      return; // Skip on web platform
    }

    if (isInitialized && syncService) {
      console.log('🔄 DatabaseProvider - updating sync service for user:', userId);
      syncService.setCurrentUser(userId);
    }
  }, [userId, isInitialized]);

  // Set loading to false when we have all the information we need
  useEffect(() => {
    if (isInitialized && isAuthLoaded) {
      setIsLoading(false);
      console.log('🔄 DatabaseProvider - loading complete');
    }
  }, [isInitialized, isAuthLoaded]);

  const initializeSyncTables = async () => {
    // Sync tables are handled by the sync store, not needed for core functionality
    console.log('🔄 DatabaseProvider - sync tables initialization skipped');
  };

  // Create test data to trigger sync operations
  const createTestData = async () => {
    if (Platform.OS === 'web') {
      console.log('🔄 DatabaseProvider - test data creation not available on web');
      return;
    }

    if (!userId) {
      console.log('❌ DatabaseProvider - cannot create test data: no user ID');
      return;
    }

    if (!syncDatabase) {
      console.log('❌ DatabaseProvider - sync database not available');
      return;
    }

    try {
      console.log('🔄 DatabaseProvider - creating test data...');

      // Create a test user if none exists
      const existingUser = await syncDatabase.getUser(userId);
      if (!existingUser) {
        await syncDatabase.createUser({
          id: userId,
          clerkId: userId,
          name: 'Test User',
          email: 'test@example.com',
        });
        console.log('🔄 DatabaseProvider - created test user');
      }

      // Add a test weight entry
      await syncDatabase.addWeightEntry({
        userId,
        weight: 75.5,
        date: new Date().toISOString(),
      });
      console.log('🔄 DatabaseProvider - created test weight entry');

      // Add a test goal
      await syncDatabase.addGoal({
        userId,
        type: 'weight',
        target: 70,
        current: 75.5,
        startDate: new Date().toISOString(), // Add required startDate
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      });
      console.log('🔄 DatabaseProvider - created test goal');

      console.log('🔄 DatabaseProvider - test data created successfully');
    } catch (error) {
      console.error('❌ DatabaseProvider - Error creating test data:', error);
    }
  };

  // Onboarding methods
  const completeOnboarding = async () => {
    if (Platform.OS === 'web') {
      setIsOnboardingCompleted(true);
      console.log('🔄 DatabaseProvider - onboarding completed (web)');
      return;
    }

    if (!storageManager) {
      console.log('❌ DatabaseProvider - storage manager not available');
      return;
    }

    try {
      await storageManager.completeOnboarding(userId || undefined);
      setIsOnboardingCompleted(true);
      console.log('🔄 DatabaseProvider - onboarding completed');
    } catch (error) {
      console.error('❌ DatabaseProvider - Error completing onboarding:', error);
    }
  };

  const resetOnboarding = async () => {
    if (Platform.OS === 'web') {
      setIsFirstTimeUser(true);
      setIsOnboardingCompleted(false);
      console.log('🔄 DatabaseProvider - onboarding reset (web)');
      return;
    }

    if (!storageManager) {
      console.log('❌ DatabaseProvider - storage manager not available');
      return;
    }

    try {
      await storageManager.clearAllData();
      setIsFirstTimeUser(true);
      setIsOnboardingCompleted(false);
      console.log('🔄 DatabaseProvider - onboarding reset');
    } catch (error) {
      console.error('❌ DatabaseProvider - Error resetting onboarding:', error);
    }
  };

  const value: DatabaseContextType = {
    isInitialized,
    error,
    userId,
    // Onboarding properties
    isFirstTimeUser,
    isOnboardingCompleted,
    isLoading: isLoading || !isInitialized || !isAuthLoaded,
    isUserSetupComplete: !isLoading && isInitialized && isAuthLoaded && !!userId,
    completeOnboarding,
    resetOnboarding,
    // Sync methods
    syncNow: () => {
      if (Platform.OS === 'web' || !syncService) {
        console.log('🔄 DatabaseProvider - sync not available on web');
        return Promise.resolve();
      }
      return syncService.syncNow();
    },
    toggleBackgroundSync: (enabled: boolean) => {
      if (Platform.OS === 'web' || !syncService) {
        console.log('🔄 DatabaseProvider - background sync not available on web');
        return;
      }
      syncService.toggleBackgroundSync(enabled);
    },
    // Test methods
    createTestData,
  };

  return <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>;
}

export function useDatabase(): DatabaseContextType {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}
