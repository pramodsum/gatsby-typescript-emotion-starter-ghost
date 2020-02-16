import React from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

// Styles
import "../../styles/app.css";
import { Box, Flex } from "./core";

import Header from "./Header";
import Footer from "./Footer";
import { AllGhostSettings, SiteProps } from "./meta/MetaData";

export interface DataProps {
  file: object;
  allGhostSettings: AllGhostSettings;
}

interface LayoutProps {
  bodyClass?: string;
  isHome?: boolean;
  data?: DataProps;
}

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout: React.FC<LayoutProps> = ({
  data,
  children,
  bodyClass,
  isHome
}) => {
  const site: SiteProps = data.allGhostSettings.edges[0].node;

  return (
    <>
      <Helmet>
        <html lang={site.lang} />
        <style type="text/css">{`${site.codeinjection_styles}`}</style>
        <body className={bodyClass} />
      </Helmet>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        minHeight="100vh"
      >
        <Box>
          {/* The main header section on top of the screen */}
          <Header data={data} isHome={isHome} />
          <Box py="4vw">
            {/* All the main content gets inserted here, index.js, post.js */}
            {children}
          </Box>
        </Box>

        <Box>
          {/* The footer at the very bottom of the screen */}
          <Footer title={site.title} navigation={site.navigation} />
        </Box>
      </Flex>
    </>
  );
};

const DefaultLayoutSettingsQuery: React.FC<LayoutProps> = props => (
  <StaticQuery
    query={graphql`
      query GhostSettings {
        allGhostSettings {
          edges {
            node {
              ...GhostSettingsFields
            }
          }
        }
        file(relativePath: { eq: "ghost-icon.png" }) {
          childImageSharp {
            fixed(width: 30, height: 30) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => <DefaultLayout data={data} {...props} />}
  />
);

export default DefaultLayoutSettingsQuery;
