import React from "react";

// import Img from "gatsby-image";
import styled from "@emotion/styled";

// Styles
import "../../styles/app.css";
import { Flex, Box, Link } from "./core";

import Mast from "./Mast";
import Banner from "./Banner";
import Navigation from "./Navigation";
import { fonts } from "./core/theme";
import { DataProps } from "./Layout";

const Logo = styled.img`
  height: 25px;
`;

const Header: React.FC<{ data: DataProps; isHome: boolean }> = ({
  data,
  isHome
}) => {
  const site = data.allGhostSettings.edges[0].node;

  return (
    <Box py="20px">
      <Flex alignItems="center" justifyContent="space-between">
        <Box fontFamily={fonts.serif}>
          <Link href="/">
            {site.logo && <Logo src={site.logo} alt={site.title} />}
          </Link>
        </Box>
        <Mast site={site} />
      </Flex>
      {isHome ? (
        <Banner title={site.title} description={site.description} />
      ) : null}
      <Navigation data={site.navigation} />
    </Box>
  );
};
export default Header;
