/** meld-ui - The real world OIM library for JavaScript!
 *
 * @version v0.0.11
 * @author Marais Rossouw
 * @link https://github.com/maraisr/meld-ui
 * @license GPL-2.0
 *
 * @providesModule Meld
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.Meld = global.Meld || {})));
}(this, function (exports) { 'use strict';

    var babelHelpers = {};
    babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };

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

    var Common = function () {
        function Common() {
            babelHelpers.classCallCheck(this, Common);
        }

        babelHelpers.createClass(Common, null, [{
            key: "hasher",
            value: function hasher() {
                var len = arguments.length <= 0 || arguments[0] === undefined ? 7 : arguments[0];

                return Math.random().toString(36).substr(2, len);
            }
        }, {
            key: "titleCase",
            value: function titleCase(string) {
                return string.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            }
        }]);
        return Common;
    }();

    var Render;
    (function (Render) {
        var Rndr = function () {
            function Rndr(name) {
                babelHelpers.classCallCheck(this, Rndr);

                this.name = name;
                this.elm = document.createElement('form');
                this.elm.setAttribute('id', name);
            }

            babelHelpers.createClass(Rndr, [{
                key: 'render',
                value: function render(fields) {
                    var _this = this;

                    fields.forEach(function (v) {
                        _this.elm.appendChild(v.deligate());
                    });
                    return this.elm;
                }
            }]);
            return Rndr;
        }();

        Render.Rndr = Rndr;

        var Group = function () {
            function Group(struct) {
                babelHelpers.classCallCheck(this, Group);

                this.fields = new Array();
                var grp = document.createElement('fieldset'),
                    lgnd = document.createElement('legend');
                lgnd.innerText = struct.display;
                if (struct.class) {
                    grp.className = struct.class;
                }
                grp.appendChild(lgnd);
                this.elm = grp;
            }

            babelHelpers.createClass(Group, [{
                key: 'set',
                value: function set(fields) {
                    this.fields = fields;
                    return true;
                }
            }, {
                key: 'deligate',
                value: function deligate() {
                    var _this2 = this;

                    this.fields.forEach(function (v) {
                        _this2.elm.appendChild(v.deligate());
                    });
                    return this.elm;
                }
            }]);
            return Group;
        }();

        Render.Group = Group;

        var Bind = function () {
            function Bind(struct, value) {
                babelHelpers.classCallCheck(this, Bind);

                this.struct = struct;
                this.value = value;
                this.hash = Common.hasher();
                this.elm = document.createElement('div');
                if (struct.class) {
                    this.elm.className = struct.class;
                }
            }

            babelHelpers.createClass(Bind, [{
                key: 'generateInput',
                value: function generateInput() {
                    var elm = document.createElement('input');
                    elm.setAttribute('id', this.hash);
                    elm.setAttribute('name', this.hash);
                    elm.setAttribute('value', this.value);
                    elm.setAttribute('placeholder', this.struct.display);
                    if (this.struct.inputClass) {
                        elm.className = this.struct.inputClass;
                    }
                    return elm;
                }
            }, {
                key: 'generateLabel',
                value: function generateLabel() {
                    var elm = document.createElement('label');
                    elm.setAttribute('for', this.hash);
                    elm.innerText = this.struct.display;
                    return elm;
                }
            }]);
            return Bind;
        }();

        var Text = function (_Bind) {
            babelHelpers.inherits(Text, _Bind);

            function Text() {
                babelHelpers.classCallCheck(this, Text);
                return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Text).apply(this, arguments));
            }

            babelHelpers.createClass(Text, [{
                key: 'deligate',
                value: function deligate() {
                    var elm = this.generateInput();
                    elm.setAttribute('type', 'text');
                    this.elm.appendChild(this.generateLabel());
                    this.elm.appendChild(elm);
                    return this.elm;
                }
            }]);
            return Text;
        }(Bind);

        Render.Text = Text;

        var Number = function (_Bind2) {
            babelHelpers.inherits(Number, _Bind2);

            function Number() {
                babelHelpers.classCallCheck(this, Number);
                return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Number).apply(this, arguments));
            }

            babelHelpers.createClass(Number, [{
                key: 'deligate',
                value: function deligate() {
                    var elm = this.generateInput();
                    elm.setAttribute('type', 'number');
                    this.elm.appendChild(this.generateLabel());
                    this.elm.appendChild(elm);
                    return this.elm;
                }
            }]);
            return Number;
        }(Bind);

        Render.Number = Number;

        var Binary = function (_Bind3) {
            babelHelpers.inherits(Binary, _Bind3);

            function Binary() {
                babelHelpers.classCallCheck(this, Binary);
                return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Binary).apply(this, arguments));
            }

            babelHelpers.createClass(Binary, [{
                key: 'deligate',
                value: function deligate() {
                    var elm = this.generateInput();
                    elm.setAttribute('type', 'checkbox');
                    elm.removeAttribute('value');
                    elm.removeAttribute('placeholder');
                    if (this.value === true) {
                        elm.setAttribute('checked', 'checked');
                    }
                    var lbl = this.generateLabel();
                    lbl.insertBefore(elm, lbl.firstChild);
                    this.elm.appendChild(lbl);
                    return this.elm;
                }
            }]);
            return Binary;
        }(Bind);

        Render.Binary = Binary;
    })(Render || (Render = {}));

    var uid = 0;
    exports.Meld;
    (function (Meld) {
        var Ui = function () {
            function Ui(binds) {
                babelHelpers.classCallCheck(this, Ui);

                this.struct = new Array();
                this.fields = new Array();
                if (binds != void 0) {
                    this.binds = binds;
                }
                this._uid = uid++;
                this._isMeld = true;
                return this;
            }

            babelHelpers.createClass(Ui, [{
                key: 'findStructure',
                value: function findStructure(which, search) {
                    var _this = this;

                    var structure = this.struct.filter(function (v) {
                        return v[which] == search;
                    }),
                        sendStruct = undefined,
                        found = false;
                    if (structure.length == 1) {
                        found = true;
                        sendStruct = {
                            display: structure[0].display || Common.titleCase(search),
                            class: structure[0].class || void 0,
                            hide: structure[0].hide || false
                        };
                    } else {
                        sendStruct = {
                            display: Common.titleCase(search)
                        };
                    }
                    switch (which) {
                        case 'group':
                        case 'field':
                            var tmp = this.struct.filter(function (v) {
                                return v[which] == '*';
                            });
                            if (tmp.length > 0) {
                                if (sendStruct.class == void 0) {
                                    sendStruct.class = tmp[0].class || void 0;
                                }
                            }
                            break;
                    }
                    sendStruct.inputClass = function () {
                        var tmp = _this.struct.filter(function (v) {
                            return v.input == '*';
                        });
                        if (tmp.length > 0) {
                            return tmp[0].class || void 0;
                        }
                        return void 0;
                    }();
                    return sendStruct;
                }
            }, {
                key: 'build',
                value: function build(binds) {
                    var _this2 = this;

                    var returns = [];
                    Object.keys(binds).forEach(function (key) {
                        var val = binds[key],
                            pusher = undefined;
                        if (val == void 0 || val == null) {
                            val = '';
                        }
                        switch (typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) {
                            case 'object':
                                var struct = _this2.findStructure('group', key);
                                if (!struct.hide) {
                                    var grp = new Render.Group(struct);
                                    grp.set(_this2.build(val));
                                    pusher = grp;
                                }
                                break;
                            case 'number':
                            case 'string':
                            case 'boolean':
                                var struct = _this2.findStructure('field', key);
                                if (!struct.hide) {
                                    switch (typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) {
                                        case 'string':
                                            pusher = new Render.Text(struct, val);
                                            break;
                                        case 'number':
                                            pusher = new Render.Number(struct, val);
                                            break;
                                        case 'boolean':
                                            struct.inputClass = void 0;
                                            pusher = new Render.Binary(struct, val);
                                            break;
                                    }
                                }
                                break;
                        }
                        if (pusher) {
                            returns.push(pusher);
                        }
                    });
                    return returns;
                }
            }, {
                key: 'render',
                value: function render(elm) {
                    if (!elm) {
                        throw new Error('Meld: No HTMLElement provided.');
                    }
                    this.elm = elm;
                    if (this.binds == void 0) {
                        throw new Error('Meld: Empty bind values, nothing to render');
                    }
                    var _r = new Render.Rndr(Common.hasher());
                    this.elm.appendChild(_r.render(this.build(this.binds)));
                    return this.elm;
                }
            }, {
                key: 'structure',
                value: function structure(config) {
                    this.struct = config;
                    return this;
                }
            }, {
                key: 'destory',
                value: function destory() {
                    if (this.elm.parentNode) {
                        this.elm.parentNode.removeChild(this.elm);
                        return true;
                    } else {
                        console.warn('Meld: There was no element to cull.');
                    }
                    return false;
                }
            }]);
            return Ui;
        }();

        Meld.Ui = Ui;
    })(exports.Meld || (exports.Meld = {}));

}));