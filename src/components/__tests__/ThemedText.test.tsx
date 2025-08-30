import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ThemedText from '../ThemedText';

describe('ThemedText', () => {
  it('should render children text', () => {
    render(<ThemedText>Hello World</ThemedText>);
    
    expect(screen.getByText('Hello World')).toBeTruthy();
  });

  it('should apply default className', () => {
    render(<ThemedText>Test Text</ThemedText>);
    
    const text = screen.getByText('Test Text');
    expect(text.props.className).toContain('text-text');
  });

  it('should apply custom className', () => {
    render(<ThemedText className="custom-class">Test Text</ThemedText>);
    
    const text = screen.getByText('Test Text');
    expect(text.props.className).toContain('text-text custom-class');
  });

  it('should pass through additional props', () => {
    render(<ThemedText testID="test-text">Test Text</ThemedText>);
    
    const text = screen.getByTestId('test-text');
    expect(text).toBeTruthy();
  });

  it('should render with empty className', () => {
    render(<ThemedText className="">Empty Class</ThemedText>);
    
    const text = screen.getByText('Empty Class');
    expect(text.props.className).toBe('text-text ');
  });

  it('should render complex children', () => {
    render(
      <ThemedText>
        <ThemedText>Nested</ThemedText> Text
      </ThemedText>
    );
    
    expect(screen.getByText('Nested')).toBeTruthy();
    expect(screen.getByText(' Text')).toBeTruthy();
  });
});
