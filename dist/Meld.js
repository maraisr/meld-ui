/** meld-ui - The real world OIM library for JavaScript!
 *
 * @version v0.0.10
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVsZC5qcyIsInNvdXJjZXMiOlsiLi4vdG1wL2hlbHBlcnMvQ29tbW9uLmpzIiwiLi4vdG1wL1JlbmRlci5qcyIsIi4uL3RtcC9NZWxkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDb21tb24ge1xuICAgIHN0YXRpYyBoYXNoZXIobGVuID0gNykge1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIGxlbik7XG4gICAgfVxuICAgIHN0YXRpYyB0aXRsZUNhc2Uoc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvKFteXFxXX10rW15cXHMtXSopICovZywgKHR4dCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHR4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHR4dC5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29tbW9uLmpzLm1hcCIsImltcG9ydCB7IENvbW1vbiB9IGZyb20gJ2hlbHBlcnMvQ29tbW9uJztcbmV4cG9ydCB2YXIgUmVuZGVyO1xuKGZ1bmN0aW9uIChSZW5kZXIpIHtcbiAgICBjbGFzcyBSbmRyIHtcbiAgICAgICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIHRoaXMuZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICAgICAgdGhpcy5lbG0uc2V0QXR0cmlidXRlKCdpZCcsIG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJlbmRlcihmaWVsZHMpIHtcbiAgICAgICAgICAgIGZpZWxkcy5mb3JFYWNoKCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbG0uYXBwZW5kQ2hpbGQodi5kZWxpZ2F0ZSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxtO1xuICAgICAgICB9XG4gICAgfVxuICAgIFJlbmRlci5SbmRyID0gUm5kcjtcbiAgICBjbGFzcyBHcm91cCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHN0cnVjdCkge1xuICAgICAgICAgICAgdGhpcy5maWVsZHMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgIGxldCBncnAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmaWVsZHNldCcpLCBsZ25kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGVnZW5kJyk7XG4gICAgICAgICAgICBsZ25kLmlubmVyVGV4dCA9IHN0cnVjdC5kaXNwbGF5O1xuICAgICAgICAgICAgaWYgKHN0cnVjdC5jbGFzcykge1xuICAgICAgICAgICAgICAgIGdycC5jbGFzc05hbWUgPSBzdHJ1Y3QuY2xhc3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBncnAuYXBwZW5kQ2hpbGQobGduZCk7XG4gICAgICAgICAgICB0aGlzLmVsbSA9IGdycDtcbiAgICAgICAgfVxuICAgICAgICBzZXQoZmllbGRzKSB7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcyA9IGZpZWxkcztcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGRlbGlnYXRlKCkge1xuICAgICAgICAgICAgdGhpcy5maWVsZHMuZm9yRWFjaCgodikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxtLmFwcGVuZENoaWxkKHYuZGVsaWdhdGUoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBSZW5kZXIuR3JvdXAgPSBHcm91cDtcbiAgICBjbGFzcyBCaW5kIHtcbiAgICAgICAgY29uc3RydWN0b3Ioc3RydWN0LCB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zdHJ1Y3QgPSBzdHJ1Y3Q7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmhhc2ggPSBDb21tb24uaGFzaGVyKCk7XG4gICAgICAgICAgICB0aGlzLmVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgaWYgKHN0cnVjdC5jbGFzcykge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxtLmNsYXNzTmFtZSA9IHN0cnVjdC5jbGFzcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBnZW5lcmF0ZUlucHV0KCkge1xuICAgICAgICAgICAgbGV0IGVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCdpZCcsIHRoaXMuaGFzaCk7XG4gICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCduYW1lJywgdGhpcy5oYXNoKTtcbiAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgdGhpcy52YWx1ZSk7XG4gICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicsIHRoaXMuc3RydWN0LmRpc3BsYXkpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RydWN0LmlucHV0Q2xhc3MpIHtcbiAgICAgICAgICAgICAgICBlbG0uY2xhc3NOYW1lID0gdGhpcy5zdHJ1Y3QuaW5wdXRDbGFzcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBlbG07XG4gICAgICAgIH1cbiAgICAgICAgZ2VuZXJhdGVMYWJlbCgpIHtcbiAgICAgICAgICAgIGxldCBlbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZSgnZm9yJywgdGhpcy5oYXNoKTtcbiAgICAgICAgICAgIGVsbS5pbm5lclRleHQgPSB0aGlzLnN0cnVjdC5kaXNwbGF5O1xuICAgICAgICAgICAgcmV0dXJuIGVsbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGFzcyBUZXh0IGV4dGVuZHMgQmluZCB7XG4gICAgICAgIGRlbGlnYXRlKCkge1xuICAgICAgICAgICAgbGV0IGVsbSA9IHRoaXMuZ2VuZXJhdGVJbnB1dCgpO1xuICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XG4gICAgICAgICAgICB0aGlzLmVsbS5hcHBlbmRDaGlsZCh0aGlzLmdlbmVyYXRlTGFiZWwoKSk7XG4gICAgICAgICAgICB0aGlzLmVsbS5hcHBlbmRDaGlsZChlbG0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxtO1xuICAgICAgICB9XG4gICAgfVxuICAgIFJlbmRlci5UZXh0ID0gVGV4dDtcbiAgICBjbGFzcyBOdW1iZXIgZXh0ZW5kcyBCaW5kIHtcbiAgICAgICAgZGVsaWdhdGUoKSB7XG4gICAgICAgICAgICBsZXQgZWxtID0gdGhpcy5nZW5lcmF0ZUlucHV0KCk7XG4gICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCd0eXBlJywgJ251bWJlcicpO1xuICAgICAgICAgICAgdGhpcy5lbG0uYXBwZW5kQ2hpbGQodGhpcy5nZW5lcmF0ZUxhYmVsKCkpO1xuICAgICAgICAgICAgdGhpcy5lbG0uYXBwZW5kQ2hpbGQoZWxtKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBSZW5kZXIuTnVtYmVyID0gTnVtYmVyO1xuICAgIGNsYXNzIEJpbmFyeSBleHRlbmRzIEJpbmQge1xuICAgICAgICBkZWxpZ2F0ZSgpIHtcbiAgICAgICAgICAgIGxldCBlbG0gPSB0aGlzLmdlbmVyYXRlSW5wdXQoKTtcbiAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcbiAgICAgICAgICAgIGVsbS5yZW1vdmVBdHRyaWJ1dGUoJ3ZhbHVlJyk7XG4gICAgICAgICAgICBlbG0ucmVtb3ZlQXR0cmlidXRlKCdwbGFjZWhvbGRlcicpO1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBsYmwgPSB0aGlzLmdlbmVyYXRlTGFiZWwoKTtcbiAgICAgICAgICAgIGxibC5pbnNlcnRCZWZvcmUoZWxtLCBsYmwuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICB0aGlzLmVsbS5hcHBlbmRDaGlsZChsYmwpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxtO1xuICAgICAgICB9XG4gICAgfVxuICAgIFJlbmRlci5CaW5hcnkgPSBCaW5hcnk7XG59KShSZW5kZXIgfHwgKFJlbmRlciA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1SZW5kZXIuanMubWFwIiwiaW1wb3J0IHsgUmVuZGVyIGFzIHIgfSBmcm9tICdSZW5kZXInO1xuaW1wb3J0IHsgQ29tbW9uIH0gZnJvbSAnaGVscGVycy9Db21tb24nO1xubGV0IHVpZCA9IDA7XG5leHBvcnQgdmFyIE1lbGQ7XG4oZnVuY3Rpb24gKE1lbGQpIHtcbiAgICBjbGFzcyBVaSB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGJpbmRzKSB7XG4gICAgICAgICAgICB0aGlzLnN0cnVjdCA9IG5ldyBBcnJheSgpO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgIGlmIChiaW5kcyAhPSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRzID0gYmluZHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl91aWQgPSB1aWQrKztcbiAgICAgICAgICAgIHRoaXMuX2lzTWVsZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBmaW5kU3RydWN0dXJlKHdoaWNoLCBzZWFyY2gpIHtcbiAgICAgICAgICAgIGxldCBzdHJ1Y3R1cmUgPSB0aGlzLnN0cnVjdC5maWx0ZXIoKHYpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdlt3aGljaF0gPT0gc2VhcmNoO1xuICAgICAgICAgICAgfSksIHNlbmRTdHJ1Y3QsIGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoc3RydWN0dXJlLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNlbmRTdHJ1Y3QgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHN0cnVjdHVyZVswXS5kaXNwbGF5IHx8IENvbW1vbi50aXRsZUNhc2Uoc2VhcmNoKSxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6IHN0cnVjdHVyZVswXS5jbGFzcyB8fCB2b2lkIDAsXG4gICAgICAgICAgICAgICAgICAgIGhpZGU6IHN0cnVjdHVyZVswXS5oaWRlIHx8IGZhbHNlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbmRTdHJ1Y3QgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IENvbW1vbi50aXRsZUNhc2Uoc2VhcmNoKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKHdoaWNoKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2ZpZWxkJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9IHRoaXMuc3RydWN0LmZpbHRlcigodikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZbd2hpY2hdID09ICcqJztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0bXAubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbmRTdHJ1Y3QuY2xhc3MgPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VuZFN0cnVjdC5jbGFzcyA9IHRtcFswXS5jbGFzcyB8fCB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZW5kU3RydWN0LmlucHV0Q2xhc3MgPSAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciB0bXAgPSB0aGlzLnN0cnVjdC5maWx0ZXIoKHYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHYuaW5wdXQgPT0gJyonO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmICh0bXAubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG1wWzBdLmNsYXNzIHx8IHZvaWQgMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICByZXR1cm4gc2VuZFN0cnVjdDtcbiAgICAgICAgfVxuICAgICAgICBidWlsZChiaW5kcykge1xuICAgICAgICAgICAgdmFyIHJldHVybnMgPSBbXTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGJpbmRzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsID0gYmluZHNba2V5XSwgcHVzaGVyO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIHZhbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0cnVjdCA9IHRoaXMuZmluZFN0cnVjdHVyZSgnZ3JvdXAnLCBrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdHJ1Y3QuaGlkZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBncnAgPSBuZXcgci5Hcm91cChzdHJ1Y3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdycC5zZXQodGhpcy5idWlsZCh2YWwpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoZXIgPSBncnA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RydWN0ID0gdGhpcy5maW5kU3RydWN0dXJlKCdmaWVsZCcsIGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN0cnVjdC5oaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoZXIgPSBuZXcgci5UZXh0KHN0cnVjdCwgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaGVyID0gbmV3IHIuTnVtYmVyKHN0cnVjdCwgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cnVjdC5pbnB1dENsYXNzID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaGVyID0gbmV3IHIuQmluYXJ5KHN0cnVjdCwgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocHVzaGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybnMucHVzaChwdXNoZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJldHVybnM7XG4gICAgICAgIH1cbiAgICAgICAgcmVuZGVyKGVsbSkge1xuICAgICAgICAgICAgaWYgKCFlbG0pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01lbGQ6IE5vIEhUTUxFbGVtZW50IHByb3ZpZGVkLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5lbG0gPSBlbG07XG4gICAgICAgICAgICBpZiAodGhpcy5iaW5kcyA9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01lbGQ6IEVtcHR5IGJpbmQgdmFsdWVzLCBub3RoaW5nIHRvIHJlbmRlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IF9yID0gbmV3IHIuUm5kcihDb21tb24uaGFzaGVyKCkpO1xuICAgICAgICAgICAgdGhpcy5lbG0uYXBwZW5kQ2hpbGQoX3IucmVuZGVyKHRoaXMuYnVpbGQodGhpcy5iaW5kcykpKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsbTtcbiAgICAgICAgfVxuICAgICAgICBzdHJ1Y3R1cmUoY29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLnN0cnVjdCA9IGNvbmZpZztcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGRlc3RvcnkoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbG0ucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5lbG0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdNZWxkOiBUaGVyZSB3YXMgbm8gZWxlbWVudCB0byBjdWxsLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIE1lbGQuVWkgPSBVaTtcbn0pKE1lbGQgfHwgKE1lbGQgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TWVsZC5qcy5tYXAiXSwibmFtZXMiOlsiTWVsZCIsInIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQUFhOzs7Ozs7O3FDQUNjO29CQUFULDREQUFNLGlCQUFHOztBQUNuQixJQUFBLG1CQUFPLEtBQUssTUFBTCxHQUFjLFFBQWQsQ0FBdUIsRUFBdkIsRUFBMkIsTUFBM0IsQ0FBa0MsQ0FBbEMsRUFBcUMsR0FBckMsQ0FBUCxDQURtQjs7OztzQ0FHTixRQUFRO0FBQ3JCLElBQUEsbUJBQU8sT0FBTyxPQUFQLENBQWUscUJBQWYsRUFBc0MsVUFBQyxHQUFELEVBQVM7QUFDbEQsSUFBQSx1QkFBTyxJQUFJLE1BQUosQ0FBVyxDQUFYLEVBQWMsV0FBZCxLQUE4QixJQUFJLE1BQUosQ0FBVyxDQUFYLEVBQWMsV0FBZCxFQUE5QixDQUQyQztpQkFBVCxDQUE3QyxDQURxQjs7O2VBSmhCO1FBQWI7O0lDQ08sSUFBSSxNQUFKLENBQVA7QUFDQSxJQUFBLENB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