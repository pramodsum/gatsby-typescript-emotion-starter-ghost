import React from "react";
import Helmet from "react-helmet";
import _ from "lodash";
import { StaticQuery, graphql } from "gatsby";
import url from "url";

import ImageMeta from "./ImageMeta";
import config from "../../../utils/siteConfig";
import { SiteProps, AllGhostSettings } from "./MetaData";

export interface GhostPageProps {
  title?: string;
  meta_title?: string;
  meta_description?: string;
  name?: string;
  feature_image?: string;
  description?: string;
  bio?: string;
  profile_image?: string;
  codeinjection_styles: string;
  html?: string;
}

interface WebsiteMetaProps {
  data: GhostPageProps;
  settings: SiteProps & {
    allGhostSettings: AllGhostSettings;
  };
  canonical: string;
  title?: string;
  description?: string;
  image?: string;
  type: "Website" | "Series";
}

const WebsiteMeta: React.FC<WebsiteMetaProps> = ({
  data,
  settings,
  canonical,
  title,
  description,
  image,
  type
}) => {
  const site = settings.allGhostSettings.edges[0].node;

  const publisherLogo = url.resolve(
    config.siteUrl,
    site.logo || config.siteIcon
  );
  let shareImage =
    image || data.feature_image || _.get(settings, `cover_image`, null);

  shareImage = shareImage ? url.resolve(config.siteUrl, shareImage) : null;

  description =
    description ||
    data.meta_description ||
    data.description ||
    config.siteDescriptionMeta ||
    site.description;
  title = `${title || data.meta_title || data.name || data.title} - ${
    site.title
  }`;

  const jsonLd = {
    "@context": `https://schema.org/`,
    "@type": type,
    url: canonical,
    image: shareImage
      ? {
          "@type": `ImageObject`,
          url: shareImage,
          width: config.shareImageWidth,
          height: config.shareImageHeight
        }
      : undefined,
    publisher: {
      "@type": `Organization`,
      name: site.title,
      logo: {
        "@type": `ImageObject`,
        url: publisherLogo,
        width: 60,
        height: 60
      }
    },
    mainEntityOfPage: {
      "@type": `WebPage`,
      "@id": config.siteUrl
    },
    description
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:site_name" content={site.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={canonical} />
        {site.twitter && (
          <meta
            name="twitter:site"
            content={`https://twitter.com/${site.twitter.replace(/^@/, ``)}/`}
          />
        )}
        {site.twitter && <meta name="twitter:creator" content={site.twitter} />}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd, undefined, 4)}
        </script>
      </Helmet>
      <ImageMeta image={shareImage} />
    </>
  );
};

const WebsiteMetaQuery = props => (
  <StaticQuery
    query={graphql`
      query GhostSettingsWebsiteMeta {
        allGhostSettings {
          edges {
            node {
              ...GhostSettingsFields
            }
          }
        }
      }
    `}
    render={data => <WebsiteMeta settings={data} {...props} />}
  />
);

export default WebsiteMetaQuery;
