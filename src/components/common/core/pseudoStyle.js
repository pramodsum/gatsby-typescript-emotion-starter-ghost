import PropTypes from "prop-types";

/**
 * Reimplement hover/active/focus through pseudoStyle since it was removed in styled-system v3
 * https://github.com/jxnblk/styled-system/blob/v2.3.6/src/util.js
 */

const num = n => typeof n === "number" && !isNaN(n);
const px = n => (num(n) ? n + "px" : n);

const get = (obj, path, fallback) =>
    path.split(".").reduce((a, b) => (a && a[b] ? a[b] : null), obj) ||
    fallback;

const getValue = (val, getter, toPx) =>
    typeof getter === "function" ? getter(val) : toPx ? px(val) : val;

const cloneFunc = fn => (...args) => fn(...args);

export const pseudoStyle = ({
    prop,
    alias,
    pseudoclass,
    keys = {},
    getters = {},
    numberToPx = {}
}) => {
    const fn = props => {
        const style = props[prop] || props[alias];
        pseudoclass = pseudoclass || prop;
        const th = props.theme;
        for (const key in style) {
            if (!style.hasOwnProperty(key)) {
                continue;
            }
            const toPx = numberToPx[key];
            if (!keys[key] && !getters[key] && !toPx) {
                continue;
            }
            const themeKey = [keys[key], style[key]].join(".");
            style[key] = getValue(
                get(th, themeKey, style[key]),
                getters[key],
                toPx
            );
        }

        return {
            ["&:" + pseudoclass]: style
        };
    };
    fn.propTypes = {
        [prop]: cloneFunc(PropTypes.object)
    };

    return fn;
};
