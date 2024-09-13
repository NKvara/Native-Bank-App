import { useColorScheme, vars } from 'nativewind';

export const colors = {
  light: {
    '--color-pashaPrimary': '#000000',
    '--color-pashaYellow': '#f8ca41',
    '--color-pashaPurple': '#9481b4',
    '--color-pashaBrightPurple': '#a488f7',
    '--color-pashaGrey': '#c4c4c4',
    '--color-pashaDimGrey': '#e3e5e8',
    '--color-pashaBgGrey': '#ebebeb',
    '--color-redError': '#E86B73',
    '--color-inputBackground': '#ffffff',
    '--color-pashaBackground': '#F2F2F2',
  },
  dark: {
    '--color-pashaPrimary': '#ffffff',
    '--color-pashaYellow': '#f8ca41',
    '--color-pashaPurple': '#9481b4',
    '--color-pashaBrightPurple': '#8667d6',
    '--color-pashaGrey': '#8d8e94',
    '--color-pashaDimGrey': '#32363E',
    '--color-pashaBgGrey': '#141519',
    '--color-redError': '#E86B73',
    '--color-inputBackground': '#000000',
    '--color-pashaBackground': '#08090a',
  },
};

export const ColorPick = () => {
  const { colorScheme } = useColorScheme();
  return colors[colorScheme!];
};

export const themes = {
  light: vars(colors.light),
  dark: vars(colors.dark),
};
