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

    babelHelpers.createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    babelHelpers.inherits = function (subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };

    babelHelpers.possibleConstructorReturn = function (self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };

    babelHelpers;

    var Render;
    (function (Render) {
        var Bind = function Bind(name, value) {
            babelHelpers.classCallCheck(this, Bind);

            this.name = name;
            this.value = value;
            this.hash = Math.random().toString(36).substr(2, 7);
            this.elm = document.createElement('div');
            this.elm.className = 'meld__bind';
        };

        var Text = function (_Bind) {
            babelHelpers.inherits(Text, _Bind);

            function Text() {
                babelHelpers.classCallCheck(this, Text);
                return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Text).apply(this, arguments));
            }

            babelHelpers.createClass(Text, [{
                key: 'deligate',
                value: function deligate() {
                    var elm = document.createElement('input');
                    this.elm.appendChild(elm);
                    elm.setAttribute('type', 'text');
                    elm.setAttribute('name', this.hash);
                    elm.setAttribute('value', this.value);
                    return this.elm;
                }
            }]);
            return Text;
        }(Bind);

        Render.Text = Text;
    })(Render || (Render = {}));

    exports.Meld;
    (function (Meld) {
        var Ui = function () {
            function Ui(elm) {
                babelHelpers.classCallCheck(this, Ui);

                this.fields = new Array();
                if (!elm) {
                    console.warn('Meld: No HTMLElement provided.');
                }
                this.elm = elm;
            }

            babelHelpers.createClass(Ui, [{
                key: 'init',
                value: function init(config) {
                    this.config = config;
                    return true;
                }
            }, {
                key: 'render',
                value: function render(binds) {
                    var _this = this;

                    Object.keys(binds).forEach(function (key) {
                        var val = binds[key];
                        if (typeof val == 'string') {
                            _this.fields.push(new Render.Text(key, val));
                        }
                    });
                    this.fields.forEach(function (v) {
                        _this.elm.appendChild(v.deligate());
                    });
                    return true;
                }
            }]);
            return Ui;
        }();

        Meld.Ui = Ui;
    })(exports.Meld || (exports.Meld = {}));

}));