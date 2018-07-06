"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_kebabcase_1 = require("lodash.kebabcase");
var styles_1 = require("../styles");
exports.loadStyles = function () {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles_1.default;
    document.head.appendChild(style);
};
// converts a css style object to string
exports.styleToString = function (style) {
    // convert to string
    return Object.keys(style)
        .map(function (key) { return lodash_kebabcase_1.default(key) + ":" + style[key] + ";"; })
        .join('');
};
exports.createHtmlElement = function (tagName, opts) {
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
