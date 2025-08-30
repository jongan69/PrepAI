import React, { useRef, useState } from 'react';
import { View, Pressable, Image } from 'react-native';
import { ActionSheetRef } from 'react-native-actions-sheet';

import useThemeColors from '@/contexts/ThemeColors';

import ActionSheetThemed from '@/components/ActionSheetThemed';
import { Button } from '@/components/Button';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Icon, { IconName } from '@/components/Icon';
import ThemedFooter from '@/components/ThemeFooter';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';

// Money Model Types
type OfferType = 'attraction' | 'upsell' | 'downsell' | 'continuity';

interface MoneyOffer {
  id: string;
  type: OfferType;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  features: string[];
  icon: string;
  isPopular?: boolean;
  isLimited?: boolean;
  trialDays?: number;
  guarantee?: string;
}

export default function SubscriptionScreen() {
  const [selectedOffer, setSelectedOffer] = useState<string>('');
  const [currentStage, setCurrentStage] = useState<'attraction' | 'upsell' | 'downsell' | 'continuity'>('attraction');
  const actionSheetRef = useRef<ActionSheetRef>(null);

  // Money Model Offers - Following Hormozi's Framework
  const moneyOffers: MoneyOffer[] = [
    // STAGE 1: Attraction Offers - Get users in the door
    {
      id: 'free-trial',
      type: 'attraction',
      title: '7-Day Free Trial',
      description: 'Try PrepAI Premium risk-free',
      price: 'FREE',
      features: ['Unlimited meal planning', 'AI workout recommendations', 'Progress tracking', 'Cancel anytime'],
      icon: 'Gift',
      trialDays: 7,
      guarantee: '100% Money Back Guarantee',
    },
    {
      id: 'starter-pack',
      type: 'attraction',
      title: 'Starter Pack',
      description: 'Perfect for beginners',
      price: '$9.99',
      originalPrice: '$29.99',
      discount: '67%',
      features: ['30-day meal plans', 'Basic workout library', 'Weight tracking', 'Email support'],
      icon: 'Star',
      isLimited: true,
    },

    // STAGE 2: Upsell Offers - Increase order value
    {
      id: 'premium-monthly',
      type: 'upsell',
      title: 'Premium Monthly',
      description: 'Most popular choice',
      price: '$29.99',
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
    },
    {
      id: 'premium-yearly',
      type: 'upsell',
      title: 'Premium Yearly',
      description: 'Best value - Save 50%',
      price: '$179.99',
      originalPrice: '$359.88',
      discount: '50%',
      features: [
        'Everything in Monthly',
        'Exclusive content',
        'Personal nutritionist chat',
        'Advanced analytics',
        'Family sharing (up to 5)',
        'Early access to features',
      ],
      icon: 'Medal',
    },

    // STAGE 3: Downsell Offers - Capture the "no's"
    {
      id: 'basic-monthly',
      type: 'downsell',
      title: 'Basic Monthly',
      description: 'Essential features only',
      price: '$14.99',
      features: ['Basic meal planning', 'Simple workout tracking', 'Weight logging', 'Basic support'],
      icon: 'Check',
    },
    {
      id: 'pay-per-month',
      type: 'downsell',
      title: 'Pay As You Go',
      description: 'No commitment required',
      price: '$4.99',
      features: ['Single meal plan', 'One workout session', 'Basic tracking', '7-day access'],
      icon: 'Clock',
    },

    // STAGE 4: Continuity Offers - Keep users paying
    {
      id: 'lifetime',
      type: 'continuity',
      title: 'Lifetime Access',
      description: 'One-time payment, forever access',
      price: '$499.99',
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
    },
  ];

  const getOffersByStage = (stage: OfferType) => {
    return moneyOffers.filter((offer) => offer.type === stage);
  };

  const handleOfferSelect = (offerId: string) => {
    setSelectedOffer(offerId);
    const offer = moneyOffers.find((o) => o.id === offerId);
    if (offer) {
      // Move to next stage based on current offer
      switch (offer.type) {
        case 'attraction':
          setCurrentStage('upsell');
          break;
        case 'upsell':
          setCurrentStage('downsell');
          break;
        case 'downsell':
          setCurrentStage('continuity');
          break;
        case 'continuity':
          // Final stage
          break;
      }
    }
  };

  const handlePurchase = () => {
    actionSheetRef.current?.show();
  };

  const getStageTitle = (stage: OfferType) => {
    switch (stage) {
      case 'attraction':
        return 'Get Started';
      case 'upsell':
        return 'Choose Your Plan';
      case 'downsell':
        return 'More Options';
      case 'continuity':
        return 'Go Premium';
    }
  };

  const getStageDescription = (stage: OfferType) => {
    switch (stage) {
      case 'attraction':
        return 'Start your health journey with our special offers';
      case 'upsell':
        return 'Get the most out of your fitness journey';
      case 'downsell':
        return 'Find the perfect plan for your needs';
      case 'continuity':
        return 'Unlock unlimited access to all features';
    }
  };

  return (
    <>
      <View className="flex-1 bg-background">
        <Header showBackButton />
        <ThemedScroller>
          {/* Stage Indicator */}
          <View className="mb-6 px-global">
            <View className="mb-4 flex-row items-center justify-between">
              <ThemedText className="text-2xl font-bold">{getStageTitle(currentStage)}</ThemedText>
            </View>
            <ThemedText className="text-muted-foreground text-base">{getStageDescription(currentStage)}</ThemedText>
          </View>

          {/* Current Stage Offers */}
          <View className="px-global">
            {getOffersByStage(currentStage).map((offer) => (
              <MoneyOfferCard
                key={offer.id}
                offer={offer}
                isSelected={selectedOffer === offer.id}
                onSelect={() => handleOfferSelect(offer.id)}
              />
            ))}
          </View>

          {/* Value Proposition */}
          <View className="mt-8 px-global">
            <Card
              className="bg-secondary/50"
              title=""
              image={require('@/assets/img/subscription-banner.jpg')}>
              <View className="p-4">
                <ThemedText className="mb-2 text-lg font-semibold">✨ Why Choose PrepAI?</ThemedText>
                <ThemedText className="text-muted-foreground mb-3 text-sm">
                  We're here to support your health journey every step of the way:
                </ThemedText>
                <View className="space-y-2">
                  <View className="flex-row items-center">
                    <Icon
                      name="Gift"
                      size={16}
                      className="mr-2"
                    />
                    <ThemedText className="text-sm">Start free with no commitment</ThemedText>
                  </View>
                  <View className="flex-row items-center">
                    <Icon
                      name="TrendingUp"
                      size={16}
                      className="mr-2"
                    />
                    <ThemedText className="text-sm">Unlock advanced features as you grow</ThemedText>
                  </View>
                  <View className="flex-row items-center">
                    <Icon
                      name="Shield"
                      size={16}
                      className="mr-2"
                    />
                    <ThemedText className="text-sm">Choose the plan that fits your needs</ThemedText>
                  </View>
                  <View className="flex-row items-center">
                    <Icon
                      name="Crown"
                      size={16}
                      className="mr-2"
                    />
                    <ThemedText className="text-sm">Invest in your long-term success</ThemedText>
                  </View>
                </View>
              </View>
            </Card>
          </View>
        </ThemedScroller>

        {/* Action Footer */}
        <ThemedFooter>
          {selectedOffer && (
            <View className="mb-4">
              <ThemedText className="mb-2 text-center text-sm font-light">
                Selected: {moneyOffers.find((o) => o.id === selectedOffer)?.title}
              </ThemedText>
              <ThemedText className="text-center text-lg font-bold">
                {moneyOffers.find((o) => o.id === selectedOffer)?.price}
              </ThemedText>
            </View>
          )}
          <Button
            onPress={handlePurchase}
            className="!bg-highlight"
            textClassName="!text-white"
            size="large"
            rounded="full"
            title={selectedOffer ? 'Continue' : 'Choose Your Plan'}
            disabled={!selectedOffer}
          />
        </ThemedFooter>
      </View>

      {/* Success Modal */}
      <ActionSheetThemed
        gestureEnabled
        containerStyle={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingTop: 10,
        }}
        ref={actionSheetRef}>
        <View className="items-center px-6 pt-10">
          <Icon
            name="Check"
            size={24}
            className="mb-6 h-20 w-20 rounded-full bg-highlight"
          />
          <ThemedText className="text-4xl font-semibold">Welcome to PrepAI!</ThemedText>
          <ThemedText className="mb-8 mt-2 px-14 text-center text-lg font-light">
            You're all set up with your chosen plan. We'll notify you before your next billing cycle.
          </ThemedText>
          <Button
            onPress={() => actionSheetRef.current?.hide()}
            className="!bg-highlight"
            textClassName="!text-white"
            size="large"
            rounded="full"
            title="Start Your Journey"
          />
        </View>
      </ActionSheetThemed>
    </>
  );
}

interface MoneyOfferCardProps {
  offer: MoneyOffer;
  isSelected: boolean;
  onSelect: () => void;
}

const MoneyOfferCard: React.FC<MoneyOfferCardProps> = ({ offer, isSelected, onSelect }) => {
  const colors = useThemeColors();

  // Get appropriate image based on offer type
  const getOfferImage = () => {
    switch (offer.type) {
      case 'attraction':
        return require('@/assets/img/welcome.jpg');
      case 'upsell':
        return require('@/assets/img/muscles.png');
      case 'downsell':
        return require('@/assets/img/progress.png');
      case 'continuity':
        return require('@/assets/img/subscription-banner.jpg');
      default:
        return require('@/assets/img/welcome.jpg');
    }
  };

  return (
    <Pressable
      onPress={onSelect}
      className={`relative mb-4 rounded-xl border-2 bg-secondary ${isSelected ? 'border-highlight' : 'border-border'}`}>
      {/* Background Image */}
      <View className="absolute inset-0 overflow-hidden opacity-10">
        <Image
          source={getOfferImage()}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>

      {/* Popular Badge */}
      {offer.isPopular && (
        <View className="absolute -top-3 left-4 z-10 rounded-full bg-highlight px-3 py-1">
          <ThemedText className="text-xs font-bold text-white">MOST POPULAR</ThemedText>
        </View>
      )}

      {/* Limited Time Badge */}
      {offer.isLimited && (
        <View className="absolute -top-3 right-4 z-10 rounded-full bg-red-500 px-3 py-1 opacity-50">
          <ThemedText className="text-xs font-bold text-white">LIMITED TIME</ThemedText>
        </View>
      )}

      <View className="relative z-10 p-6">
        {/* Header */}
        <View className="mb-4 flex-row items-start justify-between">
          <View className="flex-1">
            <ThemedText className="text-2xl font-bold">{offer.title}</ThemedText>
            <ThemedText className="text-muted-foreground text-base">{offer.description}</ThemedText>
          </View>
          <Icon
            name={offer.icon as IconName}
            size={32}
            color={isSelected ? colors.highlight : colors.text}
            className={`h-16 w-16 rounded-full p-4 ${isSelected ? 'bg-highlight/20' : 'bg-background'}`}
          />
        </View>

        {/* Price */}
        <View className="mb-4 flex-row items-center">
          <ThemedText className="text-3xl font-bold">{offer.price}</ThemedText>
          {offer.originalPrice && (
            <ThemedText className="text-muted-foreground ml-2 text-lg line-through">{offer.originalPrice}</ThemedText>
          )}
          {offer.discount && (
            <View className="ml-2 rounded-full bg-highlight px-2 py-1">
              <ThemedText className="text-xs font-bold text-white">{offer.discount} OFF</ThemedText>
            </View>
          )}
        </View>

        {/* Features */}
        <View className="mb-4">
          {offer.features.map((feature, index) => (
            <View
              key={index}
              className="mb-2 flex-row items-center">
              <Icon
                name="Check"
                size={16}
                className="mr-2 text-highlight"
              />
              <ThemedText className="text-sm">{feature}</ThemedText>
            </View>
          ))}
        </View>

        {/* Guarantee */}
        {offer.guarantee && (
          <View className="flex-row items-center">
            <Icon
              name="Shield"
              size={16}
              className="mr-2 text-highlight"
            />
            <ThemedText className="text-sm font-medium">{offer.guarantee}</ThemedText>
          </View>
        )}
      </View>
    </Pressable>
  );
};
