import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Container } from '../Container';

describe('Container', () => {
  it('should render children', () => {
    render(
      <Container>
        <div>Test Content</div>
      </Container>
    );
    
    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('should apply container styles', () => {
    render(
      <Container>
        <div>Test</div>
      </Container>
    );
    
    const container = screen.getByText('Test').parent;
    expect(container.props.className).toBe('flex flex-1 m-6');
  });

  it('should render multiple children', () => {
    render(
      <Container>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </Container>
    );
    
    expect(screen.getByText('Child 1')).toBeTruthy();
    expect(screen.getByText('Child 2')).toBeTruthy();
    expect(screen.getByText('Child 3')).toBeTruthy();
  });

  it('should render empty container', () => {
    render(<Container />);
    
    // Should render without errors
    expect(screen.getByTestId('safe-area-view')).toBeTruthy();
  });
});
