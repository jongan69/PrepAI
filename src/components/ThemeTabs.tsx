import React, { useState, useRef, ReactNode } from 'react';
import { View, ScrollView, Animated, Dimensions, TouchableOpacity, ViewStyle } from 'react-native';

import AnimatedView from './AnimatedView';
import ThemedText from './ThemedText';

type ThemeTabsProps = {
  children: ReactNode;
  headerComponent?: ReactNode;
  footerComponent?: ReactNode;
  type?: 'scrollview' | 'fixed';
  className?: string;
  style?: ViewStyle;
  scrollEnabled?: boolean;
};

type ThemeTabProps = {
  name: string;
  children: ReactNode;
  type?: 'scrollview' | 'flatlist' | 'view';
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ThemeTab: React.FC<ThemeTabProps> = ({ children }) => {
  return (
    <View className="" style={{ width: SCREEN_WIDTH, height: '100%' }}>
      {children}
    </View>
  );
};

const ThemeTabs: React.FC<ThemeTabsProps> = ({
  children,
  headerComponent,
  footerComponent,
  style,
  type = 'fixed',
  scrollEnabled = true,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const tabContentRef = useRef<ScrollView>(null);
  const mainScrollRef = useRef<ScrollView>(null);

  // Filter out only ThemeTab components from children
  const tabs = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === ThemeTab
  );

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    tabContentRef.current?.scrollTo({
      x: index * SCREEN_WIDTH,
      animated: true,
    });
  };

  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
    useNativeDriver: false,
  });

  const handleScrollEnd = (event: any) => {
    const position = event.nativeEvent.contentOffset.x;
    const index = Math.round(position / SCREEN_WIDTH);
    setActiveTab(index);
  };

  // Calculate sticky header indices correctly based on whether headerComponent exists
  const stickyHeaderIndices = headerComponent ? [1] : [0];

  return (
    <View className="dark:bg-dark-primary flex-1 bg-background">
      <ScrollView
        ref={mainScrollRef}
        stickyHeaderIndices={stickyHeaderIndices}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1">
        {/* Header Component - Will scroll up */}
        {headerComponent && <View>{headerComponent}</View>}

        {/* Tab Bar - This will be sticky */}
        <View className="z-10">
          {type === 'scrollview' ? (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              className="dark:bg-dark-primary border-light-secondary h-[48px] flex-row border-b bg-background dark:border-white/20">
              {tabs.map((tab, index) => {
                if (!React.isValidElement(tab)) return null;
                return (
                  <Animated.View key={index}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      className="relative h-full items-center justify-center px-4"
                      onPress={() => handleTabPress(index)}>
                      <ThemedText
                        className={`text-base ${activeTab === index ? 'text-highlight' : ''}`}>
                        {tab.props.name}
                      </ThemedText>
                      {activeTab === index && (
                        <View className="absolute bottom-0 h-[2px] w-full bg-highlight" />
                      )}
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </ScrollView>
          ) : (
            <View className="dark:bg-dark-primary border-light-secondary h-[48px] flex-row border-b bg-background dark:border-white/20">
              {tabs.map((tab, index) => {
                if (!React.isValidElement(tab)) return null;
                return (
                  <Animated.View key={index} className="flex-1">
                    <TouchableOpacity
                      activeOpacity={0.7}
                      className="relative flex-1 items-center justify-center px-3"
                      onPress={() => handleTabPress(index)}>
                      <ThemedText
                        className={`text-base ${activeTab === index ? 'text-highlight' : ''}`}>
                        {tab.props.name}
                      </ThemedText>
                      {activeTab === index && (
                        <View className="absolute bottom-0 h-[2px] w-full bg-highlight" />
                      )}
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </View>
          )}
        </View>

        {/* Tab Content - Horizontal scrollable area */}
        <View className="flex-1">
          {scrollEnabled ? (
            <ScrollView
              ref={tabContentRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              onMomentumScrollEnd={handleScrollEnd}
              className="flex-1"
              scrollEnabled={scrollEnabled}>
              {tabs}
            </ScrollView>
          ) : (
            <AnimatedView
              key={activeTab}
              duration={600}
              animation="fadeIn"
              className="flex-1"
              style={{ width: SCREEN_WIDTH }}>
              {tabs[activeTab]}
            </AnimatedView>
          )}
        </View>

        {footerComponent && <View>{footerComponent}</View>}
      </ScrollView>
    </View>
  );
};

export default ThemeTabs;
