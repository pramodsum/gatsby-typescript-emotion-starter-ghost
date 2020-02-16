// NOTE: Inspired from Rebass
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import * as system from "styled-system";
import { pseudoStyle } from "./pseudoStyle";
import shouldForwardProp from "@styled-system/should-forward-prop";

import { media } from "./mediaBreakpoints";
import { colors, fontSizesNamed, fontWeights } from "./theme";
export * from "./mediaBreakpoints";
export * from "./theme";

const hover = pseudoStyle({
  alias: "hov",
  prop: "hover",
  pseudoclass: "hover"
});

export type BoxProps = system.AlignSelfProps &
  system.BackgroundProps &
  system.BordersProps &
  system.BottomProps &
  system.ColorProps &
  system.DisplayProps &
  system.FlexProps &
  system.FontSizeProps &
  system.HeightProps &
  system.LeftProps &
  system.MaxWidthProps &
  system.MinWidthProps &
  system.OpacityProps &
  system.OrderProps &
  system.OverflowProps &
  system.PositionProps &
  system.RightProps &
  system.SpaceProps &
  system.TextAlignProps &
  system.TopProps &
  system.VerticalAlignProps &
  system.WidthProps &
  system.ZIndexProps;

export const Box = styled<"div", { BoxProps }>("div", { shouldForwardProp })(
  {
    boxSizing: "border-box"
  },
  system.alignSelf,
  system.background,
  system.borders,
  system.bottom,
  system.color,
  system.display,
  system.flex,
  system.fontSize,
  system.height,
  hover,
  system.left,
  system.maxWidth,
  system.minWidth,
  system.order,
  system.overflow,
  system.position,
  system.right,
  system.space,
  system.textAlign,
  system.top,
  system.verticalAlign,
  system.width,
  system.zIndex
);

export type FlexProps = BoxProps &
  system.AlignItemsProps &
  system.FlexDirectionProps &
  system.FlexWrapProps &
  system.JustifyContentProps;
export const Flex = styled<typeof Box, FlexProps>(Box, { shouldForwardProp })(
  {
    display: "flex"
  },
  system.alignItems,
  system.flexDirection,
  system.display,
  system.flexWrap,
  system.justifyContent
);

export type TextProps = BoxProps &
  system.FontFamilyProps &
  system.FontWeightProps &
  system.LetterSpacingProps &
  system.LineHeightProps;
export const Text = styled<typeof Box, TextProps>(Box, { shouldForwardProp })(
  system.fontFamily,
  system.fontWeight,
  system.letterSpacing,
  system.lineHeight
);

export const Heading = styled<typeof Text, TextProps>(Text, {
  shouldForwardProp
})();

Heading.defaultProps = {
  fontSize: `${fontSizesNamed.heading}px`,
  fontWeight: fontWeights.bolder
};

export const Link = styled<typeof Box, TextProps>(Box, { shouldForwardProp })({
  cursor: "pointer"
});

Link.defaultProps = {
  as: "a",
  color: "primary"
};

export type ButtonProps = BoxProps &
  system.BorderColorProps &
  system.BorderRadiusProps &
  system.ButtonStyleProps &
  system.FontWeightProps;
export const Button = styled<typeof Box, ButtonProps>(Box, {
  shouldForwardProp
})(
  {
    appearance: "none",
    display: "inline-block",
    lineHeight: "inherit",
    textAlign: "center",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease"
  },
  system.borderColor,
  system.borderRadius,
  system.buttonStyle,
  system.fontWeight
);
Button.defaultProps = {
  as: "button",
  backgroundColor: "primary",
  border: 0,
  borderRadius: 4,
  color: "neutral",
  fontSize: "inherit",
  fontWeight: "bold",
  m: 0,
  px: 3,
  py: 2
};

export type ImageProps = BoxProps & system.BorderRadiusProps;
export const Image = styled<typeof Box, ImageProps>(Box, { shouldForwardProp })(
  {
    height: "auto",
    maxWidth: "100%"
  },
  system.borderRadius
);
Image.defaultProps = {
  as: "img",
  m: 0
};

const cards = system.variant({ key: "cards" });
export type CardProps = FlexProps &
  system.BackgroundImageProps &
  system.BackgroundPositionProps &
  system.BackgroundRepeatProps &
  system.BackgroundSizeProps &
  system.BorderColorProps &
  system.BorderRadiusProps &
  system.BoxShadowProps &
  system.OpacityProps;

export const Card = styled<typeof Flex, { CardProps }>(Flex, {
  shouldForwardProp
})(
  cards,
  system.backgroundImage,
  system.backgroundPosition,
  system.backgroundRepeat,
  system.backgroundSize,
  system.borderColor,
  system.borderRadius,
  system.boxShadow,
  system.opacity
);

export type TableProps = BoxProps;
export const Table = styled<typeof Box, TableProps>(Box, { shouldForwardProp })(
  {
    borderCollapse: "collapse",
    display: "table"
  }
);

export type TableRowProps = BoxProps &
  system.BorderColorProps &
  system.BorderRadiusProps;
export const TableRow = styled<typeof Box, TableRowProps>(Box, {
  shouldForwardProp
})(
  {
    display: "table-row"
  },
  system.borderColor,
  system.borderRadius
);

export type TableCellProps = TextProps & system.VerticalAlignProps;
export const TableCell = styled<typeof Text, TableCellProps>(Text, {
  shouldForwardProp
})(
  {
    display: "table-cell"
  },
  system.verticalAlign
);
TableCell.defaultProps = {
  textAlign: "center",
  verticalAlign: "middle"
};

export const UnorderedList = css`
  margin: 0;
  list-style: none;
  padding-left: 0;
`;

export const TextInput = css`
  appearance: none;
  font-size: ${fontSizesNamed.medium}px;

  ::-webkit-input-placeholder {
    color: ${colors.base};
  }

  :disabled::-webkit-input-placeholder {
    color: ${colors.secondary};
  }

  :focus {
    box-shadow: 0 0 3px ${colors.secondary};
  }

  ${media.smallerThan.XS} {
    font-size: ${fontSizesNamed.small}px;
  }
`;

export const FormElement = css`
  ${TextInput} :-webkit-autofill {
    background-color: ${colors.bg} !important;
  }

  :focus {
    border-color: ${colors.primary};
  }

  /* hide outline *during* click, but not after */
  :focus:active {
    outline: 0;
  }

  border: 1px solid ${colors.secondary};
  border-radius: 2px;
  box-sizing: border-box;
  padding: 10px 12px;

  ${media.smallerThan.XS} {
    font-size: ${fontSizesNamed.small}px;
  }
`;
