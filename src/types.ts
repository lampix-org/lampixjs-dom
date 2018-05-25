export type Opts<T> = {
  [key: string]: T
};

export type ClassifierRect = {
  posX: number,
  posY: number,
  width: number,
  height: number
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
  label?: HTMLElement,
  labelPosition?: string,
};

export type buttonsGenerateResult = {
  rect: ClassifierRect,
  reverseLoader: Function
};

export interface IButtons {
  generate: (
    x: number,
    y: number,
    callback: Function,
    opts?: buttonsGenerateOptions
  ) => buttonsGenerateResult;
}

export type createHtmlElementOptions = {
  html?: string,
  [key: string]: string
};
