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
    opts: rectangleSelectionOptions | null
  ) => HTMLHtmlElement;
}

export type createHtmlElementOptions = {
  html?: string,
  [key: string]: string
};
