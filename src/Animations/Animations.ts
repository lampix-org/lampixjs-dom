import {
  Opts,
  rectangleSelectionCssOpts,
  rectangleSelectionOpts,
  IAnimations,
} from '../types';
import styles from './styles';

const loadStyles = () => {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = styles;

  document.head.appendChild(style);
};

const createHtmlElement = (tagName: string, html?: string, attrs?: Opts<string>, css?: Opts<string>): HTMLElement => {
  const element = <HTMLElement> document.createElement(tagName);
  // set attributes
  Object.keys(attrs).forEach(prop => {
    element.setAttribute(prop, attrs[prop]);
  });
  // set css style
  const style = Object.keys(css)
    .map(key => `${key}: ${css[key]};`)
    .join(' ');
  if (style.length) {
    element.setAttribute('style', style);
  }
  element.innerHTML = html;
  return element;
};

// ensure css is loaded
loadStyles();


class Animations implements IAnimations {

  /**
   * rectangleSelection animation
   * @param  {Object} element      DOM Node
   * @param  {Object} [cssOpts={}] Allowed opts: borderWidth, borderColor, offset
   * @param  {Object|Boolean} [opts={}]    Allowed opts: (boolean) unselectAll
   * @return {Object}              DOM Node
   */
  rectangleSelection = (
    element: HTMLHtmlElement,
    cssOpts: rectangleSelectionCssOpts,
    opts: boolean | rectangleSelectionOpts
  ): HTMLHtmlElement => {

    const cssAnimClass = 'lx-anim-corners';
    const cssAnimClassContainer = `${cssAnimClass}__container`;
    const allowedOpts = ['borderWidth', 'borderColor', 'offset'];
    const defaultCssOpts: rectangleSelectionCssOpts = {
      borderWidth: 3,
      offset: 5,
    };
    const defaultOpts: Opts<string|number|boolean> = {
      unselectAll: false,
    };

    const pCssOpts = Object.assign(defaultCssOpts, cssOpts);
    const pOpts = Object.assign(
      defaultOpts,
      typeof opts === 'boolean' ? { unselectAll: opts } : opts
    );

    const animCssOpts: Opts<string> = {};

    Object.keys(pCssOpts)
      .filter(prop => allowedOpts.includes(prop))
      .forEach(prop => {
        switch (prop) {
          case 'borderWidth':
            animCssOpts[prop] = `${pCssOpts[prop]}px`;
            break;
          default:
            animCssOpts[prop] = `${pCssOpts[prop]}`;
            break;
        }
      });

    // unselect other rectangles
    if (pOpts.unselectAll === true) {
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
      const animContainer = createHtmlElement('div', '', { class: cssAnimClassContainer });

      const corner1CssOpts = Object.assign({}, animCssOpts);
      const corner2CssOpts = Object.assign({}, animCssOpts);
      let offset = Number.parseFloat(animCssOpts.offset);
      if (!Number.isNaN(offset)) {
        // take into account border width
        offset += Number.parseFloat(`${animCssOpts.borderWidth}`);

        delete corner1CssOpts.offset;
        corner1CssOpts.top = `-${offset}px`;
        corner1CssOpts.left = `-${offset}px`;

        delete corner2CssOpts.offset;
        corner2CssOpts.bottom = `-${offset}px`;
        corner2CssOpts.right = `-${offset}px`;
      }
      const corner1 = createHtmlElement('i', '', {}, corner1CssOpts);
      const corner2 = createHtmlElement('i', '', {}, corner2CssOpts);
      animContainer.appendChild(corner1);
      animContainer.appendChild(corner2);

      element.classList.add(cssAnimClass);
      element.appendChild(animContainer);
    }

    return element;
  }

}

export { Animations };
