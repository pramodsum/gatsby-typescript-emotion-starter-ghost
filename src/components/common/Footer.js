import React from "react";
import styled from "@emotion/styled";

import { Box, Container, colors, Link } from "./core";
import Navigation from "./Navigation";

const FooterLink = styled.a`
  padding: 2px 5px;

  hover: {
    text-decoration: none;
    color: ${colors.base};
  }
`;

const Footer = ({ title, navigation }) => (
  <Box py="20px" pb="40px">
    <Container
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box className="site-foot-nav-left">
        <Link href="/">{title}</Link> © 2019 &mdash; Published with{" "}
        <FooterLink
          className="site-foot-nav-item"
          href="https://ghost.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ghost
        </FooterLink>
      </Box>
      <Box className="site-foot-nav-right">
        <Navigation data={navigation} navClass="site-foot-nav-item" />
      </Box>
    </Container>
  </Box>
);

export default Footer;
