import { useUser } from '@clerk/clerk-expo';

export function useClerkUser() {
  const { user, isLoaded } = useUser();

  return {
    user,
    isLoaded,
    // User profile data
    imageUrl: user?.imageUrl,
    fullName: user?.fullName,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.primaryEmailAddress?.emailAddress,
    // Helper to get display name
    displayName: user?.fullName || user?.firstName || 'User',
    // Helper to get initials for avatar fallback
    initials: user?.fullName
      ? user.fullName
          .split(' ')
          .map((part) => part[0].toUpperCase())
          .join('')
      : user?.firstName?.[0]?.toUpperCase() || 'U',
  };
}
