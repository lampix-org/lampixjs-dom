import invariant from 'invariant';
import {
  Opts,
  buttonsGenerateOptions,
  buttonsGenerateResult,
  IButtons,
} from '../types';

import {
  createHtmlElement,
  styleToString
} from '../utils';

import defaultOpts from './defaults';

class Buttons implements IButtons {
  generate = (x: number, y: number, callback: Function, opts?: buttonsGenerateOptions): buttonsGenerateResult => {
    const btnCssClass = 'lx-button';
    const allowedLabelPosition = ['bottom', 'left', 'top', 'right'];
    const defaultLabelPosition = 'bottom';

    // the following properties cannot be overriden
    opts = Object.assign({}, defaultOpts, opts, {
      radius: 13 // half the size of the button
    });

    // validate params
    invariant(Number.isFinite(x) || Number.isFinite(y), 'Invalid coordinates.');
    invariant(typeof callback === 'function', 'Callback is not a function.');

    const showLoader = (opts.animationDuration > 0);

    let halfTotalStrokeWidth = (opts.strokeWidth / 2);
    if (showLoader) {
      if (opts.outerLoader) {
        halfTotalStrokeWidth += opts.loaderStrokeWidth;
      } else {
        halfTotalStrokeWidth = Math.max(opts.strokeWidth, opts.loaderStrokeWidth) / 2;
      }
    }

    // stroke is on the circle radius, half inside, half outside
    const svgWidth = (2 * opts.radius) + (halfTotalStrokeWidth * 2);
    const cx = opts.radius + halfTotalStrokeWidth;
    const cy = opts.radius + halfTotalStrokeWidth;
    const cr = opts.radius;

    let loaderCr = opts.radius;
    if (showLoader && opts.outerLoader) {
      loaderCr += (opts.strokeWidth / 2) + (opts.loaderStrokeWidth / 2);
    }

    const makeSVG = (tag: string, attrs: Opts<string|number>) => {
      const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
      if (typeof attrs === 'object') {
        Object.keys(attrs).forEach(k => {
          el.setAttribute(k, `${attrs[k]}`);
        });
      }
      return el;
    };
    const circleLength = (radius: number) => 2 * Math.PI * radius;
    const animateLoader = (loader: SVGElement) => {
      loader.setAttribute('stroke-dashoffset', '0');
    };
    const reverseLoader = (loader: SVGElement) => {
      if (loader) {
        loader.setAttribute('stroke-dashoffset', `${circleLength(loaderCr)}`);
      }
    };

    const btnPositionLeft = x - (svgWidth / 2);
    const btnPositionTop = y - (svgWidth / 2);

    const container = createHtmlElement('div', {
      class: btnCssClass,
      style: styleToString({
        position: 'fixed',
        left: `${btnPositionLeft}px`,
        top: `${btnPositionTop}px`,
      })
    });

    const svg = makeSVG('svg', {
      width: svgWidth,
      height: svgWidth,
      class: `${btnCssClass}__svg ${btnCssClass}__svg--anim-transform`,
      viewBox: `0 0 ${svgWidth} ${svgWidth}`,
      // style: `transform: scale3d(${opts.scaleFactor}, ${opts.scaleFactor}, ${opts.scaleFactor});`
    });
    container.appendChild(svg);

    const circle = makeSVG('path', {
      class: `${btnCssClass}__path`,
      d: `M ${cx}, ${cy} m -${cr}, 0 a ${cr},${cr} 0 1,0 ${2 * cr},0 a ${cr},${cr} 0 1,0 -${2 * cr},0`,
      stroke: opts.strokeColor,
      'stroke-width': opts.strokeWidth,
      fill: opts.fillColor,
    });
    svg.appendChild(circle);

    if (typeof opts.label === 'string' && opts.label.length) {
      const label = createHtmlElement('div', { style: 'text-align:center;' });
      const labelHtml = createHtmlElement('span', { html: opts.label });
      label.appendChild(labelHtml);
      opts.label = label;
    }
    if (typeof opts.label === 'object') {
      if (!allowedLabelPosition.includes(opts.labelPosition)) {
        opts.labelPosition = defaultLabelPosition;
      }
      const label = createHtmlElement('div', {
        class: `${btnCssClass}__label ${btnCssClass}__label--${opts.labelPosition}`,
      });
      label.appendChild(opts.label);
      container.appendChild(label);
    }

    let loader: SVGElement = null;
    if (showLoader) {
      loader = makeSVG('path', {
        class: `${btnCssClass}__loader`,
        d: ((cx, cy, cr) => {
          return `M ${cx}, ${cy} m -${cr}, 0 a ${cr},${cr} 0 1,0 ${2 * cr},0 a ${cr},${cr} 0 1,0 -${2 * cr},0`;
        })(cx, cy, loaderCr),
        fill: 'none',
        stroke: opts.loaderStrokeColor,
        'stroke-width': opts.loaderStrokeWidth,
        'stroke-dasharray': `${circleLength(loaderCr)} ${circleLength(loaderCr)}`,
        'stroke-dashoffset': circleLength(loaderCr),
        style: styleToString({
          transitionDuration: `${opts.animationDuration}ms`,
          transitionTimingFunction: opts.animationTiming
        })
      });
      svg.appendChild(loader);
      loader.addEventListener(
        'transitionend',
        () => {
          if (loader.getAttribute('stroke-dashoffset') === '0') {
            callback();
          }
        },
        true
      );
    }

    opts.parent.appendChild(container);

    const bounds = container.getBoundingClientRect();
    const rect = {
      posX: Math.round(bounds.left),
      posY: Math.round(bounds.top),
      width: Math.round(bounds.width),
      height: Math.round(bounds.height),
      classifier: 'cls_loc_fin_all_small'
    };

    return {
      rect,
      activate: () => {
        // apply scale factor
        svg.style.transform = `scale3d(${opts.scaleFactor}, ${opts.scaleFactor}, ${opts.scaleFactor})`;

        if (showLoader) {
          animateLoader(loader);
        } else {
          callback();
        }
      },
      deactivate: () => {
        // reset scale factor
        svg.style.transform = '';

        reverseLoader(loader);
      },
    };

  }
}

export { Buttons };
