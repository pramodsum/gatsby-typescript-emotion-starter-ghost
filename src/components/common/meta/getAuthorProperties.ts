import _ from "lodash";
import { GhostAuthorProps } from "./AuthorMeta";

export const getAuthorProperties = (primaryAuthor: GhostAuthorProps) => {
  let authorProfiles = [];

  authorProfiles.push(
    primaryAuthor.website ? primaryAuthor.website : null,
    primaryAuthor.twitter
      ? `https://twitter.com/${primaryAuthor.twitter.replace(/^@/, ``)}/`
      : null,
    primaryAuthor.facebook
      ? `https://www.facebook.com/${primaryAuthor.facebook.replace(/^\//, ``)}/`
      : null
  );

  authorProfiles = _.compact(authorProfiles);

  return {
    name: primaryAuthor.name || null,
    sameAsArray: authorProfiles.length
      ? `["${_.join(authorProfiles, `", "`)}"]`
      : null,
    image: primaryAuthor.profile_image || null,
    facebookUrl: primaryAuthor.facebook
      ? `https://www.facebook.com/${primaryAuthor.facebook.replace(/^\//, ``)}/`
      : null
  };
};

export default getAuthorProperties;
