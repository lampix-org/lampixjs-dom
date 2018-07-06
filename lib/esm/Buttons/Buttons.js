import invariant from 'invariant';
import { createHtmlElement, styleToString } from '../utils';
import defaultOpts from './defaults';
var Buttons = /** @class */ (function () {
    function Buttons() {
        this.generate = function (x, y, callback, opts) {
            var btnCssClass = 'lx-button';
            var allowedLabelPosition = ['bottom', 'left', 'top', 'right'];
            var defaultLabelPosition = 'bottom';
            // the following properties cannot be overriden
            opts = Object.assign(defaultOpts, opts, {
                radius: 50,
                fillColor: 'none',
            });
            // validate params
            invariant(Number.isFinite(x) || Number.isFinite(y), 'Invalid coordinates.');
            invariant(typeof callback === 'function', 'Callback is not a function.');
            var showLoader = (opts.animationDuration > 0);
            var maxStrokeWidth = opts.strokeWidth;
            if (showLoader) {
                maxStrokeWidth = Math.max(maxStrokeWidth, opts.loaderStrokeWidth);
            }
            var svgWidth = (2 * opts.radius) + maxStrokeWidth;
            var cx = opts.radius + (maxStrokeWidth / 2);
            var cy = opts.radius + (maxStrokeWidth / 2);
            var cr = opts.radius;
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
                    loader.setAttribute('stroke-dashoffset', "" + circleLength(cr));
                }
            };
            var left = x - opts.radius - (maxStrokeWidth / 2);
            var top = y - opts.radius - (maxStrokeWidth / 2);
            var container = createHtmlElement('div', {
                class: btnCssClass,
                style: styleToString({
                    position: 'fixed',
                    left: left + "px",
                    top: top + "px",
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
            if (typeof opts.label === 'object') {
                if (!allowedLabelPosition.includes(opts.labelPosition)) {
                    opts.labelPosition = defaultLabelPosition;
                }
                var label = createHtmlElement('div', {
                    class: btnCssClass + "__label " + btnCssClass + "__label--" + opts.labelPosition,
                });
                label.appendChild(opts.label);
                container.appendChild(label);
            }
            var loader = null;
            if (showLoader) {
                loader = makeSVG('path', {
                    class: btnCssClass + "__loader",
                    d: "M " + cx + ", " + cy + " m -" + cr + ", 0 a " + cr + "," + cr + " 0 1,0 " + 2 * cr + ",0 a " + cr + "," + cr + " 0 1,0 -" + 2 * cr + ",0",
                    fill: 'none',
                    stroke: opts.loaderStrokeColor,
                    'stroke-width': opts.loaderStrokeWidth,
                    'stroke-dasharray': circleLength(cr) + " " + circleLength(cr),
                    'stroke-dashoffset': circleLength(cr),
                    style: styleToString({
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
                posX: bounds.left,
                posY: bounds.top,
                width: bounds.width,
                height: bounds.height,
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
export { Buttons };
