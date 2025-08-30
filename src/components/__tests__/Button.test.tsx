import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

// Mock the theme context
jest.mock('@/contexts/ThemeColors', () => ({
  __esModule: true,
  default: () => ({
    primary: '#000000',
    secondary: '#ffffff',
    text: '#000000',
    invert: '#ffffff',
    border: '#e5e5e5',
  }),
}));

// Mock the Icon component
jest.mock('../Icon', () => {
  return function MockIcon({ name, size, color, className }: any) {
    return <div data-testid={`icon-${name}`} style={{ fontSize: size, color }} className={className} />;
  };
});

// Mock expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

describe('Button', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with default props', () => {
    render(<Button title="Click me" onPress={mockOnPress} />);
    
    expect(screen.getByText('Click me')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    render(<Button title="Click me" onPress={mockOnPress} />);
    
    fireEvent.press(screen.getByText('Click me'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should render loading state', () => {
    render(<Button title="Click me" onPress={mockOnPress} loading={true} />);
    
    // Should not show text when loading
    expect(screen.queryByText('Click me')).toBeFalsy();
    // Should show activity indicator
    expect(screen.getByTestId('activity-indicator')).toBeTruthy();
  });

  it('should render with different variants', () => {
    const { rerender } = render(<Button title="Primary" variant="primary" onPress={mockOnPress} />);
    expect(screen.getByText('Primary')).toBeTruthy();

    rerender(<Button title="Secondary" variant="secondary" onPress={mockOnPress} />);
    expect(screen.getByText('Secondary')).toBeTruthy();

    rerender(<Button title="Outline" variant="outline" onPress={mockOnPress} />);
    expect(screen.getByText('Outline')).toBeTruthy();

    rerender(<Button title="Ghost" variant="ghost" onPress={mockOnPress} />);
    expect(screen.getByText('Ghost')).toBeTruthy();
  });

  it('should render with different sizes', () => {
    const { rerender } = render(<Button title="Small" size="small" onPress={mockOnPress} />);
    expect(screen.getByText('Small')).toBeTruthy();

    rerender(<Button title="Medium" size="medium" onPress={mockOnPress} />);
    expect(screen.getByText('Medium')).toBeTruthy();

    rerender(<Button title="Large" size="large" onPress={mockOnPress} />);
    expect(screen.getByText('Large')).toBeTruthy();
  });

  it('should render with start icon', () => {
    render(<Button title="With Icon" iconStart="Zap" onPress={mockOnPress} />);
    
    expect(screen.getByTestId('icon-Zap')).toBeTruthy();
    expect(screen.getByText('With Icon')).toBeTruthy();
  });

  it('should render with end icon', () => {
    render(<Button title="With Icon" iconEnd="ArrowRight" onPress={mockOnPress} />);
    
    expect(screen.getByTestId('icon-ArrowRight')).toBeTruthy();
    expect(screen.getByText('With Icon')).toBeTruthy();
  });

  it('should render with both start and end icons', () => {
    render(<Button title="With Icons" iconStart="Zap" iconEnd="ArrowRight" onPress={mockOnPress} />);
    
    expect(screen.getByTestId('icon-Zap')).toBeTruthy();
    expect(screen.getByTestId('icon-ArrowRight')).toBeTruthy();
    expect(screen.getByText('With Icons')).toBeTruthy();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button title="Disabled" onPress={mockOnPress} disabled={true} />);
    
    const button = screen.getByText('Disabled').parent;
    expect(button.props.disabled).toBe(true);
  });

  it('should be disabled when loading', () => {
    render(<Button title="Loading" onPress={mockOnPress} loading={true} />);
    
    const button = screen.getByTestId('activity-indicator').parent;
    expect(button.props.disabled).toBe(true);
  });

  it('should not call onPress when disabled', () => {
    render(<Button title="Disabled" onPress={mockOnPress} disabled={true} />);
    
    fireEvent.press(screen.getByText('Disabled'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('should not call onPress when loading', () => {
    render(<Button title="Loading" onPress={mockOnPress} loading={true} />);
    
    fireEvent.press(screen.getByTestId('activity-indicator'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('should render without title', () => {
    render(<Button onPress={mockOnPress} />);
    
    // Should still render the button container
    expect(screen.getByTestId('button-container')).toBeTruthy();
  });

  it('should apply custom className', () => {
    render(<Button title="Custom" onPress={mockOnPress} className="custom-class" />);
    
    const button = screen.getByText('Custom').parent;
    expect(button.props.className).toContain('custom-class');
  });

  it('should apply custom textClassName', () => {
    render(<Button title="Custom Text" onPress={mockOnPress} textClassName="custom-text-class" />);
    
    const text = screen.getByText('Custom Text');
    expect(text.props.className).toContain('custom-text-class');
  });
});
