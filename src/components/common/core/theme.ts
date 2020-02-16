// NOTE: For reference, use https://styled-system.com/theme-specification

import { Theme } from "styled-system";
import { BREAKPOINTS_DICT } from "./mediaBreakpoints";
import { ColorScheme } from "./ColorScheme";

export const breakpoints = [
  BREAKPOINTS_DICT.XS,
  BREAKPOINTS_DICT.SM,
  BREAKPOINTS_DICT.MD,
  BREAKPOINTS_DICT.LG,
  BREAKPOINTS_DICT.XL
];

// tslint:disable: object-literal-sort-keys
export const colors: ColorScheme = {
  primary: "#3eb0ef",
  base: "#15171a",
  secondary: "#5b7a81",
  border: "#c7d5d8",
  bg: "#f5f5f5",
  white: "#ffffff",
  success: "#68e1c7",
  error: "#ff7f82",
  warning: "#ffc259",
  purple: "#ab80de",
  green: "#68e1c7",
  red: "#ff7f82",
  yellow: "#ffc259",
  orange: "#ec7046"
};

export const fonts = {
  mono: "Noto-Mono, monospace",
  sans: "Graphik, system-ui, sans-serif",
  serif: "Publico, serif"
};

export const fontSizes = [
  10, // 0
  12, // 1
  14, // 2
  16, // 3
  18, // 4
  22, // 5
  24, // 6
  32, // 7
  48, // 8
  64 // 9
];

export const fontSizesNamed = {
  "x-small": fontSizes[0],
  small: fontSizes[1],

  // duplicate names
  body: fontSizes[2],
  productMedium: fontSizes[2],
  "sub-heading": fontSizes[2],

  // duplicate names
  medium: fontSizes[3],
  heading: fontSizes[3],

  large: fontSizes[5],
  "x-large": fontSizes[6],
  "xx-large": fontSizes[7],
  "xxx-large": fontSizes[8]
};

// add named keys as scale aliases as described in link below
// ref - https://styled-system.com/theme-specification/#scale-aliases
Object.keys(fontSizesNamed).forEach(
  key => (fontSizes[key] = fontSizesNamed[key])
);

export const fontWeights = {
  lighter: 300,
  normal: 400,
  bold: 500,
  bolder: 600
};

export const lineHeights = {
  header: 1.45,
  body: 1.7,
  bodyTighter: 1.45,
  mobileHeader: 1.35,
  mobileBody: 1.6
};

export const shadows = {
  large: "0 0 24px rgba(0, 0, 0, .125)",
  medium: "0 3px 15px 2px rgba(0, 0, 0, 0.1)",
  small: "0 1px 3px 1px rgb(0, 0, 0, 0.1)",
  none: "none"
};

// NOTE: This is only meant for "spacing" (i.e. margin + padding)
export const space = [
  0, // 0
  2, // 1
  4, // 2
  8, // 3
  12, // 4
  16, // 5
  20, // 6
  24, // 7
  32, // 8
  40, // 9
  48, // 10
  64, // 11
  128 // 12
];

export const spacesNamed = {
  xxs: space[2],
  xs: space[3],
  s: space[4],
  m: space[5],
  l: space[6],
  xl: space[7]
};

// This is so hacky. I am sorry.
Object.keys(spacesNamed).forEach(key => (space[key] = spacesNamed[key]));

const theme: Theme = {
  breakpoints,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  shadows,
  space
};

export interface ITheme {
  breakpoints: Array<number>;
  colors: ColorScheme;
  fonts: {
    mono: string;
    sans: string;
    serif: string;
  };
  fontSizes: Array<number>;
  fontWeights: {
    lighter: number;
    normal: number;
    bold: number;
    bolder: number;
  };
  lineHeights: {
    header: number;
    body: number;
    bodyTighter: number;
    mobileHeader: number;
    mobileBody: number;
  };
  shadows: {
    large: string;
    medium: string;
    small: string;
    none: string;
  };
  space: Array<number>;
}

export default theme;
