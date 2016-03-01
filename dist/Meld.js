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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVsZC5qcyIsInNvdXJjZXMiOlsiLi4vdG1wL2hlbHBlcnMvQ29tbW9uLmpzIiwiLi4vdG1wL1JlbmRlci5qcyIsIi4uL3RtcC9NZWxkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDb21tb24ge1xuICAgIHN0YXRpYyBoYXNoZXIobGVuID0gNykge1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIGxlbik7XG4gICAgfVxuICAgIHN0YXRpYyB0aXRsZUNhc2Uoc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvKFteXFxXX10rW15cXHMtXSopICovZywgKHR4dCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHR4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHR4dC5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29tbW9uLmpzLm1hcCIsImltcG9ydCB7IENvbW1vbiB9IGZyb20gJ2hlbHBlcnMvQ29tbW9uJztcbmV4cG9ydCB2YXIgUmVuZGVyO1xuKGZ1bmN0aW9uIChSZW5kZXIpIHtcbiAgICBjbGFzcyBSbmRyIHtcbiAgICAgICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIHRoaXMuZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICAgICAgdGhpcy5lbG0uc2V0QXR0cmlidXRlKCdpZCcsIG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJlbmRlcihmaWVsZHMpIHtcbiAgICAgICAgICAgIGZpZWxkcy5mb3JFYWNoKCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbG0uYXBwZW5kQ2hpbGQodi5kZWxpZ2F0ZSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxtO1xuICAgICAgICB9XG4gICAgfVxuICAgIFJlbmRlci5SbmRyID0gUm5kcjtcbiAgICBjbGFzcyBHcm91cCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHN0cnVjdCkge1xuICAgICAgICAgICAgdGhpcy5maWVsZHMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgIGxldCBncnAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmaWVsZHNldCcpLCBsZ25kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGVnZW5kJyk7XG4gICAgICAgICAgICBsZ25kLmlubmVyVGV4dCA9IHN0cnVjdC5kaXNwbGF5O1xuICAgICAgICAgICAgaWYgKHN0cnVjdC5jbGFzcykge1xuICAgICAgICAgICAgICAgIGdycC5jbGFzc05hbWUgPSBzdHJ1Y3QuY2xhc3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBncnAuYXBwZW5kQ2hpbGQobGduZCk7XG4gICAgICAgICAgICB0aGlzLmVsbSA9IGdycDtcbiAgICAgICAgfVxuICAgICAgICBzZXQoZmllbGRzKSB7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcyA9IGZpZWxkcztcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGRlbGlnYXRlKCkge1xuICAgICAgICAgICAgdGhpcy5maWVsZHMuZm9yRWFjaCgodikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxtLmFwcGVuZENoaWxkKHYuZGVsaWdhdGUoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBSZW5kZXIuR3JvdXAgPSBHcm91cDtcbiAgICBjbGFzcyBCaW5kIHtcbiAgICAgICAgY29uc3RydWN0b3Ioc3RydWN0LCB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zdHJ1Y3QgPSBzdHJ1Y3Q7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmhhc2ggPSBDb21tb24uaGFzaGVyKCk7XG4gICAgICAgICAgICB0aGlzLmVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgaWYgKHN0cnVjdC5jbGFzcykge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxtLmNsYXNzTmFtZSA9IHN0cnVjdC5jbGFzcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBnZW5lcmF0ZUVsZW1lbnQoKSB7XG4gICAgICAgICAgICBsZXQgZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5oYXNoKTtcbiAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCB0aGlzLmhhc2gpO1xuICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZSgndmFsdWUnLCB0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgdGhpcy5zdHJ1Y3QuZGlzcGxheSk7XG4gICAgICAgICAgICBpZiAodGhpcy5zdHJ1Y3QuaW5wdXRDbGFzcykge1xuICAgICAgICAgICAgICAgIGVsbS5jbGFzc05hbWUgPSB0aGlzLnN0cnVjdC5pbnB1dENsYXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGVsbTtcbiAgICAgICAgfVxuICAgICAgICBnZW5lcmF0ZUxhYmVsKCkge1xuICAgICAgICAgICAgbGV0IGVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCdmb3InLCB0aGlzLmhhc2gpO1xuICAgICAgICAgICAgZWxtLmlubmVyVGV4dCA9IHRoaXMuc3RydWN0LmRpc3BsYXk7XG4gICAgICAgICAgICByZXR1cm4gZWxtO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsYXNzIFRleHQgZXh0ZW5kcyBCaW5kIHtcbiAgICAgICAgZGVsaWdhdGUoKSB7XG4gICAgICAgICAgICBsZXQgZWxtID0gdGhpcy5nZW5lcmF0ZUVsZW1lbnQoKTtcbiAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xuICAgICAgICAgICAgdGhpcy5lbG0uYXBwZW5kQ2hpbGQodGhpcy5nZW5lcmF0ZUxhYmVsKCkpO1xuICAgICAgICAgICAgdGhpcy5lbG0uYXBwZW5kQ2hpbGQoZWxtKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBSZW5kZXIuVGV4dCA9IFRleHQ7XG4gICAgY2xhc3MgTnVtYmVyIGV4dGVuZHMgQmluZCB7XG4gICAgICAgIGRlbGlnYXRlKCkge1xuICAgICAgICAgICAgbGV0IGVsbSA9IHRoaXMuZ2VuZXJhdGVFbGVtZW50KCk7XG4gICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCd0eXBlJywgJ251bWJlcicpO1xuICAgICAgICAgICAgdGhpcy5lbG0uYXBwZW5kQ2hpbGQodGhpcy5nZW5lcmF0ZUxhYmVsKCkpO1xuICAgICAgICAgICAgdGhpcy5lbG0uYXBwZW5kQ2hpbGQoZWxtKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBSZW5kZXIuTnVtYmVyID0gTnVtYmVyO1xufSkoUmVuZGVyIHx8IChSZW5kZXIgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UmVuZGVyLmpzLm1hcCIsImltcG9ydCB7IFJlbmRlciBhcyByIH0gZnJvbSAnUmVuZGVyJztcbmltcG9ydCB7IENvbW1vbiB9IGZyb20gJ2hlbHBlcnMvQ29tbW9uJztcbmV4cG9ydCB2YXIgTWVsZDtcbihmdW5jdGlvbiAoTWVsZCkge1xuICAgIGNsYXNzIFVpIHtcbiAgICAgICAgY29uc3RydWN0b3IoYmluZHMpIHtcbiAgICAgICAgICAgIHRoaXMuc3RydWN0ID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcyA9IG5ldyBBcnJheSgpO1xuICAgICAgICAgICAgaWYgKGJpbmRzICE9IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmluZHMgPSBiaW5kcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGZpbmRTdHJ1Y3R1cmUod2hpY2gsIHNlYXJjaCkge1xuICAgICAgICAgICAgbGV0IHN0cnVjdHVyZSA9IHRoaXMuc3RydWN0LmZpbHRlcigodikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB2W3doaWNoXSA9PSBzZWFyY2g7XG4gICAgICAgICAgICB9KSwgc2VuZFN0cnVjdCwgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChzdHJ1Y3R1cmUubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2VuZFN0cnVjdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogc3RydWN0dXJlWzBdLmRpc3BsYXkgfHwgQ29tbW9uLnRpdGxlQ2FzZShzZWFyY2gpLFxuICAgICAgICAgICAgICAgICAgICBjbGFzczogc3RydWN0dXJlWzBdLmNsYXNzIHx8IHZvaWQgMCxcbiAgICAgICAgICAgICAgICAgICAgaGlkZTogc3RydWN0dXJlWzBdLmhpZGUgfHwgZmFsc2VcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VuZFN0cnVjdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogQ29tbW9uLnRpdGxlQ2FzZShzZWFyY2gpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAod2hpY2gpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdncm91cCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnZmllbGQnOlxuICAgICAgICAgICAgICAgICAgICB2YXIgdG1wID0gdGhpcy5zdHJ1Y3QuZmlsdGVyKCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdlt3aGljaF0gPT0gJyonO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRtcC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VuZFN0cnVjdC5jbGFzcyA9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZW5kU3RydWN0LmNsYXNzID0gdG1wWzBdLmNsYXNzIHx8IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbmRTdHJ1Y3QuaW5wdXRDbGFzcyA9ICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHRtcCA9IHRoaXMuc3RydWN0LmZpbHRlcigodikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdi5pbnB1dCA9PSAnKic7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHRtcC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0bXBbMF0uY2xhc3MgfHwgdm9pZCAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgIHJldHVybiBzZW5kU3RydWN0O1xuICAgICAgICB9XG4gICAgICAgIGJ1aWxkKGJpbmRzKSB7XG4gICAgICAgICAgICB2YXIgcmV0dXJucyA9IFtdO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoYmluZHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB2YWwgPSBiaW5kc1trZXldLCBwdXNoZXI7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RydWN0ID0gdGhpcy5maW5kU3RydWN0dXJlKCdncm91cCcsIGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN0cnVjdC5oaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdycCA9IG5ldyByLkdyb3VwKHN0cnVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JwLnNldCh0aGlzLmJ1aWxkKHZhbCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hlciA9IGdycDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdHJ1Y3QgPSB0aGlzLmZpbmRTdHJ1Y3R1cmUoJ2ZpZWxkJywga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3RydWN0LmhpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hlciA9IG5ldyByLlRleHQoc3RydWN0LCB2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoZXIgPSBuZXcgci5OdW1iZXIoc3RydWN0LCB2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwdXNoZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJucy5wdXNoKHB1c2hlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmV0dXJucztcbiAgICAgICAgfVxuICAgICAgICByZW5kZXIoZWxtKSB7XG4gICAgICAgICAgICBpZiAoIWVsbSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWVsZDogTm8gSFRNTEVsZW1lbnQgcHJvdmlkZWQuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVsbSA9IGVsbTtcbiAgICAgICAgICAgIGlmICh0aGlzLmJpbmRzID09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWVsZDogRW1wdHkgYmluZCB2YWx1ZXMsIG5vdGhpbmcgdG8gcmVuZGVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgX3IgPSBuZXcgci5SbmRyKENvbW1vbi5oYXNoZXIoKSk7XG4gICAgICAgICAgICB0aGlzLmVsbS5hcHBlbmRDaGlsZChfci5yZW5kZXIodGhpcy5idWlsZCh0aGlzLmJpbmRzKSkpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxtO1xuICAgICAgICB9XG4gICAgICAgIHN0cnVjdHVyZShjb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMuc3RydWN0ID0gY29uZmlnO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZGVzdG9yeSgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVsbS5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbG0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmVsbSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ01lbGQ6IFRoZXJlIHdhcyBubyBlbGVtZW50IHRvIGN1bGwuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgTWVsZC5VaSA9IFVpO1xufSkoTWVsZCB8fCAoTWVsZCA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1NZWxkLmpzLm1hcCJdLCJuYW1lcyI6WyJNZWxkIiwiciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBQWE7Ozs7Ozs7cUNBQ2M7b0JBQVQsNERBQU0saUJBQUc7O0FBQ25CLElBQUEsbUJBQU8sS0FBSyxNQUFMLEdBQWMsUUFBZCxDQUF1QixFQUF2QixFQUEyQixNQUEzQixDQUFrQyxDQUFsQyxFQUFxQyxHQUFyQyxDQUFQLENBRG1COzs7O3NDQUdOLFFBQVE7QUFDckIsSUFBQSxtQkFBTyxPQUFPLE9BQVAsQ0FBZSxxQkFBZixFQUFzQyxVQUFDLEdBQUQsRUFBUztBQUNsRCxJQUFBLHVCQUFPLElBQUksTUFBSixDQUFXLENBQVgsRUFBYyxXQUFkLEtBQThCLElBQUksTUFBSixDQUFXLENBQVgsRUFBYyxXQUFkLEVBQTlCLENBRDJDO2lCQUFULENBQTdDLENBRHFCOzs7ZUFKaEI7UUFBYjs7SUNDTyxJ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