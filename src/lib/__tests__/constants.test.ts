import { NAV_THEME } from '../constants';

describe('constants', () => {
  describe('NAV_THEME', () => {
    it('should have light and dark themes', () => {
      expect(NAV_THEME).toHaveProperty('light');
      expect(NAV_THEME).toHaveProperty('dark');
    });

    it('should have all required properties for light theme', () => {
      const lightTheme = NAV_THEME.light;
      expect(lightTheme).toHaveProperty('background');
      expect(lightTheme).toHaveProperty('border');
      expect(lightTheme).toHaveProperty('card');
      expect(lightTheme).toHaveProperty('notification');
      expect(lightTheme).toHaveProperty('primary');
      expect(lightTheme).toHaveProperty('text');
    });

    it('should have all required properties for dark theme', () => {
      const darkTheme = NAV_THEME.dark;
      expect(darkTheme).toHaveProperty('background');
      expect(darkTheme).toHaveProperty('border');
      expect(darkTheme).toHaveProperty('card');
      expect(darkTheme).toHaveProperty('notification');
      expect(darkTheme).toHaveProperty('primary');
      expect(darkTheme).toHaveProperty('text');
    });

    it('should have correct light theme values', () => {
      const lightTheme = NAV_THEME.light;
      expect(lightTheme.background).toBe('hsl(0 0% 100%)');
      expect(lightTheme.border).toBe('hsl(240 5.9% 90%)');
      expect(lightTheme.card).toBe('hsl(0 0% 100%)');
      expect(lightTheme.notification).toBe('hsl(0 84.2% 60.2%)');
      expect(lightTheme.primary).toBe('hsl(240 5.9% 10%)');
      expect(lightTheme.text).toBe('hsl(240 10% 3.9%)');
    });

    it('should have correct dark theme values', () => {
      const darkTheme = NAV_THEME.dark;
      expect(darkTheme.background).toBe('hsl(240 10% 3.9%)');
      expect(darkTheme.border).toBe('hsl(240 3.7% 15.9%)');
      expect(darkTheme.card).toBe('hsl(240 10% 3.9%)');
      expect(darkTheme.notification).toBe('hsl(0 72% 51%)');
      expect(darkTheme.primary).toBe('hsl(0 0% 98%)');
      expect(darkTheme.text).toBe('hsl(0 0% 98%)');
    });

    it('should have contrasting values between light and dark themes', () => {
      expect(NAV_THEME.light.background).not.toBe(NAV_THEME.dark.background);
      expect(NAV_THEME.light.text).not.toBe(NAV_THEME.dark.text);
      expect(NAV_THEME.light.primary).not.toBe(NAV_THEME.dark.primary);
    });
  });
});
