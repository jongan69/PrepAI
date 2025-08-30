import { cn } from '../utils';

describe('lib utils', () => {
  describe('cn function', () => {
    it('should merge class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('should handle conditional classes', () => {
      expect(cn('base', true && 'conditional', false && 'hidden')).toBe('base conditional');
    });

    it('should handle arrays of classes', () => {
      expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3');
    });

    it('should handle objects with boolean values', () => {
      expect(cn('base', { active: true, disabled: false })).toBe('base active');
    });

    it('should handle empty strings and falsy values', () => {
      expect(cn('base', '', null, undefined, false)).toBe('base');
    });

    it('should handle Tailwind classes that need merging', () => {
      expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
    });

    it('should handle complex combinations', () => {
      expect(
        cn('base-class', ['array-class1', 'array-class2'], { 'object-class': true, hidden: false }, 'string-class')
      ).toBe('base-class array-class1 array-class2 object-class string-class');
    });
  });
});
