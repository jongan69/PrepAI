import { formatToYYYYMMDD } from '../date';

describe('date utilities', () => {
  describe('formatToYYYYMMDD', () => {
    it('should format date correctly for single digit month and day', () => {
      const date = new Date('2024-01-05');
      expect(formatToYYYYMMDD(date)).toBe('2024-01-05');
    });

    it('should format date correctly for double digit month and day', () => {
      const date = new Date('2024-12-25');
      expect(formatToYYYYMMDD(date)).toBe('2024-12-25');
    });

    it('should handle leap year dates', () => {
      const date = new Date('2024-02-29');
      expect(formatToYYYYMMDD(date)).toBe('2024-02-29');
    });

    it('should handle end of year dates', () => {
      const date = new Date('2024-12-31');
      expect(formatToYYYYMMDD(date)).toBe('2024-12-31');
    });

    it('should handle beginning of year dates', () => {
      const date = new Date('2024-01-01');
      expect(formatToYYYYMMDD(date)).toBe('2024-01-01');
    });
  });
});
