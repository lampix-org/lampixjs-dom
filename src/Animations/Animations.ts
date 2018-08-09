import kebabCase from 'lodash/kebabCase';
import {
  Opts,
  rectangleSelectionOptions,
  IAnimations,
} from '../types';

import {
  createHtmlElement
} from '../utils';

class Animations implements IAnimations {

  /**
   * rectangleSelection animation
   * @param  {Object} element      DOM Node
   * @param  {Object} [opts={}]    Allowed opts: borderWidth, borderColor, offset, (boolean) unselectAll
   * @return {Object}              DOM Node
   */
  rectangleSelection = (
    element: HTMLHtmlElement,
    opts?: rectangleSelectionOptions
  ): HTMLHtmlElement => {

    const cssAnimClass = 'lx-anim-corners';
    const cssAnimClassContainer = `${cssAnimClass}__container`;
    const cssOptsList = ['borderWidth', 'borderColor', 'offset'];
    const defaultOpts: rectangleSelectionOptions = {
      borderWidth: 1,
      borderColor: '#000',
      offset: 1,
      unselectAll: true,
    };
    const cssOpts: Opts<string|number> = {};

    opts = Object.assign(defaultOpts, opts);
    const cssOptsKeys = Object.keys(opts) as (keyof rectangleSelectionOptions)[];

    cssOptsKeys
      .filter(prop => cssOptsList.includes(prop))
      .forEach(prop => {
        switch (prop) {
          case 'borderWidth':
            cssOpts[prop] = `${opts[prop]}px`;
            break;
          default:
            cssOpts[prop] = `${opts[prop]}`;
            break;
        }
      });

    // unselect other rectangles
    if (opts.unselectAll === true) {
      const existingElements = document.getElementsByClassName(cssAnimClass);
      Array.from(existingElements).forEach(node => {
        const containers = node.getElementsByClassName(cssAnimClassContainer);
        Array.from(containers).forEach(child => {
          node.removeChild(child);
        });
        node.classList.remove(cssAnimClass);
      });
    }

    if (!element.classList.contains(cssAnimClass)) {
      // add helper elements
      const animContainer = createHtmlElement('div', { class: cssAnimClassContainer });

      const corner1CssOpts = Object.assign({}, cssOpts);
      const corner2CssOpts = Object.assign({}, cssOpts);
      let offset = Number.parseFloat(`${cssOpts.offset}`);

      // take into account border width
      offset += Number.parseFloat(`${cssOpts.borderWidth}`);

      delete corner1CssOpts.offset;
      corner1CssOpts.top = `-${offset}px`;
      corner1CssOpts.left = `-${offset}px`;

      delete corner2CssOpts.offset;
      corner2CssOpts.bottom = `-${offset}px`;
      corner2CssOpts.right = `-${offset}px`;

      const corner1Style = Object.keys(corner1CssOpts)
        .map(key => `${kebabCase(key)}: ${corner1CssOpts[key]};`)
        .join(' ');
      const corner2Style = Object.keys(corner2CssOpts)
        .map(key => `${kebabCase(key)}: ${corner2CssOpts[key]};`)
        .join(' ');

      const corner1 = createHtmlElement('i', { style: corner1Style });
      const corner2 = createHtmlElement('i', { style: corner2Style });
      animContainer.appendChild(corner1);
      animContainer.appendChild(corner2);

      element.classList.add(cssAnimClass);
      element.appendChild(animContainer);
    }

    return element;
  }

}

export { Animations };
