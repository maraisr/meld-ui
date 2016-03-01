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
                key: 'generateElement',
                value: function generateElement() {
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
                    var elm = this.generateElement();
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
                    var elm = this.generateElement();
                    elm.setAttribute('type', 'number');
                    this.elm.appendChild(this.generateLabel());
                    this.elm.appendChild(elm);
                    return this.elm;
                }
            }]);
            return Number;
        }(Bind);

        Render.Number = Number;
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
                            class: structure[0].class || void 0
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
                        var val = binds[key];
                        switch (typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) {
                            case 'object':
                                var grp = new Render.Group(_this2.findStructure('group', key));
                                grp.set(_this2.build(val));
                                returns.push(grp);
                                break;
                            case 'string':
                                returns.push(new Render.Text(_this2.findStructure('field', key), val));
                                break;
                            case 'number':
                                returns.push(new Render.Number(_this2.findStructure('field', key), val));
                                break;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVsZC5qcyIsInNvdXJjZXMiOlsiLi4vdG1wL2hlbHBlcnMvQ29tbW9uLmpzIiwiLi4vdG1wL1JlbmRlci5qcyIsIi4uL3RtcC9NZWxkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDb21tb24ge1xuICAgIHN0YXRpYyBoYXNoZXIobGVuID0gNykge1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIGxlbik7XG4gICAgfVxuICAgIHN0YXRpYyB0aXRsZUNhc2Uoc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvKFteXFxXX10rW15cXHMtXSopICovZywgKHR4dCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHR4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHR4dC5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29tbW9uLmpzLm1hcCIsImltcG9ydCB7IENvbW1vbiB9IGZyb20gJ2hlbHBlcnMvQ29tbW9uJztcbmV4cG9ydCB2YXIgUmVuZGVyO1xuKGZ1bmN0aW9uIChSZW5kZXIpIHtcbiAgICBjbGFzcyBSbmRyIHtcbiAgICAgICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIHRoaXMuZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICAgICAgdGhpcy5lbG0uc2V0QXR0cmlidXRlKCdpZCcsIG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJlbmRlcihmaWVsZHMpIHtcbiAgICAgICAgICAgIGZpZWxkcy5mb3JFYWNoKCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbG0uYXBwZW5kQ2hpbGQodi5kZWxpZ2F0ZSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxtO1xuICAgICAgICB9XG4gICAgfVxuICAgIFJlbmRlci5SbmRyID0gUm5kcjtcbiAgICBjbGFzcyBHcm91cCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHN0cnVjdCkge1xuICAgICAgICAgICAgdGhpcy5maWVsZHMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgIGxldCBncnAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmaWVsZHNldCcpLCBsZ25kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGVnZW5kJyk7XG4gICAgICAgICAgICBsZ25kLmlubmVyVGV4dCA9IHN0cnVjdC5kaXNwbGF5O1xuICAgICAgICAgICAgaWYgKHN0cnVjdC5jbGFzcykge1xuICAgICAgICAgICAgICAgIGdycC5jbGFzc05hbWUgPSBzdHJ1Y3QuY2xhc3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBncnAuYXBwZW5kQ2hpbGQobGduZCk7XG4gICAgICAgICAgICB0aGlzLmVsbSA9IGdycDtcbiAgICAgICAgfVxuICAgICAgICBzZXQoZmllbGRzKSB7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcyA9IGZpZWxkcztcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGRlbGlnYXRlKCkge1xuICAgICAgICAgICAgdGhpcy5maWVsZHMuZm9yRWFjaCgodikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxtLmFwcGVuZENoaWxkKHYuZGVsaWdhdGUoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBSZW5kZXIuR3JvdXAgPSBHcm91cDtcbiAgICBjbGFzcyBCaW5kIHtcbiAgICAgICAgY29uc3RydWN0b3Ioc3RydWN0LCB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zdHJ1Y3QgPSBzdHJ1Y3Q7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmhhc2ggPSBDb21tb24uaGFzaGVyKCk7XG4gICAgICAgICAgICB0aGlzLmVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgaWYgKHN0cnVjdC5jbGFzcykge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxtLmNsYXNzTmFtZSA9IHN0cnVjdC5jbGFzcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBnZW5lcmF0ZUVsZW1lbnQoKSB7XG4gICAgICAgICAgICBsZXQgZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5oYXNoKTtcbiAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCB0aGlzLmhhc2gpO1xuICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZSgndmFsdWUnLCB0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgdGhpcy5zdHJ1Y3QuZGlzcGxheSk7XG4gICAgICAgICAgICBpZiAodGhpcy5zdHJ1Y3QuaW5wdXRDbGFzcykge1xuICAgICAgICAgICAgICAgIGVsbS5jbGFzc05hbWUgPSB0aGlzLnN0cnVjdC5pbnB1dENsYXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGVsbTtcbiAgICAgICAgfVxuICAgICAgICBnZW5lcmF0ZUxhYmVsKCkge1xuICAgICAgICAgICAgbGV0IGVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCdmb3InLCB0aGlzLmhhc2gpO1xuICAgICAgICAgICAgZWxtLmlubmVyVGV4dCA9IHRoaXMuc3RydWN0LmRpc3BsYXk7XG4gICAgICAgICAgICByZXR1cm4gZWxtO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsYXNzIFRleHQgZXh0ZW5kcyBCaW5kIHtcbiAgICAgICAgZGVsaWdhdGUoKSB7XG4gICAgICAgICAgICBsZXQgZWxtID0gdGhpcy5nZW5lcmF0ZUVsZW1lbnQoKTtcbiAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xuICAgICAgICAgICAgdGhpcy5lbG0uYXBwZW5kQ2hpbGQodGhpcy5nZW5lcmF0ZUxhYmVsKCkpO1xuICAgICAgICAgICAgdGhpcy5lbG0uYXBwZW5kQ2hpbGQoZWxtKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBSZW5kZXIuVGV4dCA9IFRleHQ7XG4gICAgY2xhc3MgTnVtYmVyIGV4dGVuZHMgQmluZCB7XG4gICAgICAgIGRlbGlnYXRlKCkge1xuICAgICAgICAgICAgbGV0IGVsbSA9IHRoaXMuZ2VuZXJhdGVFbGVtZW50KCk7XG4gICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCd0eXBlJywgJ251bWJlcicpO1xuICAgICAgICAgICAgdGhpcy5lbG0uYXBwZW5kQ2hpbGQodGhpcy5nZW5lcmF0ZUxhYmVsKCkpO1xuICAgICAgICAgICAgdGhpcy5lbG0uYXBwZW5kQ2hpbGQoZWxtKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBSZW5kZXIuTnVtYmVyID0gTnVtYmVyO1xufSkoUmVuZGVyIHx8IChSZW5kZXIgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UmVuZGVyLmpzLm1hcCIsImltcG9ydCB7IFJlbmRlciBhcyByIH0gZnJvbSAnUmVuZGVyJztcbmltcG9ydCB7IENvbW1vbiB9IGZyb20gJ2hlbHBlcnMvQ29tbW9uJztcbmV4cG9ydCB2YXIgTWVsZDtcbihmdW5jdGlvbiAoTWVsZCkge1xuICAgIGNsYXNzIFVpIHtcbiAgICAgICAgY29uc3RydWN0b3IoYmluZHMpIHtcbiAgICAgICAgICAgIHRoaXMuc3RydWN0ID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcyA9IG5ldyBBcnJheSgpO1xuICAgICAgICAgICAgaWYgKGJpbmRzICE9IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmluZHMgPSBiaW5kcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGZpbmRTdHJ1Y3R1cmUod2hpY2gsIHNlYXJjaCkge1xuICAgICAgICAgICAgbGV0IHN0cnVjdHVyZSA9IHRoaXMuc3RydWN0LmZpbHRlcigodikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB2W3doaWNoXSA9PSBzZWFyY2g7XG4gICAgICAgICAgICB9KSwgc2VuZFN0cnVjdCwgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChzdHJ1Y3R1cmUubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2VuZFN0cnVjdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogc3RydWN0dXJlWzBdLmRpc3BsYXkgfHwgQ29tbW9uLnRpdGxlQ2FzZShzZWFyY2gpLFxuICAgICAgICAgICAgICAgICAgICBjbGFzczogc3RydWN0dXJlWzBdLmNsYXNzIHx8IHZvaWQgMFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZW5kU3RydWN0ID0ge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBDb21tb24udGl0bGVDYXNlKHNlYXJjaClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoICh3aGljaCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgICAgICAgICBjYXNlICdmaWVsZCc6XG4gICAgICAgICAgICAgICAgICAgIHZhciB0bXAgPSB0aGlzLnN0cnVjdC5maWx0ZXIoKHYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2W3doaWNoXSA9PSAnKic7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAodG1wLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZW5kU3RydWN0LmNsYXNzID09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRTdHJ1Y3QuY2xhc3MgPSB0bXBbMF0uY2xhc3MgfHwgdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VuZFN0cnVjdC5pbnB1dENsYXNzID0gKCgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgdG1wID0gdGhpcy5zdHJ1Y3QuZmlsdGVyKCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2LmlucHV0ID09ICcqJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAodG1wLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRtcFswXS5jbGFzcyB8fCB2b2lkIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgcmV0dXJuIHNlbmRTdHJ1Y3Q7XG4gICAgICAgIH1cbiAgICAgICAgYnVpbGQoYmluZHMpIHtcbiAgICAgICAgICAgIHZhciByZXR1cm5zID0gW107XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhiaW5kcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbCA9IGJpbmRzW2tleV07XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JwID0gbmV3IHIuR3JvdXAodGhpcy5maW5kU3RydWN0dXJlKCdncm91cCcsIGtleSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JwLnNldCh0aGlzLmJ1aWxkKHZhbCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJucy5wdXNoKGdycCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybnMucHVzaChuZXcgci5UZXh0KHRoaXMuZmluZFN0cnVjdHVyZSgnZmllbGQnLCBrZXkpLCB2YWwpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJucy5wdXNoKG5ldyByLk51bWJlcih0aGlzLmZpbmRTdHJ1Y3R1cmUoJ2ZpZWxkJywga2V5KSwgdmFsKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5zO1xuICAgICAgICB9XG4gICAgICAgIHJlbmRlcihlbG0pIHtcbiAgICAgICAgICAgIGlmICghZWxtKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNZWxkOiBObyBIVE1MRWxlbWVudCBwcm92aWRlZC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZWxtID0gZWxtO1xuICAgICAgICAgICAgaWYgKHRoaXMuYmluZHMgPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNZWxkOiBFbXB0eSBiaW5kIHZhbHVlcywgbm90aGluZyB0byByZW5kZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBfciA9IG5ldyByLlJuZHIoQ29tbW9uLmhhc2hlcigpKTtcbiAgICAgICAgICAgIHRoaXMuZWxtLmFwcGVuZENoaWxkKF9yLnJlbmRlcih0aGlzLmJ1aWxkKHRoaXMuYmluZHMpKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbG07XG4gICAgICAgIH1cbiAgICAgICAgc3RydWN0dXJlKGNvbmZpZykge1xuICAgICAgICAgICAgdGhpcy5zdHJ1Y3QgPSBjb25maWc7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBkZXN0b3J5KCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWxtLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZWxtKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignTWVsZDogVGhlcmUgd2FzIG5vIGVsZW1lbnQgdG8gY3VsbC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBNZWxkLlVpID0gVWk7XG59KShNZWxkIHx8IChNZWxkID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU1lbGQuanMubWFwIl0sIm5hbWVzIjpbIk1lbGQiLCJyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFBYTs7Ozs7OztxQ0FDYztvQkFBVCw0REFBTSxpQkFBRzs7QUFDbkIsSUFBQSxtQkFBTyxLQUFLLE1BQUwsR0FBYyxRQUFkLENBQXVCLEVBQXZCLEVBQTJCLE1BQTNCLENBQWtDLENBQWxDLEVBQXFDLEdBQXJDLENBQVAsQ0FEbUI7Ozs7c0NBR04sUUFBUTtBQUNyQixJQUFBLG1CQUFPLE9BQU8sT0FBUCxDQUFlLHFCQUFmLEVBQXNDLFVBQUMsR0FBRCxFQUFTO0FBQ2xELElBQUEsdUJBQU8sSUFBSSxNQUFKLENBQVcsQ0FBWCxFQUFjLFdBQWQsS0FBOEIsSUFBSSxNQUFKLENBQVcsQ0FBWCxFQUFjLFdBQWQsRUFBOUIsQ0FEMkM7aUJBQVQsQ0FBN0MsQ0FEcUI7OztlQUpoQjtRQUFiOztJQ0NPLElBQUksTUFBSixDQUFQO0FBQ0EsSUFBQSxDQUFDLFVBQVUsTUFBVixFQUFrQjtZQUNUO0FBQ0YsSUFBQSxpQkFERSxJQUNGLENBQVksSUFBWixFQUFrQjtrREFEaEIsTUFDZ0I7O0FBQ2QsSUFBQSxpQkFBSyxJQUFMLEdBQVksSUFBWixDQURjO0FBRWQsSUFBQSxpQkFBSyxHQUFMLEdBQVcsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQVgsQ0FGYztBQUdkLElBQUEsaUJBQUssR0FBTCxDQUFTLFlBQVQsQ0FBc0IsSUFBdEIsRUFBNEIsSUFBNUIsRUFIYzthQUFsQjs7cUNBREU7O3VDQU1LLFFBQVE7OztBQUNYLElBQUEsdUJBQU8sT0FBUCxDQUFlLFVBQUMsQ0FBRCxFQUFPO0FBQ2xCLElBQUEsMEJBQUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsRUFBRSxRQUFGLEVBQXJCLEVBRGtCO3FCQUFQLENBQWYsQ0FEVztBQUlYLElBQUEsdUJBQU8sS0FBSyxHQUFMLENBSkk7OzttQkFOYjtZQURTOztBQWNmLElBQUEsV0FBTyxJQUFQLEdBQWMsSUFBZCxDQWRlOztZQWVUO0FBQ0YsSUFBQSxpQkFERSxLQUNGLENBQVksTUFBWixFQUFvQjtrREFEbEIsT0FDa0I7O0FBQ2hCLElBQUEsaUJBQUssTUFBTCxHQUFjLElBQUksS0FBSixFQUFkLENBRGdCO0FBRWhCLElBQUEsZ0JBQUksTUFBTSxTQUFTLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBTjtvQkFBMEMsT0FBTyxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBUCxDQUY5QjtBQUdoQixJQUFBLGlCQUFLLFNBQUwsR0FBaUIsT0FBTyxPQUFQLENBSEQ7QUFJaEIsSUFBQSxnQkFBSSxPQUFPLEtBQVAsRUFBYztBQUNkLElBQUEsb0JBQUksU0FBSixHQUFnQixPQUFPLEtBQVAsQ0FERjtpQkFBbEI7QUFHQSxJQUFBLGdCQUFJLFdBQUosQ0FBZ0IsSUFBaEIsRUFQZ0I7QUFRaEIsSUFBQSxpQkFBSyxHQUFMLEdBQVcsR0FBWCxDQVJnQjthQUFwQjs7cUNBREU7O29DQVdFLFFBQVE7QUFDUixJQUFBLHFCQUFLLE1BQUwsR0FBYyxNQUFkLENBRFE7QUFFUixJQUFBLHVCQUFPLElBQVAsQ0FGUTs7OzsyQ0FJRDs7O0FBQ1AsSUFBQSxxQkFBSyxNQUFMLENBQVksT0FBWixDQUFvQixVQUFDLENBQUQsRUFBTztBQUN2QixJQUFBLDJCQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLEVBQUUsUUFBRixFQUFyQixFQUR1QjtxQkFBUCxDQUFwQixDQURPO0FBSVAsSUFBQSx1QkFBTyxLQUFLLEdBQUwsQ0FKQTs7O21CQWZUO1lBZlM7O0FBcUNmLElBQUEsV0FBTyxLQUFQLEdBQWUsS0FBZixDQXJDZTs7WUFzQ1Q7QUFDRixJQUFBLGlCQURFLElBQ0YsQ0FBWSxNQUFaLEVBQW9CLEtBQXBCLEVBQTJCO2tEQUR6QixNQUN5Qjs7QUFDdkIsSUFBQSxpQkFBSyxNQUFMLEdBQWMsTUFBZCxDQUR1QjtBQUV2QixJQUFBLGlCQUFLLEtBQUwsR0FBYSxLQUFiLENBRnVCO0FBR3ZCLElBQUEsaUJBQUssSUFBTCxHQUFZLE9BQU8sTUFBUCxFQUFaLENBSHVCO0FBSXZCLElBQUEsaUJBQUssR0FBTCxHQUFXLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFYLENBSnVCO0FBS3ZCLElBQUEsZ0JBQUksT0FBTyxLQUFQLEVBQWM7QUFDZCxJQUFBLHFCQUFLLEdBQUwsQ0FBUyxTQUFULEdBQXFCLE9BQU8sS0FBUCxDQURQO2lCQUFsQjthQUxKOztxQ0FERTs7a0RBVWdCO0FBQ2QsSUFBQSxvQkFBSSxNQUFNLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQUFOLENBRFU7QUFFZCxJQUFBLG9CQUFJLFlBQUosQ0FBaUIsSUFBakIsRUFBdUIsS0FBSyxJQUFMLENBQXZCLENBRmM7QUFHZCxJQUFBLG9CQUFJLFlBQUosQ0FBaUIsTUFBakIsRUFBeUIsS0FBSyxJQUFMLENBQXpCLENBSGM7QUFJZCxJQUFBLG9CQUFJLFlBQUosQ0FBaUIsT0FBakIsRUFBMEIsS0FBSyxLQUFMLENBQTFCLENBSmM7QUFLZCxJQUFBLG9CQUFJLFlBQUosQ0FBaUIsYUFBakIsRUFBZ0MsS0FBSyxNQUFMLENBQVksT0FBWixDQUFoQyxDQUxjO0FBTWQsSUFBQSxvQkFBSSxLQUFLLE1BQUwsQ0FBWSxVQUFaLEVBQXdCO0FBQ3hCLElBQUEsd0JBQUksU0FBSixHQUFnQixLQUFLLE1BQUwsQ0FBWSxVQUFaLENBRFE7cUJBQTVCO0FBR0EsSUFBQSx1QkFBTyxHQUFQLENBVGM7Ozs7Z0RBV0Y7QUFDWixJQUFBLG9CQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLE9BQXZCLENBQU4sQ0FEUTtBQUVaLElBQUEsb0JBQUksWUFBSixDQUFpQixLQUFqQixFQUF3QixLQUFLLElBQUwsQ0FBeEIsQ0FGWTtBQUdaLElBQUEsb0JBQUksU0FBSixHQUFnQixLQUFLLE1BQUwsQ0FBWSxPQUFaLENBSEo7QUFJWixJQUFBLHVCQUFPLEdBQVAsQ0FKWTs7O21CQXJCZDtZQXRDUzs7WUFrRVQ7Ozs7Ozs7Ozs7MkNBQ1M7QUFDUCxJQUFBLG9CQUFJLE1BQU0sS0FBSyxlQUFMLEVBQU4sQ0FERztBQUVQLElBQUEsb0JBQUksWUFBSixDQUFpQixNQUFqQixFQUF5QixNQUF6QixFQUZPO0FBR1AsSUFBQSxxQkFBSyxHQUFMLENBQVMsV0FBVCxDQUFxQixLQUFLLGFBQUwsRUFBckIsRUFITztBQUlQLElBQUEscUJBQUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsR0FBckIsRUFKTztBQUtQLElBQUEsdUJBQU8sS0FBSyxHQUFMLENBTEE7OzttQkFEVDtVQUFhLE1BbEVKOztBQTJFZixJQUFBLFdBQU8sSUFBUCxHQUFjLElBQWQsQ0EzRWU7O1lBNEVUOzs7Ozs7Ozs7OzJDQUNTO0FBQ1AsSUFBQSxvQkFBSSxNQUFNLEtBQUssZUFBTCxFQUFOLENBREc7QUFFUCxJQUFBLG9CQUFJLFlBQUosQ0FBaUIsTUFBakIsRUFBeUIsUUFBekIsRUFGTztBQUdQLElBQUEscUJBQUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsS0FBSyxhQUFMLEVBQXJCLEVBSE87QUFJUCxJQUFBLHFCQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLEdBQXJCLEVBSk87QUFLUCxJQUFBLHVCQUFPLEtBQUssR0FBTCxDQUxBOzs7bUJBRFQ7VUFBZSxNQTVFTjs7QUFxRmYsSUFBQSxXQUFPLE1BQVAsR0FBZ0IsTUFBaEIsQ0FyRmU7S0FBbEIsQ0FBRCxDQXNGRyxXQUFXLFNBQVMsRUFBVCxDQUFYLENBdEZIOztBQ0FXQSxnQkFBSixDQUFQO0FBQ0EsSUFBQSxDQUFDLFVBQVUsSUFBVixFQUFnQjtZQUNQO0FBQ0YsSUFBQSxpQkFERSxFQUNGLENBQVksS0FBWixFQUFtQjtrREFEakIsSUFDaUI7O0FBQ2YsSUFBQSxpQkFBSyxNQUFMLEdBQWMsSUFBSSxLQUFKLEVBQWQsQ0FEZTtBQUVmLElBQUEsaUJBQUssTUFBTCxHQUFjLElBQUksS0FBSixFQUFkLENBRmU7QUFHZixJQUFBLGdCQUFJLFNBQVMsS0FBSyxDQUFMLEVBQVE7QUFDakIsSUFBQSxxQkFBSyxLQUFMLEdBQWEsS0FBYixDQURpQjtpQkFBckI7QUFHQSxJQUFBLG1CQUFPLElBQVAsQ0FOZTthQUFuQjs7cUNBREU7OzhDQVNZLE9BQU8sUUFBUTs7O0FBQ3pCLElBQUEsb0JBQUksWUFBWSxLQUFLLE1BQUwsQ0FBWSxNQUFaLENBQW1CLFVBQUMsQ0FBRCxFQUFPO0FBQ3RDLElBQUEsMkJBQU8sRUFBRSxLQUFGLEtBQVksTUFBWixDQUQrQjtxQkFBUCxDQUEvQjt3QkFFQSxzQkFGSjt3QkFFZ0IsUUFBUSxLQUFSLENBSFM7QUFJekIsSUFBQSxvQkFBSSxVQUFVLE1BQVYsSUFBb0IsQ0FBcEIsRUFBdUI7QUFDdkIsSUFBQSw0QkFBUSxJQUFSLENBRHVCO0FBRXZCLElBQUEsaUNBQWE7QUFDVCxJQUFBLGlDQUFTLFVBQVUsQ0FBVixFQUFhLE9BQWIsSUFBd0IsT0FBTyxTQUFQLENBQWlCLE1BQWpCLENBQXhCO0FBQ1QsSUFBQSwrQkFBTyxVQUFVLENBQVYsRUFBYSxLQUFiLElBQXNCLEtBQUssQ0FBTDt5QkFGakMsQ0FGdUI7cUJBQTNCLE1BT0s7QUFDRCxJQUFBLGlDQUFhO0FBQ1QsSUFBQSxpQ0FBUyxPQUFPLFNBQVAsQ0FBaUIsTUFBakIsQ0FBVDt5QkFESixDQURDO3FCQVBMO0FBWUEsSUFBQSx3QkFBUSxLQUFSO0FBQ0ksSUFBQSx5QkFBSyxPQUFMLENBREo7QUFFSSxJQUFBLHlCQUFLLE9BQUw7QUFDSSxJQUFBLDRCQUFJLE1BQU0sS0FBSyxNQUFMLENBQVksTUFBWixDQUFtQixVQUFDLENBQUQsRUFBTztBQUNoQyxJQUFBLG1DQUFPLEVBQUUsS0FBRixLQUFZLEdBQVosQ0FEeUI7NkJBQVAsQ0FBekIsQ0FEUjtBQUlJLElBQUEsNEJBQUksSUFBSSxNQUFKLEdBQWEsQ0FBYixFQUFnQjtBQUNoQixJQUFBLGdDQUFJLFdBQVcsS0FBWCxJQUFvQixLQUFLLENBQUwsRUFBUTtBQUM1QixJQUFBLDJDQUFXLEtBQVgsR0FBbUIsSUFBSSxDQUFKLEVBQU8sS0FBUCxJQUFnQixLQUFLLENBQUwsQ0FEUDtpQ0FBaEM7NkJBREo7QUFLQSxJQUFBLDhCQVRKO0FBRkosSUFBQSxpQkFoQnlCO0FBNkJ6QixJQUFBLDJCQUFXLFVBQVgsR0FBd0IsWUFBTztBQUMzQixJQUFBLHdCQUFJLE1BQU0sTUFBSyxNQUFMLENBQVksTUFBWixDQUFtQixVQUFDLENBQUQsRUFBTztBQUNoQyxJQUFBLCtCQUFPLEVBQUUsS0FBRixJQUFXLEdBQVgsQ0FEeUI7eUJBQVAsQ0FBekIsQ0FEdUI7QUFJM0IsSUFBQSx3QkFBSSxJQUFJLE1BQUosR0FBYSxDQUFiLEVBQWdCO0FBQ2hCLElBQUEsK0JBQU8sSUFBSSxDQUFKLEVBQU8sS0FBUCxJQUFnQixLQUFLLENBQUwsQ0FEUDt5QkFBcEI7QUFHQSxJQUFBLDJCQUFPLEtBQUssQ0FBTCxDQVBvQjtxQkFBTixFQUF6QixDQTdCeUI7QUFzQ3pCLElBQUEsdUJBQU8sVUFBUCxDQXRDeUI7Ozs7c0NBd0N2QixPQUFPOzs7QUFDVCxJQUFBLG9CQUFJLFVBQVUsRUFBVixDQURLO0FBRVQsSUFBQSx1QkFBTyxJQUFQLENBQVksS0FBWixFQUFtQixPQUFuQixDQUEyQixVQUFDLEdBQUQsRUFBUztBQUNoQyxJQUFBLHdCQUFJLE1BQU0sTUFBTSxHQUFOLENBQU4sQ0FENEI7QUFFaEMsSUFBQSxtQ0FBZSw0REFBZjtBQUNJLElBQUEsNkJBQUssUUFBTDtBQUNJLElBQUEsZ0NBQUksTUFBTSxJQUFJQyxPQUFFLEtBQUYsQ0FBUSxPQUFLLGFBQUwsQ0FBbUIsT0FBbkIsRUFBNEIsR0FBNUIsQ0FBWixDQUFOLENBRFI7QUFFSSxJQUFBLGdDQUFJLEdBQUosQ0FBUSxPQUFLLEtBQUwsQ0FBVyxHQUFYLENBQVIsRUFGSjtBQUdJLElBQUEsb0NBQVEsSUFBUixDQUFhLEdBQWIsRUFISjtBQUlJLElBQUEsa0NBSko7QUFESixJQUFBLDZCQU1TLFFBQUw7QUFDSSxJQUFBLG9DQUFRLElBQVIsQ0FBYSxJQUFJQSxPQUFFLElBQUYsQ0FBTyxPQUFLLGFBQUwsQ0FBbUIsT0FBbkIsRUFBNEIsR0FBNUIsQ0FBWCxFQUE2QyxHQUE3QyxDQUFiLEVBREo7QUFFSSxJQUFBLGtDQUZKO0FBTkosSUFBQSw2QkFTUyxRQUFMO0FBQ0ksSUFBQSxvQ0FBUSxJQUFSLENBQWEsSUFBSUEsT0FBRSxNQUFGLENBQVMsT0FBSyxhQUFMLENBQW1CLE9BQW5CLEVBQTRCLEdBQTVCLENBQWIsRUFBK0MsR0FBL0MsQ0FBYixFQURKO0FBRUksSUFBQSxrQ0FGSjtBQVRKLElBQUEscUJBRmdDO3FCQUFULENBQTNCLENBRlM7QUFrQlQsSUFBQSx1QkFBTyxPQUFQLENBbEJTOzs7O3VDQW9CTixLQUFLO0FBQ1IsSUFBQSxvQkFBSSxDQUFDLEdBQUQsRUFBTTtBQUNOLElBQUEsMEJBQU0sSUFBSSxLQUFKLENBQVUsZ0NBQVYsQ0FBTixDQURNO3FCQUFWO0FBR0EsSUFBQSxxQkFBSyxHQUFMLEdBQVcsR0FBWCxDQUpRO0FBS1IsSUFBQSxvQkFBSSxLQUFLLEtBQUwsSUFBYyxLQUFLLENBQUwsRUFBUTtBQUN0QixJQUFBLDBCQUFNLElBQUksS0FBSixDQUFVLDRDQUFWLENBQU4sQ0FEc0I7cUJBQTFCO0FBR0EsSUFBQSxvQkFBSSxLQUFLLElBQUlBLE9BQUUsSUFBRixDQUFPLE9BQU8sTUFBUCxFQUFYLENBQUwsQ0FSSTtBQVNSLElBQUEscUJBQUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsR0FBRyxNQUFILENBQVUsS0FBSyxLQUFMLENBQVcsS0FBSyxLQUFMLENBQXJCLENBQXJCLEVBVFE7QUFVUixJQUFBLHVCQUFPLEtBQUssR0FBTCxDQVZDOzs7OzBDQVlGLFFBQVE7QUFDZCxJQUFBLHFCQUFLLE1BQUwsR0FBYyxNQUFkLENBRGM7QUFFZCxJQUFBLHVCQUFPLElBQVAsQ0FGYzs7OzswQ0FJUjtBQUNOLElBQUEsb0JBQUksS0FBSyxHQUFMLENBQVMsVUFBVCxFQUFxQjtBQUNyQixJQUFBLHlCQUFLLEdBQUwsQ0FBUyxVQUFULENBQW9CLFdBQXBCLENBQWdDLEtBQUssR0FBTCxDQUFoQyxDQURxQjtBQUVyQixJQUFBLDJCQUFPLElBQVAsQ0FGcUI7cUJBQXpCLE1BSUs7QUFDRCxJQUFBLDRCQUFRLElBQVIsQ0FBYSxxQ0FBYixFQURDO3FCQUpMO0FBT0EsSUFBQSx1QkFBTyxLQUFQLENBUk07OzttQkFyRlI7WUFETzs7QUFpR2IsSUFBQSxTQUFLLEVBQUwsR0FBVSxFQUFWLENBakdhO0tBQWhCLENBQUQsQ0FrR0dELGlCQUFTQSxlQUFPLEVBQVAsQ0FBVCxDQWxHSDs7In0=