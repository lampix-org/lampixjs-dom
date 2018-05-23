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

export type screenPosition = {
  x: number,
  y: number
};

export type buttonsGenerateOptions = {
  parent: HTMLElement,
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

export interface IButtons {
  // generate(pos, opts = {}, callback) {
  generate: (
    pos: screenPosition,
    opts: buttonsGenerateOptions,
    callback?: () => void
  ) => void;
}

export type createHtmlElementOptions = {
  html?: string,
  [key: string]: string
};
