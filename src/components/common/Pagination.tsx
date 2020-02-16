import React from "react";
import { Link } from "gatsby";

export interface PageContext {
  previousPagePath?: string;
  nextPagePath?: string;
  humanPageNumber: number;
  numberOfPages: number;
}

const Pagination: React.FC<{ pageContext: PageContext }> = ({
  pageContext
}) => {
  const {
    previousPagePath,
    nextPagePath,
    humanPageNumber,
    numberOfPages
  } = pageContext;

  return (
    <nav className="pagination" role="navigation">
      <div>
        {previousPagePath && (
          <Link to={previousPagePath} rel="prev">
            Previous
          </Link>
        )}
      </div>
      {numberOfPages > 1 && (
        <div className="pagination-location">
          Page {humanPageNumber} of {numberOfPages}
        </div>
      )}
      <div>
        {nextPagePath && (
          <Link to={nextPagePath} rel="next">
            Next
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
