import React from "react";
import Helmet from "react-helmet";
import _ from "lodash";
import { StaticQuery, graphql } from "gatsby";

import ImageMeta from "./ImageMeta";
import getAuthorProperties from "./getAuthorProperties";
import config from "../../../utils/siteConfig";
import { AllGhostSettings, SiteProps } from "./MetaData";

export interface GhostAuthorProps {
  name: string;
  bio?: string;
  profile_image?: string;
  website?: string;
  twitter?: string;
  facebook?: string;
}

interface AuthorMetaProps {
  data: GhostAuthorProps;
  settings: SiteProps & {
    allGhostSettings: AllGhostSettings;
  };
  canonical: string;
}

const AuthorMeta: React.FC<AuthorMetaProps> = ({
  data,
  settings,
  canonical
}) => {
  const site = settings.allGhostSettings.edges[0].node;
  const author = getAuthorProperties(data);
  const shareImage = author.image || _.get(site, `cover_image`, null);
  const title = `${data.name} - ${site.title}`;
  const description =
    data.bio || config.siteDescriptionMeta || site.description;

  const jsonLd = {
    "@context": `https://schema.org/`,
    "@type": `Person`,
    name: data.name,
    sameAs: author.sameAsArray ? author.sameAsArray : undefined,
    url: canonical,
    image: shareImage
      ? {
          "@type": `ImageObject`,
          url: shareImage,
          width: config.shareImageWidth,
          height: config.shareImageHeight
        }
      : undefined,
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
        <meta property="og:type" content="profile" />
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

const AuthorMetaQuery = props => (
  <StaticQuery
    query={graphql`
      query GhostSettingsAuthorMeta {
        allGhostSettings {
          edges {
            node {
              ...GhostSettingsFields
            }
          }
        }
      }
    `}
    render={data => <AuthorMeta settings={data} {...props} />}
  />
);

export default AuthorMetaQuery;
