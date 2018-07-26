"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var invariant_1 = require("invariant");
var utils_1 = require("../utils");
var defaults_1 = require("./defaults");
var Buttons = /** @class */ (function () {
    function Buttons() {
        this.generate = function (x, y, callback, opts) {
            var btnCssClass = 'lx-button';
            var allowedLabelPosition = ['bottom', 'left', 'top', 'right'];
            var defaultLabelPosition = 'bottom';
            // the following properties cannot be overriden
            opts = Object.assign({}, defaults_1.default, opts, {
                radius: 13 // half the size of the button
            });
            // validate params
            invariant_1.default(Number.isFinite(x) || Number.isFinite(y), 'Invalid coordinates.');
            invariant_1.default(typeof callback === 'function', 'Callback is not a function.');
            var showLoader = (opts.animationDuration > 0);
            var halfTotalStrokeWidth = (opts.strokeWidth / 2);
            if (showLoader) {
                if (opts.outerLoader) {
                    halfTotalStrokeWidth += opts.loaderStrokeWidth;
                }
                else {
                    halfTotalStrokeWidth = Math.max(opts.strokeWidth, opts.loaderStrokeWidth) / 2;
                }
            }
            // stroke is on the circle radius, half inside, half outside
            var svgWidth = (2 * opts.radius) + (halfTotalStrokeWidth * 2);
            var cx = opts.radius + halfTotalStrokeWidth;
            var cy = opts.radius + halfTotalStrokeWidth;
            var cr = opts.radius;
            var loaderCr = opts.radius;
            if (showLoader && opts.outerLoader) {
                loaderCr += (opts.strokeWidth / 2) + (opts.loaderStrokeWidth / 2);
            }
            var makeSVG = function (tag, attrs) {
                var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
                if (typeof attrs === 'object') {
                    Object.keys(attrs).forEach(function (k) {
                        el.setAttribute(k, "" + attrs[k]);
                    });
                }
                return el;
            };
            var circleLength = function (radius) { return 2 * Math.PI * radius; };
            var animateLoader = function (loader) {
                loader.setAttribute('stroke-dashoffset', '0');
            };
            var reverseLoader = function (loader) {
                if (loader) {
                    loader.setAttribute('stroke-dashoffset', "" + circleLength(loaderCr));
                }
            };
            var btnPositionLeft = x - (svgWidth / 2);
            var btnPositionTop = y - (svgWidth / 2);
            var container = utils_1.createHtmlElement('div', {
                class: btnCssClass,
                style: utils_1.styleToString({
                    position: 'fixed',
                    left: btnPositionLeft + "px",
                    top: btnPositionTop + "px",
                })
            });
            var svg = makeSVG('svg', {
                width: svgWidth,
                height: svgWidth,
                class: btnCssClass + "__svg",
                viewBox: "0 0 " + svgWidth + " " + svgWidth,
            });
            container.appendChild(svg);
            var circle = makeSVG('path', {
                class: btnCssClass + "__path",
                d: "M " + cx + ", " + cy + " m -" + cr + ", 0 a " + cr + "," + cr + " 0 1,0 " + 2 * cr + ",0 a " + cr + "," + cr + " 0 1,0 -" + 2 * cr + ",0",
                stroke: opts.strokeColor,
                'stroke-width': opts.strokeWidth,
                fill: opts.fillColor,
            });
            svg.appendChild(circle);
            if (typeof opts.label === 'string' && opts.label.length) {
                var label = utils_1.createHtmlElement('div', { style: 'text-align:center;' });
                var labelHtml = utils_1.createHtmlElement('span', { html: opts.label });
                label.appendChild(labelHtml);
                opts.label = label;
            }
            if (typeof opts.label === 'object') {
                if (!allowedLabelPosition.includes(opts.labelPosition)) {
                    opts.labelPosition = defaultLabelPosition;
                }
                var label = utils_1.createHtmlElement('div', {
                    class: btnCssClass + "__label " + btnCssClass + "__label--" + opts.labelPosition,
                });
                label.appendChild(opts.label);
                container.appendChild(label);
            }
            var loader = null;
            if (showLoader) {
                loader = makeSVG('path', {
                    class: btnCssClass + "__loader",
                    d: (function (cx, cy, cr) { return "M " + cx + ", " + cy + " m -" + cr + ", 0 a " + cr + "," + cr + " 0 1,0 " + 2 * cr + ",0 a " + cr + "," + cr + " 0 1,0 -" + 2 * cr + ",0"; })(cx, cy, loaderCr),
                    fill: 'none',
                    stroke: opts.loaderStrokeColor,
                    'stroke-width': opts.loaderStrokeWidth,
                    'stroke-dasharray': circleLength(loaderCr) + " " + circleLength(loaderCr),
                    'stroke-dashoffset': circleLength(loaderCr),
                    style: utils_1.styleToString({
                        transitionDuration: opts.animationDuration + "ms",
                        transitionTimingFunction: opts.animationTiming
                    })
                });
                svg.appendChild(loader);
                loader.addEventListener('transitionend', function () {
                    if (loader.getAttribute('stroke-dashoffset') === '0') {
                        callback();
                    }
                }, true);
            }
            opts.parent.appendChild(container);
            var bounds = container.getBoundingClientRect();
            var rect = {
                posX: Math.round(bounds.left),
                posY: Math.round(bounds.top),
                width: Math.round(bounds.width),
                height: Math.round(bounds.height),
                classifier: 'cls_loc_fin_all_small'
            };
            return {
                rect: rect,
                activate: function () {
                    if (showLoader) {
                        animateLoader(loader);
                    }
                    else {
                        callback();
                    }
                },
                deactivate: function () {
                    reverseLoader(loader);
                },
            };
        };
    }
    return Buttons;
}());
exports.Buttons = Buttons;
