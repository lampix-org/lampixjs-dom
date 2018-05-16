import { IAnimations } from '../types';
import styles from './styles';

const loadStyles = () => {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = styles;

  document.head.appendChild(style);
};

// ensure css is loaded
loadStyles();


class Animations implements IAnimations {

  rectangleSelection = (element: HTMLHtmlElement): void => {

    const cssAnimClass = 'lx-anim-corners';

    if (!element.classList.contains(cssAnimClass)) {
      element.classList.add(cssAnimClass);
    }
  }

}

export { Animations };
