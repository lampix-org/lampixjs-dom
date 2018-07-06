"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Animations_1 = require("./Animations");
var Buttons_1 = require("./Buttons");
var utils_1 = require("./utils");
// ensure css is loaded
utils_1.loadStyles();
exports.default = {
    animations: new Animations_1.default(),
    buttons: new Buttons_1.default()
};
