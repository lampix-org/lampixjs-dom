import { buttonsGenerateOptions, buttonsGenerateResult, IButtons } from '../types';
declare class Buttons implements IButtons {
    generate: (x: number, y: number, callback: Function, opts?: buttonsGenerateOptions) => buttonsGenerateResult;
}
export { Buttons };
