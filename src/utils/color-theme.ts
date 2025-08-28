import { vars } from 'nativewind';

export const themes = {
  light: vars({
    '--color-primary': '#000000',
    '--color-invert': '#ffffff', // black
    '--color-secondary': '#ffffff', // gray-500
    '--color-background': '#F4F4F5',
    '--color-darker': '#F4F4F5', // white
    '--color-text': '#000000',
    '--color-highlight': '#00A6F4', // black text
    '--color-border': 'rgba(0, 0, 0, 0.1)',
  }),
  dark: vars({
    '--color-primary': '#ffffff', // white
    '--color-invert': '#000000', // black
    '--color-secondary': '#1F1E1F', // gray-400
    '--color-background': '#141414',
    '--color-darker': '#000000', // black
    '--color-text': '#ffffff',
    '--color-highlight': '#00A6F4', // white text
    '--color-border': 'rgba(255, 255, 255, 0.1)',
  }),
};
