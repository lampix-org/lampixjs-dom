import { rectangleSelectionOptions, IAnimations } from '../types';
declare class Animations implements IAnimations {
    /**
     * rectangleSelection animation
     * @param  {Object} element      DOM Node
     * @param  {Object} [opts={}]    Allowed opts: borderWidth, borderColor, offset, (boolean) unselectAll
     * @return {Object}              DOM Node
     */
    rectangleSelection: (element: HTMLHtmlElement, opts?: rectangleSelectionOptions) => HTMLHtmlElement;
}
export { Animations };
