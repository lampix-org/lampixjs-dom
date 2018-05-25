import {
  buttonsGenerateOptions
} from '../types';

const defaultOpts: buttonsGenerateOptions = {
  parent: document.getElementsByTagName('body')[0],
  strokeWidth: 1,
  strokeColor: 'blue',
  loaderStrokeColor: 'red',
  loaderStrokeWidth: 1,
  animationDuration: 0,
  animationTiming: 'ease-in-out',
  labelPosition: 'bottom',
};

export default defaultOpts;
