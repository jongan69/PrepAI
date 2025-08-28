import { useRouter, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Pressable, Image, TouchableOpacity, Alert } from 'react-native';

import { Button } from '@/components/Button';
import Card from '@/components/Card';
import { Chip } from '@/components/Chip';
import Icon, { IconName } from '@/components/Icon';
import ThemedText from '@/components/ThemedText';
import { useMoneyModel } from '@/contexts/MoneyModelContext';

interface SmartOfferCardProps {
  placement: 'home' | 'workout' | 'meal' | 'progress' | 'profile';
  variant?: 'compact' | 'full' | 'banner';
  showAlways?: boolean;
  className?: string;
}

export default function SmartOfferCard({
  placement,
  variant = 'compact',
  showAlways = false,
  className = '',
}: SmartOfferCardProps) {
  const router = useRouter();
  const {
    getNextBestOffer,
    currentStage,
    trackOfferView,
    trackOfferClick,
    shouldShowUpsell,
    shouldShowDownsell,
    shouldShowContinuity,
    getChurnRisk,
  } = useMoneyModel();

  const [offer, setOffer] = useState(getNextBestOffer());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const nextOffer = getNextBestOffer();
    setOffer(nextOffer);

    // Determine visibility based on placement and user stage
    const shouldShow = determineVisibility(placement, currentStage, showAlways);
    setIsVisible(shouldShow && !!nextOffer);
  }, [getNextBestOffer, placement, currentStage, showAlways]);

  const determineVisibility = (placement: string, stage: string, forceShow: boolean): boolean => {
    if (forceShow) return true;
    if (stage === 'lifetime') return false; // No offers for lifetime users

    // Strategic placement logic
    switch (placement) {
      case 'home':
        return ['free', 'trial'].includes(stage);
      case 'workout':
        return shouldShowUpsell() || shouldShowDownsell();
      case 'meal':
        return shouldShowUpsell() || shouldShowDownsell();
      case 'progress':
        return shouldShowContinuity();
      case 'profile':
        return ['basic', 'premium'].includes(stage);
      default:
        return false;
    }
  };

  const handleOfferView = () => {
    if (offer) {
      trackOfferView(offer.id);
    }
  };

  const handleOfferClick = () => {
    console.log('handleOfferClick', offer);
    if (offer) {
      trackOfferClick(offer.id);
    }
  };

  const handlePress = () => {
    console.log('handlePress called');
    console.log('Current router:', router);
    console.log('Attempting navigation to: /(mobile)/(profile)/subscription');

    try {
      handleOfferClick();
      console.log('handleOfferClick completed');

      // Try different navigation approaches
      console.log('Pushing to subscription screen...');

      // Try the direct router import first
      router.push('/(mobile)/(profile)/subscription');
      console.log('Navigation push completed');
    } catch (error) {
      console.error('Navigation error:', error);

      // Fallback: try a simpler path
      try {
        console.log('Trying fallback navigation...');
        router.push('/subscription');
      } catch (fallbackError) {
        console.error('Fallback navigation also failed:', fallbackError);
      }
    }
  };

  const handlePressIn = () => {
    console.log('handlePressIn called');
  };

  const handlePressOut = () => {
    console.log('handlePressOut called');
  };

  const getPlacementMessage = (): string => {
    if (!offer) return '';

    switch (placement) {
      case 'home':
        return 'Unlock your full potential';
      case 'workout':
        return 'Get personalized workout plans';
      case 'meal':
        return 'Access unlimited meal plans';
      case 'progress':
        return 'Track your progress like a pro';
      case 'profile':
        return 'Upgrade your experience';
      default:
        return 'Discover more features';
    }
  };

  const getUrgencyMessage = (): string => {
    const churnRisk = getChurnRisk();

    switch (churnRisk) {
      case 'high':
        return "Limited time offer - Don't miss out!";
      case 'medium':
        return 'Special offer just for you';
      default:
        return 'Exclusive deal available';
    }
  };

  // Track view when component mounts
  useEffect(() => {
    if (offer) {
      handleOfferView();
    }
  }, [offer]);

  if (!isVisible || !offer) return null;

  if (variant === 'banner') {
    return (
      <View style={{ width: '100%' }}>
        <TouchableOpacity
          onPress={handlePress}
          activeOpacity={0.7}
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            padding: 0,
            margin: 0,
          }}>
          <Card
            className={`from-highlight/10 to-highlight/5 border-highlight/20 overflow-hidden bg-gradient-to-r ${className}`}
            title=""
            image="">
            {/* Background Image */}
            <View className="absolute inset-0 opacity-5">
              <Image
                source={require('@/assets/img/banner-4.jpg')}
                className="h-full w-full"
                resizeMode="cover"
              />
            </View>

            <View className="relative z-10 p-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <ThemedText className="text-lg font-bold text-highlight">
                    {getPlacementMessage()}
                  </ThemedText>
                  <ThemedText className="text-muted-foreground text-sm">
                    {offer.title} - {offer.price === 0 ? 'FREE' : `$${offer.price}`}
                  </ThemedText>
                </View>
                <Icon name="ArrowRight" size={20} className="text-highlight" />
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }

  if (variant === 'compact') {
    return (
      <View style={{ width: '100%' }}>
        <TouchableOpacity
          onPress={handlePress}
          activeOpacity={0.7}
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            padding: 0,
            margin: 0,
          }}>
          <Card
            className={`bg-secondary/50 ${className}`}
            title=""
            image={require('@/assets/img/banner-2.jpg')}>
            <View className="p-4">
              <View className="mb-2 flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Icon name={offer.icon as IconName} size={20} className="mr-2 text-highlight" />
                  <ThemedText className="font-semibold">{offer.title}</ThemedText>
                </View>
                {offer.isPopular && <Chip label="POPULAR" className="bg-highlight/20" />}
              </View>
              <ThemedText className="text-muted-foreground mb-2 text-sm">
                {offer.description}
              </ThemedText>
              <View className="flex-row items-center justify-between">
                <ThemedText className="text-lg font-bold">
                  {offer.price === 0 ? 'FREE' : `$${offer.price}`}
                </ThemedText>
                <ThemedText className="text-xs font-medium text-highlight">Learn More →</ThemedText>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }

  // Full variant
  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={{
          width: '100%',
          backgroundColor: 'transparent',
          padding: 0,
          margin: 0,
        }}>
        <Card className={`overflow-hidden bg-secondary ${className}`} title="" image="">
          {/* Background Image */}
          <View className="absolute inset-0 opacity-5">
            <Image
              source={require('@/assets/img/muscles.png')}
              className="h-full w-full"
              resizeMode="cover"
            />
          </View>

          <View className="relative z-10 p-6">
            {/* Header */}
            <View className="mb-4 flex-row items-start justify-between">
              <View className="flex-1">
                <ThemedText className="text-xl font-bold">{offer.title}</ThemedText>
                <ThemedText className="text-muted-foreground text-base">
                  {offer.description}
                </ThemedText>
              </View>
              <Icon
                name={offer.icon as IconName}
                size={32}
                className="bg-highlight/20 h-16 w-16 rounded-full p-4"
              />
            </View>

            {/* Urgency Message */}
            <View className="mb-4">
              <ThemedText className="text-sm font-medium text-highlight">
                {getUrgencyMessage()}
              </ThemedText>
            </View>

            {/* Features */}
            <View className="mb-4">
              {offer.features.slice(0, 3).map((feature, index) => (
                <View key={index} className="mb-1 flex-row items-center">
                  <Icon name="Check" size={14} className="mr-2 text-highlight" />
                  <ThemedText className="text-sm">{feature}</ThemedText>
                </View>
              ))}
              {offer.features.length > 3 && (
                <ThemedText className="text-muted-foreground ml-6 text-sm">
                  +{offer.features.length - 3} more features
                </ThemedText>
              )}
            </View>

            {/* Price and Action */}
            <View className="flex-row items-center justify-between">
              <View>
                <ThemedText className="text-2xl font-bold">
                  {offer.price === 0 ? 'FREE' : `$${offer.price}`}
                </ThemedText>
                {offer.originalPrice && (
                  <ThemedText className="text-muted-foreground text-sm line-through">
                    ${offer.originalPrice}
                  </ThemedText>
                )}
              </View>
              <Button
                className="bg-highlight"
                textClassName="text-white"
                size="medium"
                rounded="full"
                title="Get Started"
              />
            </View>

            {/* Guarantee */}
            {offer.guarantee && (
              <View className="mt-4 flex-row items-center justify-center">
                <Icon name="Shield" size={16} className="mr-2 text-highlight" />
                <ThemedText className="text-sm font-medium">{offer.guarantee}</ThemedText>
              </View>
            )}
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
}
