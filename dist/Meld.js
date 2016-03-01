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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVsZC5qcyIsInNvdXJjZXMiOlsiLi4vdG1wL2hlbHBlcnMvQ29tbW9uLmpzIiwiLi4vdG1wL1JlbmRlci5qcyIsIi4uL3RtcC9NZWxkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDb21tb24ge1xuICAgIHN0YXRpYyBoYXNoZXIobGVuID0gNykge1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIGxlbik7XG4gICAgfVxuICAgIHN0YXRpYyB0aXRsZUNhc2Uoc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvKFteXFxXX10rW15cXHMtXSopICovZywgKHR4dCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHR4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHR4dC5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29tbW9uLmpzLm1hcCIsImltcG9ydCB7IENvbW1vbiB9IGZyb20gJ2hlbHBlcnMvQ29tbW9uJztcbmV4cG9ydCB2YXIgUmVuZGVyO1xuKGZ1bmN0aW9uIChSZW5kZXIpIHtcbiAgICBjbGFzcyBSbmRyIHtcbiAgICAgICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIHRoaXMuZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICAgICAgdGhpcy5lbG0uc2V0QXR0cmlidXRlKCdpZCcsIG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJlbmRlcihmaWVsZHMpIHtcbiAgICAgICAgICAgIGZpZWxkcy5mb3JFYWNoKCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbG0uYXBwZW5kQ2hpbGQodi5kZWxpZ2F0ZSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxtO1xuICAgICAgICB9XG4gICAgfVxuICAgIFJlbmRlci5SbmRyID0gUm5kcjtcbiAgICBjbGFzcyBHcm91cCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHN0cnVjdCkge1xuICAgICAgICAgICAgdGhpcy5maWVsZHMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgIGxldCBncnAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmaWVsZHNldCcpLCBsZ25kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGVnZW5kJyk7XG4gICAgICAgICAgICBsZ25kLmlubmVyVGV4dCA9IHN0cnVjdC5kaXNwbGF5O1xuICAgICAgICAgICAgaWYgKHN0cnVjdC5jbGFzcykge1xuICAgICAgICAgICAgICAgIGdycC5jbGFzc05hbWUgPSBzdHJ1Y3QuY2xhc3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBncnAuYXBwZW5kQ2hpbGQobGduZCk7XG4gICAgICAgICAgICB0aGlzLmVsbSA9IGdycDtcbiAgICAgICAgfVxuICAgICAgICBzZXQoZmllbGRzKSB7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcyA9IGZpZWxkcztcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGRlbGlnYXRlKCkge1xuICAgICAgICAgICAgdGhpcy5maWVsZHMuZm9yRWFjaCgodikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxtLmFwcGVuZENoaWxkKHYuZGVsaWdhdGUoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBSZW5kZXIuR3JvdXAgPSBHcm91cDtcbiAgICBjbGFzcyBCaW5kIHtcbiAgICAgICAgY29uc3RydWN0b3Ioc3RydWN0LCB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zdHJ1Y3QgPSBzdHJ1Y3Q7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmhhc2ggPSBDb21tb24uaGFzaGVyKCk7XG4gICAgICAgICAgICB0aGlzLmVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgaWYgKHN0cnVjdC5jbGFzcykge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxtLmNsYXNzTmFtZSA9IHN0cnVjdC5jbGFzcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBnZW5lcmF0ZUlucHV0KCkge1xuICAgICAgICAgICAgbGV0IGVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCdpZCcsIHRoaXMuaGFzaCk7XG4gICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCduYW1lJywgdGhpcy5oYXNoKTtcbiAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgdGhpcy52YWx1ZSk7XG4gICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicsIHRoaXMuc3RydWN0LmRpc3BsYXkpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RydWN0LmlucHV0Q2xhc3MpIHtcbiAgICAgICAgICAgICAgICBlbG0uY2xhc3NOYW1lID0gdGhpcy5zdHJ1Y3QuaW5wdXRDbGFzcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBlbG07XG4gICAgICAgIH1cbiAgICAgICAgZ2VuZXJhdGVMYWJlbCgpIHtcbiAgICAgICAgICAgIGxldCBlbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZSgnZm9yJywgdGhpcy5oYXNoKTtcbiAgICAgICAgICAgIGVsbS5pbm5lclRleHQgPSB0aGlzLnN0cnVjdC5kaXNwbGF5O1xuICAgICAgICAgICAgcmV0dXJuIGVsbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGFzcyBUZXh0IGV4dGVuZHMgQmluZCB7XG4gICAgICAgIGRlbGlnYXRlKCkge1xuICAgICAgICAgICAgbGV0IGVsbSA9IHRoaXMuZ2VuZXJhdGVJbnB1dCgpO1xuICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XG4gICAgICAgICAgICB0aGlzLmVsbS5hcHBlbmRDaGlsZCh0aGlzLmdlbmVyYXRlTGFiZWwoKSk7XG4gICAgICAgICAgICB0aGlzLmVsbS5hcHBlbmRDaGlsZChlbG0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxtO1xuICAgICAgICB9XG4gICAgfVxuICAgIFJlbmRlci5UZXh0ID0gVGV4dDtcbiAgICBjbGFzcyBOdW1iZXIgZXh0ZW5kcyBCaW5kIHtcbiAgICAgICAgZGVsaWdhdGUoKSB7XG4gICAgICAgICAgICBsZXQgZWxtID0gdGhpcy5nZW5lcmF0ZUlucHV0KCk7XG4gICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCd0eXBlJywgJ251bWJlcicpO1xuICAgICAgICAgICAgdGhpcy5lbG0uYXBwZW5kQ2hpbGQodGhpcy5nZW5lcmF0ZUxhYmVsKCkpO1xuICAgICAgICAgICAgdGhpcy5lbG0uYXBwZW5kQ2hpbGQoZWxtKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBSZW5kZXIuTnVtYmVyID0gTnVtYmVyO1xuICAgIGNsYXNzIEJpbmFyeSBleHRlbmRzIEJpbmQge1xuICAgICAgICBkZWxpZ2F0ZSgpIHtcbiAgICAgICAgICAgIGxldCBlbG0gPSB0aGlzLmdlbmVyYXRlSW5wdXQoKTtcbiAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcbiAgICAgICAgICAgIGVsbS5yZW1vdmVBdHRyaWJ1dGUoJ3ZhbHVlJyk7XG4gICAgICAgICAgICBlbG0ucmVtb3ZlQXR0cmlidXRlKCdwbGFjZWhvbGRlcicpO1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBsYmwgPSB0aGlzLmdlbmVyYXRlTGFiZWwoKTtcbiAgICAgICAgICAgIGxibC5pbnNlcnRCZWZvcmUoZWxtLCBsYmwuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICB0aGlzLmVsbS5hcHBlbmRDaGlsZChsYmwpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxtO1xuICAgICAgICB9XG4gICAgfVxuICAgIFJlbmRlci5CaW5hcnkgPSBCaW5hcnk7XG59KShSZW5kZXIgfHwgKFJlbmRlciA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1SZW5kZXIuanMubWFwIiwiaW1wb3J0IHsgUmVuZGVyIGFzIHIgfSBmcm9tICdSZW5kZXInO1xuaW1wb3J0IHsgQ29tbW9uIH0gZnJvbSAnaGVscGVycy9Db21tb24nO1xuZXhwb3J0IHZhciBNZWxkO1xuKGZ1bmN0aW9uIChNZWxkKSB7XG4gICAgY2xhc3MgVWkge1xuICAgICAgICBjb25zdHJ1Y3RvcihiaW5kcykge1xuICAgICAgICAgICAgdGhpcy5zdHJ1Y3QgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgICBpZiAoYmluZHMgIT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kcyA9IGJpbmRzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZmluZFN0cnVjdHVyZSh3aGljaCwgc2VhcmNoKSB7XG4gICAgICAgICAgICBsZXQgc3RydWN0dXJlID0gdGhpcy5zdHJ1Y3QuZmlsdGVyKCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZbd2hpY2hdID09IHNlYXJjaDtcbiAgICAgICAgICAgIH0pLCBzZW5kU3RydWN0LCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHN0cnVjdHVyZS5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzZW5kU3RydWN0ID0ge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBzdHJ1Y3R1cmVbMF0uZGlzcGxheSB8fCBDb21tb24udGl0bGVDYXNlKHNlYXJjaCksXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiBzdHJ1Y3R1cmVbMF0uY2xhc3MgfHwgdm9pZCAwLFxuICAgICAgICAgICAgICAgICAgICBoaWRlOiBzdHJ1Y3R1cmVbMF0uaGlkZSB8fCBmYWxzZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZW5kU3RydWN0ID0ge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBDb21tb24udGl0bGVDYXNlKHNlYXJjaClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoICh3aGljaCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgICAgICAgICBjYXNlICdmaWVsZCc6XG4gICAgICAgICAgICAgICAgICAgIHZhciB0bXAgPSB0aGlzLnN0cnVjdC5maWx0ZXIoKHYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2W3doaWNoXSA9PSAnKic7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAodG1wLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZW5kU3RydWN0LmNsYXNzID09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRTdHJ1Y3QuY2xhc3MgPSB0bXBbMF0uY2xhc3MgfHwgdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VuZFN0cnVjdC5pbnB1dENsYXNzID0gKCgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgdG1wID0gdGhpcy5zdHJ1Y3QuZmlsdGVyKCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2LmlucHV0ID09ICcqJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAodG1wLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRtcFswXS5jbGFzcyB8fCB2b2lkIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgcmV0dXJuIHNlbmRTdHJ1Y3Q7XG4gICAgICAgIH1cbiAgICAgICAgYnVpbGQoYmluZHMpIHtcbiAgICAgICAgICAgIHZhciByZXR1cm5zID0gW107XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhiaW5kcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbCA9IGJpbmRzW2tleV0sIHB1c2hlcjtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdHJ1Y3QgPSB0aGlzLmZpbmRTdHJ1Y3R1cmUoJ2dyb3VwJywga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3RydWN0LmhpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JwID0gbmV3IHIuR3JvdXAoc3RydWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncnAuc2V0KHRoaXMuYnVpbGQodmFsKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaGVyID0gZ3JwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0cnVjdCA9IHRoaXMuZmluZFN0cnVjdHVyZSgnZmllbGQnLCBrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdHJ1Y3QuaGlkZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaGVyID0gbmV3IHIuVGV4dChzdHJ1Y3QsIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hlciA9IG5ldyByLk51bWJlcihzdHJ1Y3QsIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJ1Y3QuaW5wdXRDbGFzcyA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hlciA9IG5ldyByLkJpbmFyeShzdHJ1Y3QsIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHB1c2hlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5zLnB1c2gocHVzaGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5zO1xuICAgICAgICB9XG4gICAgICAgIHJlbmRlcihlbG0pIHtcbiAgICAgICAgICAgIGlmICghZWxtKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNZWxkOiBObyBIVE1MRWxlbWVudCBwcm92aWRlZC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZWxtID0gZWxtO1xuICAgICAgICAgICAgaWYgKHRoaXMuYmluZHMgPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNZWxkOiBFbXB0eSBiaW5kIHZhbHVlcywgbm90aGluZyB0byByZW5kZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBfciA9IG5ldyByLlJuZHIoQ29tbW9uLmhhc2hlcigpKTtcbiAgICAgICAgICAgIHRoaXMuZWxtLmFwcGVuZENoaWxkKF9yLnJlbmRlcih0aGlzLmJ1aWxkKHRoaXMuYmluZHMpKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbG07XG4gICAgICAgIH1cbiAgICAgICAgc3RydWN0dXJlKGNvbmZpZykge1xuICAgICAgICAgICAgdGhpcy5zdHJ1Y3QgPSBjb25maWc7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBkZXN0b3J5KCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWxtLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZWxtKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignTWVsZDogVGhlcmUgd2FzIG5vIGVsZW1lbnQgdG8gY3VsbC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBNZWxkLlVpID0gVWk7XG59KShNZWxkIHx8IChNZWxkID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU1lbGQuanMubWFwIl0sIm5hbWVzIjpbIk1lbGQiLCJyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFBYTs7Ozs7OztxQ0FDYztvQkFBVCw0REFBTSxpQkFBRzs7QUFDbkIsSUFBQSxtQkFBTyxLQUFLLE1BQUwsR0FBYyxRQUFkLENBQXVCLEVBQXZCLEVBQTJCLE1BQTNCLENBQWtDLENBQWxDLEVBQXFDLEdBQXJDLENBQVAsQ0FEbUI7Ozs7c0NBR04sUUFBUTtBQUNyQixJQUFBLG1CQUFPLE9BQU8sT0FBUCxDQUFlLHFCQUFmLEVBQXNDLFVBQUMsR0FBRCxFQUFTO0FBQ2xELElBQUEsdUJBQU8sSUFBSSxNQUFKLENBQVcsQ0FBWCxFQUFjLFdBQWQsS0FBOEIsSUFBSSxNQUFKLENBQVcsQ0FBWCxFQUFjLFdBQWQsRUFBOUIsQ0FEMkM7aUJBQVQsQ0FBN0MsQ0FEcUI7OztlQUpoQjtRQUFiOztJQ0NPLElBQUksTUFBSixDQUFQO0FBQ0EsSUFBQSxDQUFDLFVBQVUsTUFBVixFQUFrQjtZQUNUO0FBQ0YsSUFBQSxpQkFERSxJQUNGLENBQVksSUFBWixFQUFrQjtrREFEaEIsTUFDZ0I7O0FBQ2Qs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