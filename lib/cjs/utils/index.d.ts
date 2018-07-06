import { Opts, createHtmlElementOptions } from '../types';
export declare const loadStyles: () => void;
export declare const styleToString: (style: Opts<string | number>) => string;
export declare const createHtmlElement: (tagName: string, opts?: createHtmlElementOptions) => HTMLElement;
