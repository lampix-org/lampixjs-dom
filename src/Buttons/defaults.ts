import {
  buttonsGenerateOptions
} from '../types';

const defaultOpts: buttonsGenerateOptions = {
  parent: document.body,
  strokeWidth: 3,
  strokeColor: 'gray',
  loaderStrokeColor: 'red',
  loaderStrokeWidth: 3,
  animationDuration: 0,
  animationTiming: 'ease-in-out',
  labelPosition: 'top',
  outerLoader: false,
  scaleFactor: 1.1
};

export default defaultOpts;
