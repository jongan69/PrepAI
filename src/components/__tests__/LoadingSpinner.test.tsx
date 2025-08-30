import React from 'react';
import { render, screen } from '@testing-library/react-native';
import LoadingSpinner from '../LoadingSpinner';

// Mock the theme context
jest.mock('@/contexts/ThemeColors', () => ({
  useThemeColors: () => ({
    highlight: '#00A6F4',
    primary: '#000000',
    text: '#ffffff',
  }),
}));

// Mock the Icon component
jest.mock('../Icon', () => {
  return function MockIcon({ name, size, color }: any) {
    return <div data-testid={`icon-${name}`} style={{ fontSize: size, color }} />;
  };
});

// Mock the ThemedText component
jest.mock('../ThemedText', () => {
  return function MockThemedText({ children, className }: any) {
    return <div data-testid="themed-text" className={className}>{children}</div>;
  };
});

describe('LoadingSpinner', () => {
  it('should render with default props', () => {
    render(<LoadingSpinner />);
    
    expect(screen.getByTestId('icon-Zap')).toBeTruthy();
    expect(screen.getByTestId('themed-text')).toBeTruthy();
    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('should render with custom message', () => {
    render(<LoadingSpinner message="Please wait..." />);
    
    expect(screen.getByText('Please wait...')).toBeTruthy();
  });

  it('should render with small size', () => {
    render(<LoadingSpinner size="small" />);
    
    const icon = screen.getByTestId('icon-Zap');
    expect(icon.props.style.fontSize).toBe(48);
  });

  it('should render with large size', () => {
    render(<LoadingSpinner size="large" />);
    
    const icon = screen.getByTestId('icon-Zap');
    expect(icon.props.style.fontSize).toBe(48);
  });

  it('should apply correct styling classes', () => {
    render(<LoadingSpinner />);
    
    const themedText = screen.getByTestId('themed-text');
    expect(themedText.props.className).toContain('mt-4 text-xl font-bold text-white');
  });

  it('should use theme colors', () => {
    render(<LoadingSpinner />);
    
    const icon = screen.getByTestId('icon-Zap');
    expect(icon.props.style.color).toBe('#00A6F4');
  });
});
