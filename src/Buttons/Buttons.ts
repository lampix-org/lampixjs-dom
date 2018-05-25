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
    opts = Object.assign(defaultOpts, opts, {
      radius: 50,
      fillColor: 'none',
    });

    // validate params
    invariant(Number.isFinite(x) || Number.isFinite(y), 'Invalid coordinates.');
    invariant(typeof callback === 'function', 'Callback is not a function.');

    const showLoader = (opts.animationDuration > 0);

    let maxStrokeWidth = opts.strokeWidth;
    if (showLoader) {
      maxStrokeWidth = Math.max(maxStrokeWidth, opts.loaderStrokeWidth);
    }
    const svgWidth = (2 * opts.radius) + maxStrokeWidth;
    const cx = opts.radius + (maxStrokeWidth / 2);
    const cy = opts.radius + (maxStrokeWidth / 2);
    const cr = opts.radius;

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
    const done = () => {
      callback();
    };
    const animateLoader = (loader: SVGElement) => {
      setTimeout(
        () => {
          loader.setAttribute('stroke-dashoffset', '0');
        },
        0
      );
    };
    const reverseLoader = (loader: SVGElement) => {
      if (loader) {
        loader.setAttribute('stroke-dashoffset', `${circleLength(cr)}`);
      }
    };

    const left = x - opts.radius - (maxStrokeWidth / 2);
    const top = y - opts.radius - (maxStrokeWidth / 2);

    const container = createHtmlElement('div', {
      class: btnCssClass,
      style: styleToString({
        position: 'fixed',
        left: `${left}px`,
        top: `${top}px`,
      })
    });

    const svg = makeSVG('svg', {
      width: svgWidth,
      height: svgWidth,
      class: `${btnCssClass}__svg`,
      viewBox: `0 0 ${svgWidth} ${svgWidth}`,
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
        d: `M ${cx}, ${cy} m -${cr}, 0 a ${cr},${cr} 0 1,0 ${2 * cr},0 a ${cr},${cr} 0 1,0 -${2 * cr},0`,
        fill: 'none',
        stroke: opts.loaderStrokeColor,
        'stroke-width': opts.loaderStrokeWidth,
        'stroke-dasharray': `${circleLength(cr)} ${circleLength(cr)}`,
        'stroke-dashoffset': circleLength(cr),
        style: styleToString({
          transitionDuration: `${opts.animationDuration / 1000}s`,
          transitionTimingFunction: opts.animationTiming
        })
      });
      svg.appendChild(loader);
      loader.addEventListener(
        'transitionend',
        () => {
          if (loader.getAttribute('stroke-dashoffset') === '0') {
            done();
          }
        },
        true
      );
      animateLoader(loader);
    } else {
      done();
    }

    opts.parent.appendChild(container);

    const bounds = container.getBoundingClientRect();
    const rect = {
      posX: bounds.left,
      posY: bounds.top,
      width: bounds.width,
      height: bounds.height,
    };

    return {
      rect,
      reverseLoader: () => {
        reverseLoader(loader);
      }
    };

  }
}

export { Buttons };
