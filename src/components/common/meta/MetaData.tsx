import React from "react";
import { StaticQuery, graphql } from "gatsby";
import url from "url";

import config from "../../../utils/siteConfig";
import ArticleMeta, { GhostPostProps, GhostTagProps } from "./ArticleMeta";
import WebsiteMeta, { GhostPageProps } from "./WebsiteMeta";
import AuthorMeta, { GhostAuthorProps } from "./AuthorMeta";
import { NavItem } from "../Navigation";

export interface SiteProps {
  title: string;
  lang: string;
  description: string;
  cover_image?: string;
  codeinjection_styles: string;
  navigation: Array<NavItem>;
  logo?: string;
  twitter?: string;
  facebook?: string;
}

export interface AllGhostSettings {
  edges: Array<{ node: SiteProps }>;
}

interface MetaDataProps {
  data: {
    ghostPost?: GhostPostProps;
    ghostTag?: GhostTagProps;
    ghostAuthor?: GhostAuthorProps;
    ghostPage?: GhostPageProps;
  };
  settings: SiteProps & {
    allGhostSettings: AllGhostSettings;
  };
  title?: string;
  description?: string;
  image?: string;
  location?: Location;
}

/**
 * MetaData will generate all relevant meta data information incl.
 * JSON-LD (schema.org), Open Graph (Facebook) and Twitter properties.
 *
 */
const MetaData: React.FC<MetaDataProps> = ({
  data,
  settings,
  title,
  description,
  image,
  location
}) => {
  const canonical = url.resolve(config.siteUrl, location.pathname);
  const { ghostPost, ghostTag, ghostAuthor, ghostPage } = data;
  const site = settings.allGhostSettings.edges[0].node;

  if (ghostPost) {
    return <ArticleMeta data={ghostPost} canonical={canonical} />;
  } else if (ghostTag) {
    return <WebsiteMeta data={ghostTag} canonical={canonical} type="Series" />;
  } else if (ghostAuthor) {
    return <AuthorMeta data={ghostAuthor} canonical={canonical} />;
  } else if (ghostPage) {
    return (
      <WebsiteMeta data={ghostPage} canonical={canonical} type="WebSite" />
    );
  } else {
    title = title || config.siteTitleMeta || site.title;
    description = description || config.siteDescriptionMeta || site.description;
    image = image || site.cover_image || null;

    image = image ? url.resolve(config.siteUrl, image) : null;

    return (
      <WebsiteMeta
        data={{}}
        canonical={canonical}
        title={title}
        description={description}
        image={image}
        type="WebSite"
      />
    );
  }
};

const MetaDataQuery = props => (
  <StaticQuery
    query={graphql`
      query GhostSettingsMetaData {
        allGhostSettings {
          edges {
            node {
              title
              description
            }
          }
        }
      }
    `}
    render={data => <MetaData settings={data} {...props} />}
  />
);

export default MetaDataQuery;
