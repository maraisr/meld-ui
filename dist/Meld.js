(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.Meld = global.Meld || {})));
}(this, function (exports) { 'use strict';

    var babelHelpers = {};

    babelHelpers.classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    babelHelpers;

    exports.Meld;
    (function (Meld) {
        var Ui = function Ui() {
            babelHelpers.classCallCheck(this, Ui);
        };

        Meld.Ui = Ui;
    })(exports.Meld || (exports.Meld = {}));

}));