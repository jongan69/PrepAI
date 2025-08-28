import React, { ReactNode, useState, useRef, useEffect, Children, isValidElement } from 'react';
import { View, Pressable, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import ThemedText from '@/components/ThemedText';

// Step component that will be used as children
export interface StepProps {
  title: string;
  optional?: boolean;
  children: ReactNode;
}

export const Step: React.FC<StepProps> = ({ children }) => {
  return <>{children}</>; // Just render children, this is mainly for type safety
};

// Add this to help with type checking
const isStepComponent = (child: any): child is React.ReactElement<StepProps> => {
  return (
    isValidElement(child) && (child.type === Step || (typeof child.type === 'function' && child.type.name === 'Step'))
  );
};

interface StepData {
  key: string;
  title: string;
  optional?: boolean;
  component: ReactNode;
}

interface MultiStepProps {
  children: ReactNode;
  onComplete: () => void;
  onClose?: () => void;
  showHeader?: boolean;
  showStepIndicator?: boolean;
  className?: string;
  onStepChange?: (nextStep: number) => boolean;
}

export default function MultiStep({
  children,
  onComplete,
  onClose,
  showHeader = true,
  showStepIndicator = true,
  className = '',
  onStepChange,
}: MultiStepProps) {
  // Filter and validate children to only include Step components
  const validChildren = Children.toArray(children).filter(isStepComponent);

  // Extract step data from children
  const steps: StepData[] = validChildren.map((child, index) => {
    const { title, optional, children: stepContent } = (child as React.ReactElement<StepProps>).props;
    return {
      key: `step-${index}`,
      title: title || `Step ${index + 1}`,
      optional,
      component: stepContent,
    };
  });

  // Ensure we have at least one step
  if (steps.length === 0) {
    steps.push({
      key: 'empty-step',
      title: 'Empty',
      component: (
        <View>
          <ThemedText>No steps provided</ThemedText>
        </View>
      ),
    });
  }

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;
  const isFirstStep = currentStepIndex === 0;

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const progressAnims = useRef(steps.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Reset and start fade/slide animations
    fadeAnim.setValue(0);
    slideAnim.setValue(50);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
      }),
    ]).start();

    // Animate progress indicators
    steps.forEach((_, index) => {
      Animated.timing(progressAnims[index], {
        toValue: index <= currentStepIndex ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  }, [currentStepIndex]);

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      const nextStep = currentStepIndex + 1;
      const canProceed = onStepChange ? onStepChange(nextStep) : true;

      if (canProceed) {
        setCurrentStepIndex(nextStep);
      }
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep.optional && !isLastStep) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingBottom: insets.bottom }}
      className={`flex-1 bg-background ${className}`}>
      {showHeader && (
        <Header
          rightComponents={[
            onClose ? (
              <Pressable
                key="close"
                onPress={handleClose}
                className="rounded-full p-2 active:bg-secondary"
                hitSlop={8}>
                <Icon
                  name="X"
                  size={24}
                  className="text-light-text dark:text-dark-text"
                />
              </Pressable>
            ) : undefined,
          ]}
          leftComponent={[
            currentStep.optional && !isLastStep && (
              <Button
                key="skip"
                title="Skip"
                variant="ghost"
                onPress={handleSkip}
                size="small"
              />
            ),
            !isFirstStep && (
              <Icon
                name="ArrowLeft"
                key="back"
                size={24}
                className="text-light-text dark:text-dark-text"
                onPress={handleBack}
              />
            ),
          ]}
        />
      )}

      {/* Step Indicators */}
      {showStepIndicator && (
        <View className="mb-10 w-full flex-row justify-center px-global">
          {steps.map((_, index) => (
            <Animated.View
              key={index}
              className="h-1 flex-1 overflow-hidden bg-border"
              style={{
                opacity: index === currentStepIndex ? 1 : 1,
              }}>
              <Animated.View
                className="h-full bg-text"
                style={{
                  width: progressAnims[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                }}
              />
            </Animated.View>
          ))}
        </View>
      )}

      {/* Step Content */}
      <Animated.View
        className="flex-1"
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}>
        <View className="flex-1">{currentStep.component}</View>
      </Animated.View>

      {/* Bottom Navigation */}
      <View className="border-t border-border px-4 py-3">
        <Button
          title={isLastStep ? 'Complete' : 'Next'}
          onPress={handleNext}
          className="w-full"
          size="large"
        />
      </View>
    </View>
  );
}
