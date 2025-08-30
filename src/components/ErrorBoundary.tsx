import React, { Component, ReactNode } from 'react';
import { View, TouchableOpacity } from 'react-native';

import ThemedText from './ThemedText';
import Icon from './Icon';
import { useThemeColors } from '@/contexts/ThemeColors';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundaryClass extends Component<Props & { colors: any }, State> {
  constructor(props: Props & { colors: any }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 items-center justify-center bg-black p-6">
          <Icon name="AlertTriangle" size={64} color={this.props.colors.highlight} />
          <ThemedText className="mt-6 text-center text-2xl font-bold text-white">
            Oops! Something went wrong
          </ThemedText>
          <ThemedText className="mt-4 text-center text-white opacity-70">
            We're sorry, but something unexpected happened. Please try again.
          </ThemedText>
          <TouchableOpacity
            className="mt-8 rounded-lg bg-highlight px-6 py-3"
            onPress={this.handleRetry}>
            <ThemedText className="font-semibold text-white">Try Again</ThemedText>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

export default function ErrorBoundary({ children }: Props) {
  const colors = useThemeColors();
  return <ErrorBoundaryClass colors={colors}>{children}</ErrorBoundaryClass>;
}
