import Storage from 'expo-sqlite/kv-store';

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  goals: string[];
  personalInfo: {
    age?: number;
    weight?: number;
    height?: number;
    activityLevel?: string;
  };
  preferences: {
    notifications: boolean;
    units: 'metric' | 'imperial';
    theme: 'light' | 'dark' | 'auto';
  };
  createdAt: string;
  updatedAt: string;
}

const LOCAL_PROFILE_KEY = 'userProfile';

export class ProfileBackupManager {
  /**
   * Get local profile data
   */
  static async getLocalProfile(): Promise<UserProfile | null> {
    try {
      const profileData = await Storage.getItem(LOCAL_PROFILE_KEY);
      if (!profileData) {
        return null;
      }
      return JSON.parse(profileData) as UserProfile;
    } catch (error) {
      console.error('Failed to get local profile:', error);
      return null;
    }
  }

  /**
   * Save profile locally
   */
  static async saveLocalProfile(profile: UserProfile): Promise<boolean> {
    try {
      const profileData = JSON.stringify(profile, null, 2);
      await Storage.setItem(LOCAL_PROFILE_KEY, profileData);
      return true;
    } catch (error) {
      console.error('Failed to save local profile:', error);
      return false;
    }
  }

  /**
   * Create a new profile with default values
   */
  static createDefaultProfile(name: string, email?: string): UserProfile {
    return {
      id: Date.now().toString(),
      name,
      email,
      goals: [],
      personalInfo: {},
      preferences: {
        notifications: true,
        units: 'metric',
        theme: 'auto',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}
