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

        var Bind = function Bind(struct, value) {
            babelHelpers.classCallCheck(this, Bind);

            this.struct = struct;
            this.value = value;
            this.hash = Common.hasher();
            this.elm = document.createElement('div');
            if (struct.class) {
                this.elm.className = struct.class;
            }
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
                    if (this.struct.inputClass) {
                        elm.className = this.struct.inputClass;
                    }
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
                            display: structure[0].display || search,
                            class: structure[0].class || void 0
                        };
                    } else {
                        sendStruct = {
                            display: search
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVsZC5qcyIsInNvdXJjZXMiOlsiLi4vdG1wL2hlbHBlcnMvQ29tbW9uLmpzIiwiLi4vdG1wL1JlbmRlci5qcyIsIi4uL3RtcC9NZWxkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDb21tb24ge1xuICAgIHN0YXRpYyBoYXNoZXIobGVuID0gNykge1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIGxlbik7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29tbW9uLmpzLm1hcCIsImltcG9ydCB7IENvbW1vbiB9IGZyb20gJ2hlbHBlcnMvQ29tbW9uJztcbmV4cG9ydCB2YXIgUmVuZGVyO1xuKGZ1bmN0aW9uIChSZW5kZXIpIHtcbiAgICBjbGFzcyBSbmRyIHtcbiAgICAgICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIHRoaXMuZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICAgICAgdGhpcy5lbG0uc2V0QXR0cmlidXRlKCdpZCcsIG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJlbmRlcihmaWVsZHMpIHtcbiAgICAgICAgICAgIGZpZWxkcy5mb3JFYWNoKCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbG0uYXBwZW5kQ2hpbGQodi5kZWxpZ2F0ZSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxtO1xuICAgICAgICB9XG4gICAgfVxuICAgIFJlbmRlci5SbmRyID0gUm5kcjtcbiAgICBjbGFzcyBHcm91cCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHN0cnVjdCkge1xuICAgICAgICAgICAgdGhpcy5maWVsZHMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgIGxldCBncnAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmaWVsZHNldCcpLCBsZ25kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGVnZW5kJyk7XG4gICAgICAgICAgICBsZ25kLmlubmVyVGV4dCA9IHN0cnVjdC5kaXNwbGF5O1xuICAgICAgICAgICAgaWYgKHN0cnVjdC5jbGFzcykge1xuICAgICAgICAgICAgICAgIGdycC5jbGFzc05hbWUgPSBzdHJ1Y3QuY2xhc3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBncnAuYXBwZW5kQ2hpbGQobGduZCk7XG4gICAgICAgICAgICB0aGlzLmVsbSA9IGdycDtcbiAgICAgICAgfVxuICAgICAgICBzZXQoZmllbGRzKSB7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcyA9IGZpZWxkcztcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGRlbGlnYXRlKCkge1xuICAgICAgICAgICAgdGhpcy5maWVsZHMuZm9yRWFjaCgodikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxtLmFwcGVuZENoaWxkKHYuZGVsaWdhdGUoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBSZW5kZXIuR3JvdXAgPSBHcm91cDtcbiAgICBjbGFzcyBCaW5kIHtcbiAgICAgICAgY29uc3RydWN0b3Ioc3RydWN0LCB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zdHJ1Y3QgPSBzdHJ1Y3Q7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmhhc2ggPSBDb21tb24uaGFzaGVyKCk7XG4gICAgICAgICAgICB0aGlzLmVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgaWYgKHN0cnVjdC5jbGFzcykge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxtLmNsYXNzTmFtZSA9IHN0cnVjdC5jbGFzcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGFzcyBUZXh0IGV4dGVuZHMgQmluZCB7XG4gICAgICAgIGRlbGlnYXRlKCkge1xuICAgICAgICAgICAgbGV0IGVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICB0aGlzLmVsbS5hcHBlbmRDaGlsZChlbG0pO1xuICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XG4gICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCduYW1lJywgdGhpcy5oYXNoKTtcbiAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgdGhpcy52YWx1ZSk7XG4gICAgICAgICAgICBpZiAodGhpcy5zdHJ1Y3QuaW5wdXRDbGFzcykge1xuICAgICAgICAgICAgICAgIGVsbS5jbGFzc05hbWUgPSB0aGlzLnN0cnVjdC5pbnB1dENsYXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxtO1xuICAgICAgICB9XG4gICAgfVxuICAgIFJlbmRlci5UZXh0ID0gVGV4dDtcbn0pKFJlbmRlciB8fCAoUmVuZGVyID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVJlbmRlci5qcy5tYXAiLCJpbXBvcnQgeyBSZW5kZXIgYXMgciB9IGZyb20gJ1JlbmRlcic7XG5pbXBvcnQgeyBDb21tb24gfSBmcm9tICdoZWxwZXJzL0NvbW1vbic7XG5leHBvcnQgdmFyIE1lbGQ7XG4oZnVuY3Rpb24gKE1lbGQpIHtcbiAgICBjbGFzcyBVaSB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGJpbmRzKSB7XG4gICAgICAgICAgICB0aGlzLnN0cnVjdCA9IG5ldyBBcnJheSgpO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgIGlmIChiaW5kcyAhPSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRzID0gYmluZHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBmaW5kU3RydWN0dXJlKHdoaWNoLCBzZWFyY2gpIHtcbiAgICAgICAgICAgIGxldCBzdHJ1Y3R1cmUgPSB0aGlzLnN0cnVjdC5maWx0ZXIoKHYpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdlt3aGljaF0gPT0gc2VhcmNoO1xuICAgICAgICAgICAgfSksIHNlbmRTdHJ1Y3QsIGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoc3RydWN0dXJlLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNlbmRTdHJ1Y3QgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHN0cnVjdHVyZVswXS5kaXNwbGF5IHx8IHNlYXJjaCxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6IHN0cnVjdHVyZVswXS5jbGFzcyB8fCB2b2lkIDBcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VuZFN0cnVjdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogc2VhcmNoXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAod2hpY2gpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdncm91cCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnZmllbGQnOlxuICAgICAgICAgICAgICAgICAgICB2YXIgdG1wID0gdGhpcy5zdHJ1Y3QuZmlsdGVyKCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdlt3aGljaF0gPT0gJyonO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRtcC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VuZFN0cnVjdC5jbGFzcyA9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZW5kU3RydWN0LmNsYXNzID0gdG1wWzBdLmNsYXNzIHx8IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbmRTdHJ1Y3QuaW5wdXRDbGFzcyA9ICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHRtcCA9IHRoaXMuc3RydWN0LmZpbHRlcigodikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdi5pbnB1dCA9PSAnKic7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHRtcC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0bXBbMF0uY2xhc3MgfHwgdm9pZCAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgIHJldHVybiBzZW5kU3RydWN0O1xuICAgICAgICB9XG4gICAgICAgIGJ1aWxkKGJpbmRzKSB7XG4gICAgICAgICAgICB2YXIgcmV0dXJucyA9IFtdO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoYmluZHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB2YWwgPSBiaW5kc1trZXldO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIHZhbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdycCA9IG5ldyByLkdyb3VwKHRoaXMuZmluZFN0cnVjdHVyZSgnZ3JvdXAnLCBrZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdycC5zZXQodGhpcy5idWlsZCh2YWwpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybnMucHVzaChncnApO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5zLnB1c2gobmV3IHIuVGV4dCh0aGlzLmZpbmRTdHJ1Y3R1cmUoJ2ZpZWxkJywga2V5KSwgdmFsKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5zO1xuICAgICAgICB9XG4gICAgICAgIHJlbmRlcihlbG0pIHtcbiAgICAgICAgICAgIGlmICghZWxtKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNZWxkOiBObyBIVE1MRWxlbWVudCBwcm92aWRlZC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZWxtID0gZWxtO1xuICAgICAgICAgICAgaWYgKHRoaXMuYmluZHMgPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNZWxkOiBFbXB0eSBiaW5kIHZhbHVlcywgbm90aGluZyB0byByZW5kZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBfciA9IG5ldyByLlJuZHIoQ29tbW9uLmhhc2hlcigpKTtcbiAgICAgICAgICAgIHRoaXMuZWxtLmFwcGVuZENoaWxkKF9yLnJlbmRlcih0aGlzLmJ1aWxkKHRoaXMuYmluZHMpKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbG07XG4gICAgICAgIH1cbiAgICAgICAgc3RydWN0dXJlKGNvbmZpZykge1xuICAgICAgICAgICAgdGhpcy5zdHJ1Y3QgPSBjb25maWc7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBkZXN0b3J5KCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWxtLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZWxtKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignTWVsZDogVGhlcmUgd2FzIG5vIGVsZW1lbnQgdG8gY3VsbC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBNZWxkLlVpID0gVWk7XG59KShNZWxkIHx8IChNZWxkID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU1lbGQuanMubWFwIl0sIm5hbWVzIjpbIk1lbGQiLCJyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFBYTs7Ozs7OztxQ0FDYztvQkFBVCw0REFBTSxpQkFBRzs7QUFDbkIsSUFBQSxtQkFBTyxLQUFLLE1BQUwsR0FBYyxRQUFkLENBQXVCLEVBQXZCLEVBQTJCLE1BQTNCLENBQWtDLENBQWxDLEVBQXFDLEdBQXJDLENBQVAsQ0FEbUI7OztlQURkO1FBQWI7O0lDQ08sSUFBSSxNQUFKLENBQVA7QUFDQSxJQUFBLENBQUMsVUFBVSxNQUFWLEVBQWtCO1lBQ1Q7QUFDRixJQUFBLGlCQURFLElBQ0YsQ0FBWSxJQUFaLEVBQWtCO2tEQURoQixNQUNnQjs7QUFDZCxJQUFBLGlCQUFLLElBQUwsR0FBWSxJQUFaLENBRGM7QUFFZCxJQUFBLGlCQUFLLEdBQUwsR0FBVyxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBWCxDQUZjO0FBR2QsSUFBQSxpQkFBSyxHQUFMLENBQVMsWUFBVCxDQUFzQixJQUF0QixFQUE0QixJQUE1QixFQUhjO2FBQWxCOztxQ0FE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