import { formatToYYYYMMDD } from '../date';

describe('date utilities', () => {
  describe('formatToYYYYMMDD', () => {
    it('should format date correctly for single digit month and day', () => {
      const date = new Date(2024, 0, 5); // January 5, 2024 (month is 0-indexed)
      expect(formatToYYYYMMDD(date)).toBe('2024-01-05');
    });

    it('should format date correctly for double digit month and day', () => {
      const date = new Date(2024, 11, 25); // December 25, 2024
      expect(formatToYYYYMMDD(date)).toBe('2024-12-25');
    });

    it('should handle leap year dates', () => {
      const date = new Date(2024, 1, 29); // February 29, 2024
      expect(formatToYYYYMMDD(date)).toBe('2024-02-29');
    });

    it('should handle end of year dates', () => {
      const date = new Date(2024, 11, 31); // December 31, 2024
      expect(formatToYYYYMMDD(date)).toBe('2024-12-31');
    });

    it('should handle beginning of year dates', () => {
      const date = new Date(2024, 0, 1); // January 1, 2024
      expect(formatToYYYYMMDD(date)).toBe('2024-01-01');
    });
  });
});
