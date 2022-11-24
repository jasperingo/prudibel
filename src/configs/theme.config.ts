import { Theme, DefaultTheme } from '@react-navigation/native';
import { colorConfig } from './color.config';

export const themeConfig: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colorConfig.colorPrimary,
    card: colorConfig.colorPrimary,
    background: colorConfig.colorBackground,
    text: colorConfig.colorOnSurface
  }
};
