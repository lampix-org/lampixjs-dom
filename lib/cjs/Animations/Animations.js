"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_kebabcase_1 = require("lodash.kebabcase");
var utils_1 = require("../utils");
var Animations = /** @class */ (function () {
    function Animations() {
        /**
         * rectangleSelection animation
         * @param  {Object} element      DOM Node
         * @param  {Object} [opts={}]    Allowed opts: borderWidth, borderColor, offset, (boolean) unselectAll
         * @return {Object}              DOM Node
         */
        this.rectangleSelection = function (element, opts) {
            var cssAnimClass = 'lx-anim-corners';
            var cssAnimClassContainer = cssAnimClass + "__container";
            var cssOptsList = ['borderWidth', 'borderColor', 'offset'];
            var defaultOpts = {
                borderWidth: 1,
                borderColor: '#000',
                offset: 1,
                unselectAll: true,
            };
            var cssOpts = {};
            opts = Object.assign(defaultOpts, opts);
            var cssOptsKeys = Object.keys(opts);
            cssOptsKeys
                .filter(function (prop) { return cssOptsList.includes(prop); })
                .forEach(function (prop) {
                switch (prop) {
                    case 'borderWidth':
                        cssOpts[prop] = opts[prop] + "px";
                        break;
                    default:
                        cssOpts[prop] = "" + opts[prop];
                        break;
                }
            });
            // unselect other rectangles
            if (opts.unselectAll === true) {
                var existingElements = document.getElementsByClassName(cssAnimClass);
                Array.from(existingElements).forEach(function (node) {
                    var containers = node.getElementsByClassName(cssAnimClassContainer);
                    Array.from(containers).forEach(function (child) {
                        node.removeChild(child);
                    });
                    node.classList.remove(cssAnimClass);
                });
            }
            if (!element.classList.contains(cssAnimClass)) {
                // add helper elements
                var animContainer = utils_1.createHtmlElement('div', { class: cssAnimClassContainer });
                var corner1CssOpts_1 = Object.assign({}, cssOpts);
                var corner2CssOpts_1 = Object.assign({}, cssOpts);
                var offset = Number.parseFloat("" + cssOpts.offset);
                // take into account border width
                offset += Number.parseFloat("" + cssOpts.borderWidth);
                delete corner1CssOpts_1.offset;
                corner1CssOpts_1.top = "-" + offset + "px";
                corner1CssOpts_1.left = "-" + offset + "px";
                delete corner2CssOpts_1.offset;
                corner2CssOpts_1.bottom = "-" + offset + "px";
                corner2CssOpts_1.right = "-" + offset + "px";
                var corner1Style = Object.keys(corner1CssOpts_1)
                    .map(function (key) { return lodash_kebabcase_1.default(key) + ": " + corner1CssOpts_1[key] + ";"; })
                    .join(' ');
                var corner2Style = Object.keys(corner2CssOpts_1)
                    .map(function (key) { return lodash_kebabcase_1.default(key) + ": " + corner2CssOpts_1[key] + ";"; })
                    .join(' ');
                var corner1 = utils_1.createHtmlElement('i', { style: corner1Style });
                var corner2 = utils_1.createHtmlElement('i', { style: corner2Style });
                animContainer.appendChild(corner1);
                animContainer.appendChild(corner2);
                element.classList.add(cssAnimClass);
                element.appendChild(animContainer);
            }
            return element;
        };
    }
    return Animations;
}());
exports.Animations = Animations;
