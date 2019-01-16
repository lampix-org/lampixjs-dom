import lampix from '@lampix/core';
import invariant from 'invariant';
import {
  Opts,
  buttonsGenerateOptions,
  IButtons
} from '../types';
import {
  RegisteredWatcher,
  ClassifiedObject
} from '@lampix/core/lib/types';

import {
  createHtmlElement,
  styleToString
} from '../utils';

import createLabel from './createLabel';
import defaultOpts from './defaults';

class Buttons implements IButtons {
  generate = (
    x: number,
    y: number,
    callback: Function,
    opts?: buttonsGenerateOptions
  ): Promise<RegisteredWatcher> => {
    const btnCssClass = 'lx-button';

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
      other: {
        class: btnCssClass,
        style: styleToString({
          position: 'fixed',
          left: `${btnPositionLeft}px`,
          top: `${btnPositionTop}px`,
        })
      }
    });

    const svg = makeSVG('svg', {
      width: svgWidth,
      height: svgWidth,
      class: `${btnCssClass}__svg ${btnCssClass}__svg--anim-transform`,
      viewBox: `0 0 ${svgWidth} ${svgWidth}`
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

    const label = createLabel(opts.label, opts.labelPosition, btnCssClass);
    container.appendChild(label);

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

    const activate = () => {
      // apply scale factor
      svg.style.transform = `scale3d(${opts.scaleFactor}, ${opts.scaleFactor}, ${opts.scaleFactor})`;

      if (showLoader) {
        animateLoader(loader);
      } else {
        callback();
      }
    };

    const deactivate = () => {
      // reset scale factor
      svg.style.transform = '';

      reverseLoader(loader);
    };

    const { left, top } = container.getBoundingClientRect();
    const nncCallback = ([recognizedObject]: ClassifiedObject[]) => {
      if (Number(recognizedObject.classTag) === 1) {
        activate();
      } else {
        deactivate();
      }
    };

    const watcher = lampix.presets.button(
      left,
      top,
      nncCallback,
      { width: svgWidth, height: svgWidth }
    );

    return lampix.watchers.add(watcher).then(([rw]) => {
      rw.ui = {
        element: container,
        changeLabel: (newLabelText: string) => {
          label.textContent = newLabelText;
        }
      };

      const pause = rw.pause;

      rw.pause = (time: number = 0) => {
        deactivate();
        return pause(time);
      };

      return rw;
    });
  }
}

export { Buttons };
