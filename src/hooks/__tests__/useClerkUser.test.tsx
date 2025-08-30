import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useUser } from '@clerk/clerk-expo';
import { useClerkUser } from '../useClerkUser';

// Mock the Clerk useUser hook
jest.mock('@clerk/clerk-expo', () => ({
  useUser: jest.fn(),
}));

const mockUseUser = useUser as jest.MockedFunction<typeof useUser>;

describe('useClerkUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return user data when user is loaded', () => {
    const mockUser = {
      imageUrl: 'https://example.com/avatar.jpg',
      fullName: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      primaryEmailAddress: {
        emailAddress: 'john.doe@example.com',
      },
    };

    mockUseUser.mockReturnValue({
      user: mockUser,
      isLoaded: true,
    });

    const { result } = renderHook(() => useClerkUser());

    expect(result.current.user).toBe(mockUser);
    expect(result.current.isLoaded).toBe(true);
    expect(result.current.imageUrl).toBe('https://example.com/avatar.jpg');
    expect(result.current.fullName).toBe('John Doe');
    expect(result.current.firstName).toBe('John');
    expect(result.current.lastName).toBe('Doe');
    expect(result.current.email).toBe('john.doe@example.com');
    expect(result.current.displayName).toBe('John Doe');
    expect(result.current.initials).toBe('JD');
  });

  it('should handle user with only firstName', () => {
    const mockUser = {
      imageUrl: null,
      fullName: null,
      firstName: 'John',
      lastName: null,
      primaryEmailAddress: null,
    };

    mockUseUser.mockReturnValue({
      user: mockUser,
      isLoaded: true,
    });

    const { result } = renderHook(() => useClerkUser());

    expect(result.current.displayName).toBe('John');
    expect(result.current.initials).toBe('J');
  });

  it('should handle user with no name data', () => {
    const mockUser = {
      imageUrl: null,
      fullName: null,
      firstName: null,
      lastName: null,
      primaryEmailAddress: null,
    };

    mockUseUser.mockReturnValue({
      user: mockUser,
      isLoaded: true,
    });

    const { result } = renderHook(() => useClerkUser());

    expect(result.current.displayName).toBe('User');
    expect(result.current.initials).toBe('U');
  });

  it('should handle user with complex full name', () => {
    const mockUser = {
      imageUrl: null,
      fullName: 'John Michael Doe Smith',
      firstName: 'John',
      lastName: 'Smith',
      primaryEmailAddress: null,
    };

    mockUseUser.mockReturnValue({
      user: mockUser,
      isLoaded: true,
    });

    const { result } = renderHook(() => useClerkUser());

    expect(result.current.displayName).toBe('John Michael Doe Smith');
    expect(result.current.initials).toBe('JMDS');
  });

  it('should handle loading state', () => {
    mockUseUser.mockReturnValue({
      user: null,
      isLoaded: false,
    });

    const { result } = renderHook(() => useClerkUser());

    expect(result.current.user).toBe(null);
    expect(result.current.isLoaded).toBe(false);
    expect(result.current.displayName).toBe('User');
    expect(result.current.initials).toBe('U');
  });

  it('should handle null user', () => {
    mockUseUser.mockReturnValue({
      user: null,
      isLoaded: true,
    });

    const { result } = renderHook(() => useClerkUser());

    expect(result.current.user).toBe(null);
    expect(result.current.isLoaded).toBe(true);
    expect(result.current.displayName).toBe('User');
    expect(result.current.initials).toBe('U');
  });
});
