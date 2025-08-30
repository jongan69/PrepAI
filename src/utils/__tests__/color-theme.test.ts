import { themes } from '../color-theme';

describe('color theme utilities', () => {
  describe('themes object', () => {
    it('should have light and dark themes', () => {
      expect(themes).toHaveProperty('light');
      expect(themes).toHaveProperty('dark');
    });

    it('should have all required CSS variables for light theme', () => {
      const lightTheme = themes.light;
      expect(lightTheme).toHaveProperty('--color-primary');
      expect(lightTheme).toHaveProperty('--color-invert');
      expect(lightTheme).toHaveProperty('--color-secondary');
      expect(lightTheme).toHaveProperty('--color-background');
      expect(lightTheme).toHaveProperty('--color-darker');
      expect(lightTheme).toHaveProperty('--color-text');
      expect(lightTheme).toHaveProperty('--color-highlight');
      expect(lightTheme).toHaveProperty('--color-border');
    });

    it('should have all required CSS variables for dark theme', () => {
      const darkTheme = themes.dark;
      expect(darkTheme).toHaveProperty('--color-primary');
      expect(darkTheme).toHaveProperty('--color-invert');
      expect(darkTheme).toHaveProperty('--color-secondary');
      expect(darkTheme).toHaveProperty('--color-background');
      expect(darkTheme).toHaveProperty('--color-darker');
      expect(darkTheme).toHaveProperty('--color-text');
      expect(darkTheme).toHaveProperty('--color-highlight');
      expect(darkTheme).toHaveProperty('--color-border');
    });

    it('should have correct light theme color values', () => {
      const lightTheme = themes.light;
      expect(lightTheme['--color-primary']).toBe('#000000');
      expect(lightTheme['--color-invert']).toBe('#ffffff');
      expect(lightTheme['--color-background']).toBe('#F4F4F5');
      expect(lightTheme['--color-text']).toBe('#000000');
      expect(lightTheme['--color-highlight']).toBe('#00A6F4');
    });

    it('should have correct dark theme color values', () => {
      const darkTheme = themes.dark;
      expect(darkTheme['--color-primary']).toBe('#ffffff');
      expect(darkTheme['--color-invert']).toBe('#000000');
      expect(darkTheme['--color-background']).toBe('#141414');
      expect(darkTheme['--color-text']).toBe('#ffffff');
      expect(darkTheme['--color-highlight']).toBe('#00A6F4');
    });

    it('should have contrasting colors between light and dark themes', () => {
      expect(themes.light['--color-primary']).not.toBe(themes.dark['--color-primary']);
      expect(themes.light['--color-background']).not.toBe(themes.dark['--color-background']);
      expect(themes.light['--color-text']).not.toBe(themes.dark['--color-text']);
    });
  });
});
