import Constants from 'expo-constants';

export interface AppInfo {
  name: string;
  tagline: string;
  description: string;
  version: string;
  socialMedia: {
    twitter: string;
    facebook: string;
    instagram: string;
    linkedin: string;
  };
  contact: {
    email: string;
    website: string;
  };
  stats: {
    activeUsers: string;
    mealsPlanned: string;
    successRate: string;
    appRating: string;
  };
}

export const getAppInfo = (): AppInfo => {
  const appInfo = Constants.expoConfig?.extra?.appInfo as AppInfo;

  if (!appInfo) {
    // Fallback values if app.json is not available
    return {
      name: Constants.expoConfig?.name || 'PrepAI',
      tagline: 'Transform Your Fitness Journey with AI',
      description:
        'PrepAI combines artificial intelligence with personalized nutrition and workout planning to help you achieve your health goals faster and more effectively.',
      version: Constants.expoConfig?.version || '1.0.0',
      socialMedia: {
        twitter: 'https://twitter.com/prepai',
        facebook: 'https://facebook.com/prepai',
        instagram: 'https://instagram.com/prepai',
        linkedin: 'https://linkedin.com/company/prepai',
      },
      contact: {
        email: 'hello@prepai.com',
        website: 'https://prepai.com',
      },
      stats: {
        activeUsers: '50K+',
        mealsPlanned: '1M+',
        successRate: '95%',
        appRating: '4.8',
      },
    };
  }

  return appInfo;
};

export const getSocialMediaLinks = () => {
  return getAppInfo().socialMedia;
};

export const getContactInfo = () => {
  return getAppInfo().contact;
};

export const getAppStats = () => {
  return getAppInfo().stats;
};
