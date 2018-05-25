import kebabCase from 'lodash.kebabcase';
import {
  Opts,
  createHtmlElementOptions
} from '../types';

import styles from '../styles';

export const loadStyles = () => {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = styles;

  document.head.appendChild(style);
};

// converts a css style object to string
export const styleToString = (style: Opts<string|number>): string => {
  // convert to string
  return Object.keys(style)
    .map(key => `${kebabCase(key)}:${style[key]};`)
    .join('');
};

export const createHtmlElement = (tagName: string, opts?: createHtmlElementOptions): HTMLElement => {
  const element = <HTMLElement> document.createElement(tagName);
  const defaultOpts = {
    html: ''
  };

  opts = Object.assign(defaultOpts, typeof opts === 'object' ? opts : {});

  // set attributes
  Object.keys(opts).filter(prop => prop !== 'html').forEach(prop => {
    element.setAttribute(prop, opts[prop]);
  });

  element.innerHTML = opts.html;
  return element;
};
