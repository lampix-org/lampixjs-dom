import {
  createHtmlElementOptions
} from '../types';

import styles from '../styles';

export const loadStyles = () => {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = styles;

  document.head.appendChild(style);
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
