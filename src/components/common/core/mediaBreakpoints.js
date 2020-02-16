import { find, sortBy } from "lodash";

/* this code is duplicated in `shared-fe`'s */
/* changes here should be reflected there */
/* additional context - https://github.com/opendoor-labs/code/pull/11068#discussion_r349428972 */

export const BREAKPOINTS_DICT = {
    XS: 480,
    SM: 768,
    MD: 992,
    LG: 1200,
    XL: 1600,
    XXL: 1920
};
export const BREAKPOINTS_SORTED_LIST = sortBy(
    Object.keys(BREAKPOINTS_DICT),
    key => -BREAKPOINTS_DICT[key]
);
export const getCurrentBreakpoint = () => {
    return find(
        BREAKPOINTS_SORTED_LIST,
        breakpoint =>
            window.matchMedia(`(min-width: ${BREAKPOINTS_DICT[breakpoint]}px)`)
                .matches
    );
};

export const media = {
    largerThan: {
        LG: `@media (min-width: ${BREAKPOINTS_DICT.LG + 1}px)`,
        MD: `@media (min-width: ${BREAKPOINTS_DICT.MD + 1}px)`,
        SM: `@media (min-width: ${BREAKPOINTS_DICT.SM + 1}px)`,
        XL: `@media (min-width: ${BREAKPOINTS_DICT.XL + 1}px)`,
        XS: `@media (min-width: ${BREAKPOINTS_DICT.XS + 1}px)`,
        XXL: `@media (min-width: ${BREAKPOINTS_DICT.XXL + 1}px)`
    },
    smallerThan: {
        LG: `@media (max-width: ${BREAKPOINTS_DICT.LG}px)`,
        MD: `@media (max-width: ${BREAKPOINTS_DICT.MD}px)`,
        SM: `@media (max-width: ${BREAKPOINTS_DICT.SM}px)`,
        XL: `@media (max-width: ${BREAKPOINTS_DICT.XL}px)`,
        XS: `@media (max-width: ${BREAKPOINTS_DICT.XS}px)`,
        XXL: `@media (max-width: ${BREAKPOINTS_DICT.XXL}px)`
    }
};
