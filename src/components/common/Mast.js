import React from "react";
import styled from "@emotion/styled";

import config from "../../utils/siteConfig";
import { Flex, colors } from "./core";

const MastItem = styled.a`
  display: inline-block;
  padding: 5px 10px;
  color: ${colors.white};
  opacity: 0.7;

  hover: {
    text-decoration: none;
    opacity: 1;
  }
`;

const MastIcon = styled.img`
  height: 15px;
  margin: -5px 0 0;
`;

const Mast = ({ site }) => {
  const twitterUrl = site.twitter
    ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}`
    : null;
  const facebookUrl = site.facebook
    ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}`
    : null;

  return (
    <Flex alignItems="center">
      {site.twitter && (
        <MastItem href={twitterUrl} target="_blank" rel="noopener noreferrer">
          <MastIcon src="/images/icons/twitter.svg" alt="Twitter" />
        </MastItem>
      )}
      {site.facebook && (
        <MastItem href={facebookUrl} target="_blank" rel="noopener noreferrer">
          <MastIcon src="/images/icons/facebook.svg" alt="Facebook" />
        </MastItem>
      )}
      <MastItem
        href={`https://feedly.com/i/subscription/feed/${config.siteUrl}/rss/`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MastIcon src="/images/icons/rss.svg" alt="RSS Feed" />
      </MastItem>
    </Flex>
  );
};

export default Mast;
