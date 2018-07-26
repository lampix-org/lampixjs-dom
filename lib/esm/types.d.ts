export declare type Opts<T> = {
    [key: string]: T;
};
export declare type ClassifierRect = {
    posX: number;
    posY: number;
    width: number;
    height: number;
};
export declare type createHtmlElementAttrs = {
    class?: string;
};
export declare type rectangleSelectionOptions = {
    borderWidth?: number;
    borderColor?: string;
    offset?: number;
    unselectAll?: boolean;
};
export interface IAnimations {
    rectangleSelection: (element: HTMLHtmlElement, opts?: rectangleSelectionOptions) => HTMLHtmlElement;
}
export declare type buttonsGenerateOptions = {
    parent?: HTMLElement;
    strokeWidth?: number;
    strokeColor?: string;
    radius?: number;
    fillColor?: string;
    loaderStrokeColor?: string;
    loaderStrokeWidth?: number;
    animationDuration?: number;
    animationTiming?: string;
    label?: HTMLElement | string;
    labelPosition?: string;
    scaleFactor?: number;
};
export declare type buttonsGenerateResult = {
    rect: ClassifierRect;
    activate: Function;
    deactivate: Function;
};
export interface IButtons {
    generate: (x: number, y: number, callback: Function, opts?: buttonsGenerateOptions) => buttonsGenerateResult;
}
export declare type createHtmlElementOptions = {
    html?: string;
    [key: string]: string;
};
