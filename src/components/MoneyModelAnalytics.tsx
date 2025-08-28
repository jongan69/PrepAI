import React from 'react';
import { View, ScrollView } from 'react-native';

import Card from '@/components/Card';
import Icon, { IconName } from '@/components/Icon';
import ThemedText from '@/components/ThemedText';
import Section from '@/components/layout/Section';
import { useMoneyModel } from '@/contexts/MoneyModelContext';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon: string;
  color?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon,
  color = 'highlight',
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className="bg-secondary" title="" image="">
      <View className="p-4">
        <View className="mb-2 flex-row items-center justify-between">
          <Icon name={icon as IconName} size={20} className={`text-${color}`} />
          {trend && (
            <View className="flex-row items-center">
              <Icon name={getTrendIcon()} size={16} className={getTrendColor()} />
              {trendValue && (
                <ThemedText className={`ml-1 text-xs ${getTrendColor()}`}>{trendValue}</ThemedText>
              )}
            </View>
          )}
        </View>
        <ThemedText className="text-2xl font-bold">{value}</ThemedText>
        <ThemedText className="text-muted-foreground text-sm">{title}</ThemedText>
        {subtitle && (
          <ThemedText className="text-muted-foreground mt-1 text-xs">{subtitle}</ThemedText>
        )}
      </View>
    </Card>
  );
};

export default function MoneyModelAnalytics() {
  const {
    userJourney,
    currentStage,
    getConversionRate,
    getAverageOrderValue,
    getLifetimeValue,
    getChurnRisk,
    recommendedOffers,
  } = useMoneyModel();

  if (!userJourney) {
    return (
      <Card className="bg-secondary" title="" image="">
        <View className="p-6">
          <ThemedText className="text-muted-foreground text-center">
            Loading analytics...
          </ThemedText>
        </View>
      </Card>
    );
  }

  const conversionRates = {
    attraction: getConversionRate('attraction'),
    upsell: getConversionRate('upsell'),
    downsell: getConversionRate('downsell'),
    continuity: getConversionRate('continuity'),
  };

  const avgOrderValues = {
    attraction: getAverageOrderValue('attraction'),
    upsell: getAverageOrderValue('upsell'),
    downsell: getAverageOrderValue('downsell'),
    continuity: getAverageOrderValue('continuity'),
  };

  const lifetimeValue = getLifetimeValue();
  const churnRisk = getChurnRisk();

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-global">
        {/* Header */}
        <Section
          title="📊 Performance Insights"
          subtitle="Track your app's growth and user engagement"
          titleSize="2xl"
          className="mb-6"
        />

        {/* Key Metrics */}
        <View className="mb-6">
          <ThemedText className="mb-4 text-lg font-semibold">Key Performance Indicators</ThemedText>
          <View className="grid grid-cols-2 gap-4">
            <AnalyticsCard
              title="Lifetime Value"
              value={`$${lifetimeValue.toFixed(2)}`}
              subtitle="Total customer value"
              icon="DollarSign"
              color="green-500"
            />
            <AnalyticsCard
              title="Current Stage"
              value={currentStage.toUpperCase()}
              subtitle="User journey position"
              icon="Map"
              color="blue-500"
            />
            <AnalyticsCard
              title="Churn Risk"
              value={churnRisk.toUpperCase()}
              subtitle="Customer retention risk"
              icon="AlertTriangle"
              color={
                churnRisk === 'high'
                  ? 'red-500'
                  : churnRisk === 'medium'
                    ? 'yellow-500'
                    : 'green-500'
              }
            />
            <AnalyticsCard
              title="Total Spent"
              value={`$${userJourney.totalSpent.toFixed(2)}`}
              subtitle="Revenue generated"
              icon="CreditCard"
              color="purple-500"
            />
          </View>
        </View>

        {/* Conversion Rates */}
        <View className="mb-6">
          <ThemedText className="mb-4 text-lg font-semibold">User Engagement by Stage</ThemedText>
          <View className="space-y-3">
            <AnalyticsCard
              title="Free Trials"
              value={`${(conversionRates.attraction * 100).toFixed(1)}%`}
              subtitle="Trial signups & starter packs"
              icon="Gift"
              color="green-500"
            />
            <AnalyticsCard
              title="Premium Upgrades"
              value={`${(conversionRates.upsell * 100).toFixed(1)}%`}
              subtitle="Monthly & yearly plans"
              icon="TrendingUp"
              color="blue-500"
            />
            <AnalyticsCard
              title="Basic Plans"
              value={`${(conversionRates.downsell * 100).toFixed(1)}%`}
              subtitle="Alternative options"
              icon="Shield"
              color="orange-500"
            />
            <AnalyticsCard
              title="Lifetime Plans"
              value={`${(conversionRates.continuity * 100).toFixed(1)}%`}
              subtitle="One-time purchases"
              icon="Crown"
              color="purple-500"
            />
          </View>
        </View>

        {/* Average Order Values */}
        <View className="mb-6">
          <ThemedText className="mb-4 text-lg font-semibold">Revenue per User</ThemedText>
          <View className="space-y-3">
            <AnalyticsCard
              title="Attraction Stage"
              value={`$${avgOrderValues.attraction.toFixed(2)}`}
              subtitle="Initial customer acquisition"
              icon="Target"
              color="green-500"
            />
            <AnalyticsCard
              title="Upsell Stage"
              value={`$${avgOrderValues.upsell.toFixed(2)}`}
              subtitle="Value maximization"
              icon="TrendingUp"
              color="blue-500"
            />
            <AnalyticsCard
              title="Downsell Stage"
              value={`$${avgOrderValues.downsell.toFixed(2)}`}
              subtitle="Recovery offers"
              icon="Shield"
              color="orange-500"
            />
            <AnalyticsCard
              title="Continuity Stage"
              value={`$${avgOrderValues.continuity.toFixed(2)}`}
              subtitle="Lifetime value"
              icon="Crown"
              color="purple-500"
            />
          </View>
        </View>

        {/* User Journey Path */}
        <View className="mb-6">
          <ThemedText className="mb-4 text-lg font-semibold">User Journey</ThemedText>
          <Card className="bg-secondary" title="" image="">
            <View className="p-4">
              <View className="mb-3 flex-row items-center justify-between">
                <ThemedText className="text-sm font-medium">Progress</ThemedText>
                <ThemedText className="text-muted-foreground text-xs">
                  {userJourney.conversionPath.length} interactions
                </ThemedText>
              </View>
              <View className="space-y-2">
                {userJourney.conversionPath.map((step, index) => (
                  <View key={index} className="flex-row items-center">
                    <View className="mr-3 h-6 w-6 items-center justify-center rounded-full bg-highlight">
                      <ThemedText className="text-xs font-bold text-white">{index + 1}</ThemedText>
                    </View>
                    <ThemedText className="text-sm">{step}</ThemedText>
                  </View>
                ))}
                {userJourney.conversionPath.length === 0 && (
                  <ThemedText className="text-muted-foreground text-sm">
                    No interactions yet. Start with free trials!
                  </ThemedText>
                )}
              </View>
            </View>
          </Card>
        </View>

        {/* Optimization Recommendations */}
        <View className="mb-6">
          <ThemedText className="mb-4 text-lg font-semibold">Growth Opportunities</ThemedText>
          <Card className="bg-secondary" title="" image="">
            <View className="p-4">
              <View className="space-y-3">
                {conversionRates.attraction < 0.1 && (
                  <View className="flex-row items-start">
                    <Icon name="AlertCircle" size={16} className="mr-2 mt-0.5 text-yellow-500" />
                    <View className="flex-1">
                      <ThemedText className="text-sm font-medium">Low Trial Signups</ThemedText>
                      <ThemedText className="text-muted-foreground text-xs">
                        Consider improving your free trial messaging and onboarding
                      </ThemedText>
                    </View>
                  </View>
                )}

                {conversionRates.upsell < 0.05 && (
                  <View className="flex-row items-start">
                    <Icon name="TrendingDown" size={16} className="mr-2 mt-0.5 text-red-500" />
                    <View className="flex-1">
                      <ThemedText className="text-sm font-medium">
                        Premium Upgrade Opportunities
                      </ThemedText>
                      <ThemedText className="text-muted-foreground text-xs">
                        Focus on showcasing premium features and their benefits
                      </ThemedText>
                    </View>
                  </View>
                )}

                {churnRisk === 'high' && (
                  <View className="flex-row items-start">
                    <Icon name="AlertTriangle" size={16} className="mr-2 mt-0.5 text-red-500" />
                    <View className="flex-1">
                      <ThemedText className="text-sm font-medium">User Retention Alert</ThemedText>
                      <ThemedText className="text-muted-foreground text-xs">
                        Focus on re-engagement strategies and user experience improvements
                      </ThemedText>
                    </View>
                  </View>
                )}

                {lifetimeValue < 50 && (
                  <View className="flex-row items-start">
                    <Icon name="Target" size={16} className="mr-2 mt-0.5 text-blue-500" />
                    <View className="flex-1">
                      <ThemedText className="text-sm font-medium">
                        Premium Plan Opportunities
                      </ThemedText>
                      <ThemedText className="text-muted-foreground text-xs">
                        Focus on long-term value propositions and premium features
                      </ThemedText>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </Card>
        </View>

        {/* Next Best Actions */}
        <View className="mb-6">
          <ThemedText className="mb-4 text-lg font-semibold">Recommended Plans</ThemedText>
          <View className="space-y-3">
            {recommendedOffers.slice(0, 3).map((offer, index) => (
              <Card key={offer.id} className="bg-secondary" title="" image="">
                <View className="p-4">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <ThemedText className="font-medium">{offer.title}</ThemedText>
                      <ThemedText className="text-muted-foreground text-sm">
                        {offer.description}
                      </ThemedText>
                    </View>
                    <View className="items-end">
                      <ThemedText className="font-bold">
                        {offer.price === 0 ? 'FREE' : `$${offer.price}`}
                      </ThemedText>
                      <ThemedText className="text-muted-foreground text-xs">
                        {offer.price === 0 ? 'Free' : 'Premium'} plan
                      </ThemedText>
                    </View>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
