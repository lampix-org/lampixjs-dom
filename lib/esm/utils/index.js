import kebabCase from 'lodash.kebabcase';
import styles from '../styles';
export var loadStyles = function () {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles;
    document.head.appendChild(style);
};
// converts a css style object to string
export var styleToString = function (style) {
    // convert to string
    return Object.keys(style)
        .map(function (key) { return kebabCase(key) + ":" + style[key] + ";"; })
        .join('');
};
export var createHtmlElement = function (tagName, opts) {
    var element = document.createElement(tagName);
    var defaultOpts = {
        html: ''
    };
    opts = Object.assign(defaultOpts, typeof opts === 'object' ? opts : {});
    // set attributes
    Object.keys(opts).filter(function (prop) { return prop !== 'html'; }).forEach(function (prop) {
        element.setAttribute(prop, opts[prop]);
    });
    element.innerHTML = opts.html;
    return element;
};
