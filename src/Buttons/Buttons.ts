import {
  Opts,
  buttonsGenerateOptions,
  IButtons,
} from '../types';

import {
  createHtmlElement,
  styleToString
} from '../utils';

import defaultOpts from './defaults';

class Buttons implements IButtons {
  generate(opts: buttonsGenerateOptions, callback: Function) {
    const btnCssClass = 'lx-button';
    const allowedLabelPosition = ['bottom', 'left', 'top', 'right'];
    const defaultLabelPosition = 'bottom';

    // the following properties cannot be overriden
    opts = Object.assign(Object.assign(defaultOpts, opts), {
      radius: 50,
      fillColor: 'none',
    });

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

    const left = opts.x - opts.radius - (maxStrokeWidth / 2);
    const top = opts.y - opts.radius - (maxStrokeWidth / 2);

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

    if (showLoader) {
      const loader = makeSVG('path', {
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
      loader.addEventListener('transitionend', done, true);
      setTimeout(
        () => {
          // loader.style.strokeDashoffset = 0; or
          container.classList.add(`${btnCssClass}--animated`);
        },
        0
      );
    } else {
      done();
    }

    opts.parent.appendChild(container);
  }
}

export { Buttons };
