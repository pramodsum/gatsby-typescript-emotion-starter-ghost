import React from "react";
import styled from "@emotion/styled";

import { Box, Text } from "./core";

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 4rem;
  line-height: 1.3;
`;

const Banner = ({ title, description }) => (
  <Box maxWidth="80%" mx="auto" py="10vw" textAlign="center">
    <Title>{title}</Title>
    <Text mt="5px" p={0} fontSize="2.4rem" lineHeight="1.3" opacity={0.7}>
      {description}
    </Text>
  </Box>
);

export default Banner;
