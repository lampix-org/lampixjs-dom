export type Opts<T> = {
  [key: string]: T
};

export type createHtmlElementAttrs = {
  class?: string,
};

export type rectangleSelectionCssOptsKeys = 'borderWidth' | 'borderColor' | 'offset';

export type rectangleSelectionCssOpts = {
  [k in rectangleSelectionCssOptsKeys]?: string | number
};

export type rectangleSelectionOpts = {
  unselectAll: boolean
};

export interface IAnimations {
  rectangleSelection: (
    element: HTMLHtmlElement,
    cssOpts: rectangleSelectionCssOpts,
    opts: boolean | rectangleSelectionOpts
  ) => HTMLHtmlElement;
}
