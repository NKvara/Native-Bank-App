import {useColorScheme, vars} from "nativewind";

export const colors = {
  light: {
    "--color-rebankPrimary": "#000000",
    "--color-rebankYellow": "#f8ca41",
    "--color-rebankPurple": "#9481b4",
    "--color-rebankGrey": "#c4c4c4",
    "--color-rebankDimGrey": "#e3e5e8",
    "--color-redError": "#E86B73",
    "--color-inputBackground": "#ffffff",
    "--color-rebankBackground": "#F2F2F2"
  },
  dark: {
    "--color-rebankPrimary": "#ffffff",
    "--color-rebankYellow": "#f8ca41",
    "--color-rebankPurple": "#9481b4",
    "--color-rebankGrey": "#717379",
    "--color-rebankDimGrey": "#32363E",
    "--color-redError": "#E86B73",
    "--color-inputBackground": "#000000",
    "--color-rebankBackground": "#16181C"
  }
};

export const colorPick = () => {
  const {colorScheme} = useColorScheme();
  return colors[colorScheme!];
};

export const themes = {
  light: vars(colors.light),
  dark: vars(colors.dark)
};
