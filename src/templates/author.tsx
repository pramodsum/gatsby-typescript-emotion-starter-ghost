import React from "react";
import { graphql } from "gatsby";

import { Layout, PostCard, Pagination } from "../components/common";
import { MetaData } from "../components/common/meta";
import { GhostAuthorProps } from "../components/common/meta/AuthorMeta";
import { GhostPostProps } from "../components/common/meta/ArticleMeta";
import { PageContext } from "../components/common/Pagination";

interface AuthorPageProps {
  data: {
    ghostAuthor: GhostAuthorProps;
    allGhostPost: {
      edges: Array<{ node: GhostPostProps }>;
    };
  };
  location: Location;
  pageContext: PageContext;
}

/**
 * Author page (/author/:slug)
 *
 * Loads all posts for the requested author incl. pagination.
 *
 */
const Author: React.FC<AuthorPageProps> = ({ data, location, pageContext }) => {
  const author = data.ghostAuthor;
  const posts = data.allGhostPost.edges;
  const twitterUrl = author.twitter
    ? `https://twitter.com/${author.twitter.replace(/^@/, ``)}`
    : null;
  const facebookUrl = author.facebook
    ? `https://www.facebook.com/${author.facebook.replace(/^\//, ``)}`
    : null;

  return (
    <>
      <MetaData data={data} location={location} type="profile" />
      <Layout>
        <div className="container">
          <header className="author-header">
            <div className="author-header-content">
              <h1>{author.name}</h1>
              {author.bio && <p>{author.bio}</p>}
              <div className="author-header-meta">
                {author.website && (
                  <a
                    className="author-header-item"
                    href={author.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website
                  </a>
                )}
                {twitterUrl && (
                  <a
                    className="author-header-item"
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                )}
                {facebookUrl && (
                  <a
                    className="author-header-item"
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                )}
              </div>
            </div>
            <div className="author-header-image">
              {author.profile_image && (
                <img src={author.profile_image} alt={author.name} />
              )}
            </div>
          </header>
          <section className="post-feed">
            {posts.map(({ node }) => (
              // The tag below includes the markup for each post - components/common/PostCard.js
              <PostCard key={node.id} post={node} />
            ))}
          </section>
          <Pagination pageContext={pageContext} />
        </div>
      </Layout>
    </>
  );
};

export default Author;

export const pageQuery = graphql`
  query GhostAuthorQuery($slug: String!, $limit: Int!, $skip: Int!) {
    ghostAuthor(slug: { eq: $slug }) {
      ...GhostAuthorFields
    }
    allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      filter: { authors: { elemMatch: { slug: { eq: $slug } } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`;
