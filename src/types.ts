export type Opts<T> = {
  [key: string]: T
};

export type createHtmlElementAttrs = {
  class?: string,
};

export type rectangleSelectionCssOptsKeys = 'borderWidth' | 'borderColor' | 'offset';

export type rectangleSelectionCssOpts = {
  /**
   * Below declaration not needed if you access the object keys like this:
   * const keys = Object.keys(obj: rectangleSelectionCssOpts) as (keyof rectangleSelectionCssOpts)[];
   */
  // [key: string]: string | number,
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
