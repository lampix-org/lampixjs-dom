(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.lampix = global.lampix || {}, global.lampix.dom = factory());
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff';
var rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23';
var rsComboSymbolsRange = '\\u20d0-\\u20f0';
var rsDingbatRange = '\\u2700-\\u27bf';
var rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff';
var rsMathOpRange = '\\xac\\xb1\\xd7\\xf7';
var rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf';
var rsPunctuationRange = '\\u2000-\\u206f';
var rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000';
var rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde';
var rsVarRange = '\\ufe0e\\ufe0f';
var rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]";
var rsBreak = '[' + rsBreakRange + ']';
var rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']';
var rsDigits = '\\d+';
var rsDingbat = '[' + rsDingbatRange + ']';
var rsLower = '[' + rsLowerRange + ']';
var rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']';
var rsFitz = '\\ud83c[\\udffb-\\udfff]';
var rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')';
var rsNonAstral = '[^' + rsAstralRange + ']';
var rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
var rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
var rsUpper = '[' + rsUpperRange + ']';
var rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsLowerMisc = '(?:' + rsLower + '|' + rsMisc + ')';
var rsUpperMisc = '(?:' + rsUpper + '|' + rsMisc + ')';
var rsOptLowerContr = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?';
var rsOptUpperContr = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?';
var reOptMod = rsModifier + '?';
var rsOptVar = '[' + rsVarRange + ']?';
var rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
var rsSeq = rsOptVar + reOptMod + rsOptJoin;
var rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo, 'g');

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([
  rsUpper + '?' + rsLower + '+' + rsOptLowerContr + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
  rsUpperMisc + '+' + rsOptUpperContr + '(?=' + [rsBreak, rsUpper + rsLowerMisc, '$'].join('|') + ')',
  rsUpper + '?' + rsLowerMisc + '+' + rsOptLowerContr,
  rsUpper + '+' + rsOptUpperContr,
  rsDigits,
  rsEmoji
].join('|'), 'g');

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C',  '\xe7': 'c',
  '\xd0': 'D',  '\xf0': 'd',
  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N',  '\xf1': 'n',
  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
  '\u0134': 'J',  '\u0135': 'j',
  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W',  '\u0175': 'w',
  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017f': 'ss'
};

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = basePropertyOf(deburredLetters);

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined;
var symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @example
 *
 * _.kebabCase('Foo Bar');
 * // => 'foo-bar'
 *
 * _.kebabCase('fooBar');
 * // => 'foo-bar'
 *
 * _.kebabCase('__FOO_BAR__');
 * // => 'foo-bar'
 */
var kebabCase = createCompounder(function(result, word, index) {
  return result + (index ? '-' : '') + word.toLowerCase();
});

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

var lodash_kebabcase = kebabCase;

var css = "\n.lx-anim-corners {\n  position: relative;\n  /* default color, if color not set on the element */\n  color: rgb(241, 72, 54);\n}\n\n.lx-anim-corners__container {}\n.lx-anim-corners__container > i {\n  display: block;\n  content: \"\";\n  width: 20px;\n  height: 20px;\n  position: absolute;\n  -webkit-backface-visibility: hidden;\n  border-style: solid;\n  border-color: currentColor;\n}\n.lx-anim-corners__container > i:nth-child(1) {\n  top: -5px;\n  left: -5px;\n  border-right: none;\n  border-bottom: none;\n  animation: lxAnimCornersTopLeft 0.5s ease-out forwards;\n}\n.lx-anim-corners__container > i:nth-child(2) {\n  bottom: -5px;\n  right: -5px;\n  border-top: none;\n  border-left: none;\n  animation: lxAnimCornersBottomRight 0.5s ease-out;\n}\n\n@keyframes lxAnimCornersTopLeft {\n  from {\n    opacity: 0;\n    top: 0;\n    left: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes lxAnimCornersBottomRight {\n  from {\n    opacity: 0;\n    bottom: 0;\n    right: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n .lx-button { }\n .lx-button__svg { }\n\n .lx-button__path {}\n .lx-button__loader {\n   stroke-linecap: round;\n   transform-origin: center;\n   transform: scale(-1,1) rotate(90deg);\n   transition: stroke-dashoffset 2s ease-in-out;\n }\n.lx-button__label {\n  display: block;\n  width: max-content;\n  position: absolute;\n}\n.lx-button__label--top {\n  bottom: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n  margin-bottom: 10px;\n}\n.lx-button__label--bottom {\n  left: 50%;\n  transform: translateX(-50%);\n  margin-top: 10px;\n}\n.lx-button__label--left {\n  top: 50%;\n  transform: translateY(-50%);\n  right: 100%;\n  margin-right: 10px;\n}\n.lx-button__label--right {\n  top: 50%;\n  transform: translateY(-50%);\n  left: 100%;\n  margin-left: 10px;\n}\n\n  ";

var loadStyles = function () {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    document.head.appendChild(style);
};
// converts a css style object to string
var styleToString = function (style) {
    // convert to string
    return Object.keys(style)
        .map(function (key) { return lodash_kebabcase(key) + ":" + style[key] + ";"; })
        .join('');
};
var createHtmlElement = function (tagName, opts) {
    var element = document.createElement(tagName);
    var defaultOpts = {
        html: ''
    };
    opts = Object.assign(defaultOpts, typeof opts === 'object' ? opts : {});
    // set attributes
    Object.keys(opts).filter(function (prop) { return prop !== 'html'; }).forEach(function (prop) {
        element.setAttribute(prop, opts[prop]);
    });
    element.innerHTML = opts.html;
    return element;
};

var Animations$1 = /** @class */ (function () {
    function Animations() {
        /**
         * rectangleSelection animation
         * @param  {Object} element      DOM Node
         * @param  {Object} [opts={}]    Allowed opts: borderWidth, borderColor, offset, (boolean) unselectAll
         * @return {Object}              DOM Node
         */
        this.rectangleSelection = function (element, opts) {
            var cssAnimClass = 'lx-anim-corners';
            var cssAnimClassContainer = cssAnimClass + "__container";
            var cssOptsList = ['borderWidth', 'borderColor', 'offset'];
            var defaultOpts = {
                borderWidth: 1,
                borderColor: '#000',
                offset: 1,
                unselectAll: true,
            };
            var cssOpts = {};
            opts = Object.assign(defaultOpts, opts);
            var cssOptsKeys = Object.keys(opts);
            cssOptsKeys
                .filter(function (prop) { return cssOptsList.includes(prop); })
                .forEach(function (prop) {
                switch (prop) {
                    case 'borderWidth':
                        cssOpts[prop] = opts[prop] + "px";
                        break;
                    default:
                        cssOpts[prop] = "" + opts[prop];
                        break;
                }
            });
            // unselect other rectangles
            if (opts.unselectAll === true) {
                var existingElements = document.getElementsByClassName(cssAnimClass);
                Array.from(existingElements).forEach(function (node) {
                    var containers = node.getElementsByClassName(cssAnimClassContainer);
                    Array.from(containers).forEach(function (child) {
                        node.removeChild(child);
                    });
                    node.classList.remove(cssAnimClass);
                });
            }
            if (!element.classList.contains(cssAnimClass)) {
                // add helper elements
                var animContainer = createHtmlElement('div', { class: cssAnimClassContainer });
                var corner1CssOpts_1 = Object.assign({}, cssOpts);
                var corner2CssOpts_1 = Object.assign({}, cssOpts);
                var offset = Number.parseFloat("" + cssOpts.offset);
                // take into account border width
                offset += Number.parseFloat("" + cssOpts.borderWidth);
                delete corner1CssOpts_1.offset;
                corner1CssOpts_1.top = "-" + offset + "px";
                corner1CssOpts_1.left = "-" + offset + "px";
                delete corner2CssOpts_1.offset;
                corner2CssOpts_1.bottom = "-" + offset + "px";
                corner2CssOpts_1.right = "-" + offset + "px";
                var corner1Style = Object.keys(corner1CssOpts_1)
                    .map(function (key) { return lodash_kebabcase(key) + ": " + corner1CssOpts_1[key] + ";"; })
                    .join(' ');
                var corner2Style = Object.keys(corner2CssOpts_1)
                    .map(function (key) { return lodash_kebabcase(key) + ": " + corner2CssOpts_1[key] + ";"; })
                    .join(' ');
                var corner1 = createHtmlElement('i', { style: corner1Style });
                var corner2 = createHtmlElement('i', { style: corner2Style });
                animContainer.appendChild(corner1);
                animContainer.appendChild(corner2);
                element.classList.add(cssAnimClass);
                element.appendChild(animContainer);
            }
            return element;
        };
    }
    return Animations;
}());

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var NODE_ENV = process.env.NODE_ENV;

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

var invariant_1 = invariant;

var defaultOpts = {
    parent: document.getElementsByTagName('body')[0],
    strokeWidth: 1,
    strokeColor: 'blue',
    loaderStrokeColor: 'red',
    loaderStrokeWidth: 1,
    animationDuration: 0,
    animationTiming: 'ease-in-out',
    labelPosition: 'bottom',
};

var Buttons$1 = /** @class */ (function () {
    function Buttons() {
        this.generate = function (x, y, callback, opts) {
            var btnCssClass = 'lx-button';
            var allowedLabelPosition = ['bottom', 'left', 'top', 'right'];
            var defaultLabelPosition = 'bottom';
            // the following properties cannot be overriden
            opts = Object.assign(defaultOpts, opts, {
                radius: 50,
                fillColor: 'none',
            });
            // validate params
            invariant_1(Number.isFinite(x) || Number.isFinite(y), 'Invalid coordinates.');
            invariant_1(typeof callback === 'function', 'Callback is not a function.');
            var showLoader = (opts.animationDuration > 0);
            var maxStrokeWidth = opts.strokeWidth;
            if (showLoader) {
                maxStrokeWidth = Math.max(maxStrokeWidth, opts.loaderStrokeWidth);
            }
            var svgWidth = (2 * opts.radius) + maxStrokeWidth;
            var cx = opts.radius + (maxStrokeWidth / 2);
            var cy = opts.radius + (maxStrokeWidth / 2);
            var cr = opts.radius;
            var makeSVG = function (tag, attrs) {
                var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
                if (typeof attrs === 'object') {
                    Object.keys(attrs).forEach(function (k) {
                        el.setAttribute(k, "" + attrs[k]);
                    });
                }
                return el;
            };
            var circleLength = function (radius) { return 2 * Math.PI * radius; };
            var animateLoader = function (loader) {
                loader.setAttribute('stroke-dashoffset', '0');
            };
            var reverseLoader = function (loader) {
                if (loader) {
                    loader.setAttribute('stroke-dashoffset', "" + circleLength(cr));
                }
            };
            var left = x - opts.radius - (maxStrokeWidth / 2);
            var top = y - opts.radius - (maxStrokeWidth / 2);
            var container = createHtmlElement('div', {
                class: btnCssClass,
                style: styleToString({
                    position: 'fixed',
                    left: left + "px",
                    top: top + "px",
                })
            });
            var svg = makeSVG('svg', {
                width: svgWidth,
                height: svgWidth,
                class: btnCssClass + "__svg",
                viewBox: "0 0 " + svgWidth + " " + svgWidth,
            });
            container.appendChild(svg);
            var circle = makeSVG('path', {
                class: btnCssClass + "__path",
                d: "M " + cx + ", " + cy + " m -" + cr + ", 0 a " + cr + "," + cr + " 0 1,0 " + 2 * cr + ",0 a " + cr + "," + cr + " 0 1,0 -" + 2 * cr + ",0",
                stroke: opts.strokeColor,
                'stroke-width': opts.strokeWidth,
                fill: opts.fillColor,
            });
            svg.appendChild(circle);
            if (typeof opts.label === 'object') {
                if (!allowedLabelPosition.includes(opts.labelPosition)) {
                    opts.labelPosition = defaultLabelPosition;
                }
                var label = createHtmlElement('div', {
                    class: btnCssClass + "__label " + btnCssClass + "__label--" + opts.labelPosition,
                });
                label.appendChild(opts.label);
                container.appendChild(label);
            }
            var loader = null;
            if (showLoader) {
                loader = makeSVG('path', {
                    class: btnCssClass + "__loader",
                    d: "M " + cx + ", " + cy + " m -" + cr + ", 0 a " + cr + "," + cr + " 0 1,0 " + 2 * cr + ",0 a " + cr + "," + cr + " 0 1,0 -" + 2 * cr + ",0",
                    fill: 'none',
                    stroke: opts.loaderStrokeColor,
                    'stroke-width': opts.loaderStrokeWidth,
                    'stroke-dasharray': circleLength(cr) + " " + circleLength(cr),
                    'stroke-dashoffset': circleLength(cr),
                    style: styleToString({
                        transitionDuration: opts.animationDuration + "ms",
                        transitionTimingFunction: opts.animationTiming
                    })
                });
                svg.appendChild(loader);
                loader.addEventListener('transitionend', function () {
                    if (loader.getAttribute('stroke-dashoffset') === '0') {
                        callback();
                    }
                }, true);
            }
            opts.parent.appendChild(container);
            var bounds = container.getBoundingClientRect();
            var rect = {
                posX: bounds.left,
                posY: bounds.top,
                width: bounds.width,
                height: bounds.height,
            };
            return {
                rect: rect,
                activate: function () {
                    if (showLoader) {
                        animateLoader(loader);
                    }
                    else {
                        callback();
                    }
                },
                deactivate: function () {
                    reverseLoader(loader);
                },
            };
        };
    }
    return Buttons;
}());

// ensure css is loaded
loadStyles();
var index = {
    animations: new Animations$1(),
    buttons: new Buttons$1()
};

return index;

})));
