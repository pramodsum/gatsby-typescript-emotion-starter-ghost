import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";

import { Layout } from "../components/common";
import { MetaData } from "../components/common/meta";
import { GhostPageProps } from "../components/common/meta/WebsiteMeta";

interface PageProps {
  data: {
    ghostPage: GhostPageProps;
  };
  location: Location;
}

/**
 * Single page (/:slug)
 *
 * This file renders a single page and loads all the content.
 *
 */
const Page: React.FC<PageProps> = ({ data, location }) => {
  const page = data.ghostPage;

  return (
    <>
      <MetaData data={data} location={location} type="website" />
      <Helmet>
        <style type="text/css">{`${page.codeinjection_styles}`}</style>
      </Helmet>
      <Layout>
        <div className="container">
          <article className="content">
            <h1 className="content-title">{page.title}</h1>

            {/* The main page content */}
            <section
              className="content-body load-external-scripts"
              dangerouslySetInnerHTML={{ __html: page.html }}
            />
          </article>
        </div>
      </Layout>
    </>
  );
};

export default Page;

export const postQuery = graphql`
  query($slug: String!) {
    ghostPage(slug: { eq: $slug }) {
      ...GhostPageFields
    }
  }
`;
