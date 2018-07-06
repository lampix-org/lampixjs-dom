import Animations from './Animations';
import Buttons from './Buttons';
import { loadStyles } from './utils';
// ensure css is loaded
loadStyles();
export default {
    animations: new Animations(),
    buttons: new Buttons()
};
