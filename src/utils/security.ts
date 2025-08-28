import { useDatabase } from '@/contexts/DatabaseProvider';

/**
 * Security utility functions for user authentication and authorization
 */

export interface SecurityContext {
  userId: string | null;
  isAuthenticated: boolean;
}

/**
 * Validates that a user is authenticated and authorized to access data
 * @param context - The security context containing user information
 * @param targetUserId - The user ID being accessed
 * @param operation - The operation being performed (read, write, delete)
 * @returns true if authorized, throws error if not
 */
export function validateUserAccess(
  context: SecurityContext,
  targetUserId: string,
  operation: 'read' | 'write' | 'delete' = 'read'
): boolean {
  if (!context.isAuthenticated || !context.userId) {
    throw new Error(`Unauthorized: User not authenticated for ${operation} operation`);
  }

  if (context.userId !== targetUserId) {
    throw new Error(`Unauthorized: User ${context.userId} cannot ${operation} data for user ${targetUserId}`);
  }

  return true;
}

/**
 * Validates that a user owns a specific record
 * @param context - The security context containing user information
 * @param recordUserId - The user ID that owns the record
 * @param operation - The operation being performed
 * @returns true if authorized, throws error if not
 */
export function validateRecordOwnership(
  context: SecurityContext,
  recordUserId: string,
  operation: 'read' | 'write' | 'delete' = 'read'
): boolean {
  return validateUserAccess(context, recordUserId, operation);
}

/**
 * Hook to get the current security context
 * @returns SecurityContext with user authentication status
 */
export function useSecurityContext(): SecurityContext {
  const { userId } = useDatabase();

  return {
    userId,
    isAuthenticated: !!userId,
  };
}

/**
 * Validates user access for API requests
 * @param request - The incoming request
 * @returns The authenticated user ID
 */
export async function validateApiRequest(request: Request): Promise<string> {
  const userId = request.headers.get('x-user-id');

  if (!userId) {
    throw new Error('Unauthorized: Missing user ID in request headers');
  }

  return userId;
}

/**
 * Validates that a user can access specific data
 * @param authenticatedUserId - The authenticated user's ID
 * @param dataUserId - The user ID associated with the data
 * @param operation - The operation being performed
 * @returns true if authorized, throws error if not
 */
export function validateDataAccess(
  authenticatedUserId: string,
  dataUserId: string,
  operation: 'read' | 'write' | 'delete' = 'read'
): boolean {
  if (authenticatedUserId !== dataUserId) {
    throw new Error(`Unauthorized: User ${authenticatedUserId} cannot ${operation} data for user ${dataUserId}`);
  }

  return true;
}

/**
 * Sanitizes user input to prevent injection attacks
 * @param input - The user input to sanitize
 * @returns Sanitized input
 */
export function sanitizeInput(input: string): string {
  // Remove potentially dangerous characters
  return input.replace(/[<>\"'&]/g, '');
}

/**
 * Validates that a user ID is in the correct format
 * @param userId - The user ID to validate
 * @returns true if valid, throws error if not
 */
export function validateUserId(userId: string): boolean {
  if (!userId || typeof userId !== 'string' || userId.length === 0) {
    throw new Error('Invalid user ID format');
  }

  // Add additional validation as needed (e.g., UUID format, etc.)
  return true;
}
