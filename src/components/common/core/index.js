// NOTE: Inspired from Rebass
import React from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { Link as GatsbyLink } from "gatsby";
import * as system from "styled-system";
import { pseudoStyle } from "./pseudoStyle";

import { media } from "./mediaBreakpoints";
import { colors, fontSizesNamed, fontWeights } from "./theme";

export { media } from "./mediaBreakpoints";
export { colors, fontSizesNamed, fontWeights } from "./theme";

const hover = pseudoStyle({
  alias: "hov",
  prop: "hover",
  pseudoclass: "hover"
});

const href = pseudoStyle({
  alias: "href",
  prop: "href",
  pseudoclass: "href"
});

export const Box = styled.div(
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

export const Flex = styled(Box)(
  {
    display: "flex"
  },
  system.alignItems,
  system.flexDirection,
  system.display,
  system.flexWrap,
  system.justifyContent
);

export const Container = styled(Flex)({
  display: "block",
  maxWidth: "1120px",
  margin: "0 auto",
  padding: "0 4vw"
});

export const Text = styled(Box)(
  system.fontFamily,
  system.fontWeight,
  system.letterSpacing,
  system.lineHeight
);

export const Heading = styled(Text)();

Heading.defaultProps = {
  fontSize: `${fontSizesNamed.heading}px`,
  fontWeight: fontWeights.bolder
};

const linkCss = css`
  padding: 5px 10px;
  border-radius: 0.6rem;
  margin-left: -10px;
  color: ${colors.secondary};

  hover: {
    text-decoration: none;
    color: ${colors.primary};
  }
`;

const LinkBase = styled(Text)(
  {
    cursor: "pointer"
  },
  href
);
export const Link = ({ href, children }) =>
  href.match(/^\s?http(s?)/gi) ? (
    <LinkBase
      css={linkCss}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </LinkBase>
  ) : (
    <GatsbyLink css={linkCss} to={href}>
      {children}
    </GatsbyLink>
  );

Link.defaultProps = {
  as: "a",
  color: "primary",
  href: ""
};

export const Button = styled(Box)(
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

export const Image = styled(Box)(
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
export const Card = styled(Flex)(
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

export const Table = styled(Box)({
  borderCollapse: "collapse",
  display: "table"
});

export const TableRow = styled(Box)(
  {
    display: "table-row"
  },
  system.borderColor,
  system.borderRadius
);

export const TableCell = styled(Text)(
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
    color: ${colors.darkGray};
  }

  :disabled::-webkit-input-placeholder {
    color: ${colors.lighterGray};
  }

  :focus {
    box-shadow: 0 0 3px ${colors.lightGray};
  }

  ${media.smallerThan.XS} {
    font-size: ${fontSizesNamed.small}px;
  }
`;

export const FormElement = css`
  ${TextInput} :-webkit-autofill {
    background-color: ${colors.neutral} !important;
  }

  :focus {
    border-color: ${colors.primary};
  }

  /* hide outline *during* click, but not after */
  :focus:active {
    outline: 0;
  }

  border: 1px solid ${colors.lighterGray};
  border-radius: 2px;
  box-sizing: border-box;
  padding: 10px 12px;

  ${media.smallerThan.XS} {
    font-size: ${fontSizesNamed.small}px;
  }
`;
