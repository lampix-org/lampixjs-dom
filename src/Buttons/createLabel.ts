import { AllowedLabelPositions } from '../types';

import { createHtmlElement } from '../utils';
import { allowedLabelPositions, defaultLabelPosition } from './labelPositions';

const createLabel = (
  l: string | HTMLElement,
  lp: AllowedLabelPositions,
  cssClass: string
): HTMLElement => {
  let labelPosition = lp;
  let labelHtml: HTMLElement = <HTMLElement> l;
  const label = createHtmlElement('div', { other: { style: 'text-align:center;' } });

  if (typeof l === 'string') {
    labelHtml = createHtmlElement('span', { html: l });
  }

  label.appendChild(labelHtml);

  if (!allowedLabelPositions.includes(lp)) {
    labelPosition = defaultLabelPosition;
  }

  const labelElement = createHtmlElement('div', {
    other: {
      class: `${cssClass}__label ${cssClass}__label--${labelPosition}`,
    }
  });

  labelElement.appendChild(label);

  return labelElement;
};

export default createLabel;
