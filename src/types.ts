import {
  RegisteredWatcher
} from '@lampix/core/lib/types';

export type Opts<T> = {
  [key: string]: T
};

export type createHtmlElementAttrs = {
  class?: string,
};

export type rectangleSelectionOptions = {
  borderWidth?: number,
  borderColor?: string,
  offset?: number,
  unselectAll?: boolean,
};

export interface IAnimations {
  rectangleSelection: (
    element: HTMLHtmlElement,
    opts?: rectangleSelectionOptions
  ) => HTMLHtmlElement;
}

export type buttonsGenerateOptions = {
  parent?: HTMLElement,
  strokeWidth?: number,
  strokeColor?: string,
  radius?: number,
  fillColor?: string,
  loaderStrokeColor?: string,
  loaderStrokeWidth?: number,
  animationDuration?: number,
  animationTiming?: string,
  label?: HTMLElement | string,
  labelPosition?: string,
  outerLoader?: boolean,
  scaleFactor?: number
};

export interface IButtons {
  generate: (
    x: number,
    y: number,
    callback: Function,
    opts?: buttonsGenerateOptions
  ) => Promise<RegisteredWatcher>;
}

export type createHtmlElementOptions = {
  html?: string,
  [key: string]: string
};
