import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@clerk/clerk-expo';

// Money Model Types
export type OfferType = 'attraction' | 'upsell' | 'downsell' | 'continuity';
export type UserStage = 'free' | 'trial' | 'basic' | 'premium' | 'lifetime';

export interface MoneyOffer {
  id: string;
  type: OfferType;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  features: string[];
  icon: string;
  isPopular?: boolean;
  isLimited?: boolean;
  trialDays?: number;
  guarantee?: string;
  conversionRate?: number;
  avgOrderValue?: number;
}

export interface UserJourney {
  userId: string;
  currentStage: UserStage;
  offersSeen: string[];
  offersClicked: string[];
  offersPurchased: string[];
  totalSpent: number;
  lastOfferDate: Date;
  conversionPath: string[];
  lifetimeValue: number;
  churnRisk: 'low' | 'medium' | 'high';
}

interface MoneyModelContextType {
  // User Journey
  userJourney: UserJourney | null;
  currentStage: UserStage;

  // Offers
  availableOffers: MoneyOffer[];
  recommendedOffers: MoneyOffer[];
  personalizedOffers: MoneyOffer[];

  // Actions
  trackOfferView: (offerId: string) => void;
  trackOfferClick: (offerId: string) => void;
  trackOfferPurchase: (offerId: string, amount: number) => void;
  updateUserStage: (stage: UserStage) => void;

  // Analytics
  getConversionRate: (offerType: OfferType) => number;
  getAverageOrderValue: (offerType: OfferType) => number;
  getLifetimeValue: () => number;
  getChurnRisk: () => 'low' | 'medium' | 'high';

  // Money Model Logic
  getNextBestOffer: () => MoneyOffer | null;
  shouldShowUpsell: () => boolean;
  shouldShowDownsell: () => boolean;
  shouldShowContinuity: () => boolean;
}

const MoneyModelContext = createContext<MoneyModelContextType | undefined>(undefined);

// Money Model Offers - Following Hormozi's Framework
const ALL_OFFERS: MoneyOffer[] = [
  // STAGE 1: Attraction Offers - Get users in the door
  {
    id: 'free-trial',
    type: 'attraction',
    title: '7-Day Free Trial',
    description: 'Try PrepAI Premium risk-free',
    price: 0,
    features: ['Unlimited meal planning', 'AI workout recommendations', 'Progress tracking', 'Cancel anytime'],
    icon: 'Gift',
    trialDays: 7,
    guarantee: '100% Money Back Guarantee',
    conversionRate: 0.15,
    avgOrderValue: 0,
  },
  {
    id: 'starter-pack',
    type: 'attraction',
    title: 'Starter Pack',
    description: 'Perfect for beginners',
    price: 9.99,
    originalPrice: 29.99,
    discount: 67,
    features: ['30-day meal plans', 'Basic workout library', 'Weight tracking', 'Email support'],
    icon: 'Star',
    isLimited: true,
    conversionRate: 0.12,
    avgOrderValue: 9.99,
  },

  // STAGE 2: Upsell Offers - Increase order value
  {
    id: 'premium-monthly',
    type: 'upsell',
    title: 'Premium Monthly',
    description: 'Most popular choice',
    price: 29.99,
    features: [
      'Unlimited meal plans',
      'AI workout recommendations',
      'Progress tracking',
      'Priority support',
      'Custom goals',
      'Recipe database',
    ],
    icon: 'Trophy',
    isPopular: true,
    conversionRate: 0.08,
    avgOrderValue: 29.99,
  },
  {
    id: 'premium-yearly',
    type: 'upsell',
    title: 'Premium Yearly',
    description: 'Best value - Save 50%',
    price: 179.99,
    originalPrice: 359.88,
    discount: 50,
    features: [
      'Everything in Monthly',
      'Exclusive content',
      'Personal nutritionist chat',
      'Advanced analytics',
      'Family sharing (up to 5)',
      'Early access to features',
    ],
    icon: 'Medal',
    conversionRate: 0.05,
    avgOrderValue: 179.99,
  },

  // STAGE 3: Downsell Offers - Capture the "no's"
  {
    id: 'basic-monthly',
    type: 'downsell',
    title: 'Basic Monthly',
    description: 'Essential features only',
    price: 14.99,
    features: ['Basic meal planning', 'Simple workout tracking', 'Weight logging', 'Basic support'],
    icon: 'Check',
    conversionRate: 0.18,
    avgOrderValue: 14.99,
  },
  {
    id: 'pay-per-month',
    type: 'downsell',
    title: 'Pay As You Go',
    description: 'No commitment required',
    price: 4.99,
    features: ['Single meal plan', 'One workout session', 'Basic tracking', '7-day access'],
    icon: 'Clock',
    conversionRate: 0.25,
    avgOrderValue: 4.99,
  },

  // STAGE 4: Continuity Offers - Keep users paying
  {
    id: 'lifetime',
    type: 'continuity',
    title: 'Lifetime Access',
    description: 'One-time payment, forever access',
    price: 499.99,
    features: [
      'Lifetime access to all features',
      'All future updates included',
      'Premium support forever',
      'Family sharing unlimited',
      'Exclusive lifetime content',
      'No recurring payments',
    ],
    icon: 'Crown',
    guarantee: 'Lifetime Guarantee',
    conversionRate: 0.02,
    avgOrderValue: 499.99,
  },
];

export function MoneyModelProvider({ children }: { children: ReactNode }) {
  const { userId } = useAuth();
  const [userJourney, setUserJourney] = useState<UserJourney | null>(null);
  const [currentStage, setCurrentStage] = useState<UserStage>('free');

  // Initialize user journey
  useEffect(() => {
    if (userId) {
      // In a real app, this would load from database
      const initialJourney: UserJourney = {
        userId,
        currentStage: 'free',
        offersSeen: [],
        offersClicked: [],
        offersPurchased: [],
        totalSpent: 0,
        lastOfferDate: new Date(),
        conversionPath: [],
        lifetimeValue: 0,
        churnRisk: 'low',
      };
      setUserJourney(initialJourney);
      setCurrentStage(initialJourney.currentStage);
    }
  }, [userId]);

  // Get offers based on user stage
  const getAvailableOffers = (): MoneyOffer[] => {
    if (!userJourney) return [];

    switch (userJourney.currentStage) {
      case 'free':
        return ALL_OFFERS.filter((offer) => offer.type === 'attraction');
      case 'trial':
        return ALL_OFFERS.filter((offer) => offer.type === 'upsell');
      case 'basic':
        return ALL_OFFERS.filter((offer) => offer.type === 'upsell' || offer.type === 'continuity');
      case 'premium':
        return ALL_OFFERS.filter((offer) => offer.type === 'continuity');
      case 'lifetime':
        return []; // No more offers needed
      default:
        return ALL_OFFERS.filter((offer) => offer.type === 'attraction');
    }
  };

  // Get personalized offers based on user behavior
  const getPersonalizedOffers = (): MoneyOffer[] => {
    if (!userJourney) return [];

    const available = getAvailableOffers();

    // Sort by conversion rate and user behavior
    return available.sort((a, b) => {
      // Prioritize offers user hasn't seen
      const aSeen = userJourney.offersSeen.includes(a.id);
      const bSeen = userJourney.offersSeen.includes(b.id);

      if (!aSeen && bSeen) return -1;
      if (aSeen && !bSeen) return 1;

      // Then by conversion rate
      return (b.conversionRate || 0) - (a.conversionRate || 0);
    });
  };

  // Track offer interactions
  const trackOfferView = (offerId: string) => {
    if (!userJourney) return;

    setUserJourney((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        offersSeen: [...new Set([...prev.offersSeen, offerId])],
        lastOfferDate: new Date(),
      };
    });
  };

  const trackOfferClick = (offerId: string) => {
    if (!userJourney) return;

    setUserJourney((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        offersClicked: [...new Set([...prev.offersClicked, offerId])],
        lastOfferDate: new Date(),
      };
    });
  };

  const trackOfferPurchase = (offerId: string, amount: number) => {
    if (!userJourney) return;

    const offer = ALL_OFFERS.find((o) => o.id === offerId);
    if (!offer) return;

    setUserJourney((prev) => {
      if (!prev) return prev;

      // Update stage based on purchase
      let newStage = prev.currentStage;
      if (offer.type === 'attraction') {
        newStage = offer.price === 0 ? 'trial' : 'basic';
      } else if (offer.type === 'upsell') {
        newStage = 'premium';
      } else if (offer.type === 'continuity') {
        newStage = 'lifetime';
      }

      return {
        ...prev,
        offersPurchased: [...new Set([...prev.offersPurchased, offerId])],
        totalSpent: prev.totalSpent + amount,
        lifetimeValue: prev.lifetimeValue + (offer.avgOrderValue || amount),
        currentStage: newStage,
        conversionPath: [...prev.conversionPath, offerId],
        lastOfferDate: new Date(),
      };
    });

    setCurrentStage(userJourney.currentStage);
  };

  const updateUserStage = (stage: UserStage) => {
    setCurrentStage(stage);
    if (userJourney) {
      setUserJourney((prev) => (prev ? { ...prev, currentStage: stage } : null));
    }
  };

  // Analytics functions
  const getConversionRate = (offerType: OfferType): number => {
    if (!userJourney) return 0;

    const typeOffers = ALL_OFFERS.filter((o) => o.type === offerType);
    const seen = userJourney.offersSeen.filter((id) => typeOffers.some((o) => o.id === id)).length;
    const purchased = userJourney.offersPurchased.filter((id) => typeOffers.some((o) => o.id === id)).length;

    return seen > 0 ? purchased / seen : 0;
  };

  const getAverageOrderValue = (offerType: OfferType): number => {
    const typeOffers = ALL_OFFERS.filter((o) => o.type === offerType);
    const total = typeOffers.reduce((sum, offer) => sum + (offer.avgOrderValue || 0), 0);
    return typeOffers.length > 0 ? total / typeOffers.length : 0;
  };

  const getLifetimeValue = (): number => {
    return userJourney?.lifetimeValue || 0;
  };

  const getChurnRisk = (): 'low' | 'medium' | 'high' => {
    if (!userJourney) return 'low';

    const daysSinceLastActivity = (Date.now() - userJourney.lastOfferDate.getTime()) / (1000 * 60 * 60 * 24);

    if (daysSinceLastActivity > 30) return 'high';
    if (daysSinceLastActivity > 7) return 'medium';
    return 'low';
  };

  // Money Model Logic
  const getNextBestOffer = (): MoneyOffer | null => {
    const personalized = getPersonalizedOffers();
    return personalized.length > 0 ? personalized[0] : null;
  };

  const shouldShowUpsell = (): boolean => {
    if (!userJourney) return false;
    return ['trial', 'basic'].includes(userJourney.currentStage);
  };

  const shouldShowDownsell = (): boolean => {
    if (!userJourney) return false;
    return userJourney.offersClicked.length > 0 && userJourney.offersPurchased.length === 0;
  };

  const shouldShowContinuity = (): boolean => {
    if (!userJourney) return false;
    return ['premium', 'basic'].includes(userJourney.currentStage);
  };

  const value: MoneyModelContextType = {
    userJourney,
    currentStage,
    availableOffers: getAvailableOffers(),
    recommendedOffers: getPersonalizedOffers(),
    personalizedOffers: getPersonalizedOffers(),
    trackOfferView,
    trackOfferClick,
    trackOfferPurchase,
    updateUserStage,
    getConversionRate,
    getAverageOrderValue,
    getLifetimeValue,
    getChurnRisk,
    getNextBestOffer,
    shouldShowUpsell,
    shouldShowDownsell,
    shouldShowContinuity,
  };

  return <MoneyModelContext.Provider value={value}>{children}</MoneyModelContext.Provider>;
}

export function useMoneyModel() {
  const context = useContext(MoneyModelContext);
  if (context === undefined) {
    throw new Error('useMoneyModel must be used within a MoneyModelProvider');
  }
  return context;
}
