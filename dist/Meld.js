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

        var Bind = function Bind(name, value) {
            babelHelpers.classCallCheck(this, Bind);

            this.name = name;
            this.value = value;
            this.hash = Common.hasher();
            this.elm = document.createElement('div');
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
                key: 'build',
                value: function build(binds) {
                    var _this = this;

                    var returns = [];
                    Object.keys(binds).forEach(function (key) {
                        var val = binds[key];
                        switch (typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) {
                            case 'object':
                                var structure = _this.struct.filter(function (v) {
                                    return v.group == key;
                                }),
                                    sendStruct = undefined;
                                if (structure.length > 0) {
                                    sendStruct = {
                                        display: structure[0].display || key,
                                        class: structure[0].class || void 0
                                    };
                                } else {
                                    sendStruct = {
                                        display: key
                                    };
                                }
                                var grp = new Render.Group(sendStruct);
                                grp.set(_this.build(val));
                                returns.push(grp);
                                break;
                            case 'string':
                                returns.push(new Render.Text(key, val));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVsZC5qcyIsInNvdXJjZXMiOlsiLi4vdG1wL2hlbHBlcnMvQ29tbW9uLmpzIiwiLi4vdG1wL1JlbmRlci5qcyIsIi4uL3RtcC9NZWxkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDb21tb24ge1xuICAgIHN0YXRpYyBoYXNoZXIobGVuID0gNykge1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIGxlbik7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29tbW9uLmpzLm1hcCIsImltcG9ydCB7IENvbW1vbiB9IGZyb20gJ2hlbHBlcnMvQ29tbW9uJztcbmV4cG9ydCB2YXIgUmVuZGVyO1xuKGZ1bmN0aW9uIChSZW5kZXIpIHtcbiAgICBjbGFzcyBSbmRyIHtcbiAgICAgICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIHRoaXMuZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICAgICAgdGhpcy5lbG0uc2V0QXR0cmlidXRlKCdpZCcsIG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJlbmRlcihmaWVsZHMpIHtcbiAgICAgICAgICAgIGZpZWxkcy5mb3JFYWNoKCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbG0uYXBwZW5kQ2hpbGQodi5kZWxpZ2F0ZSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxtO1xuICAgICAgICB9XG4gICAgfVxuICAgIFJlbmRlci5SbmRyID0gUm5kcjtcbiAgICBjbGFzcyBHcm91cCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHN0cnVjdCkge1xuICAgICAgICAgICAgdGhpcy5maWVsZHMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgIGxldCBncnAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmaWVsZHNldCcpLCBsZ25kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGVnZW5kJyk7XG4gICAgICAgICAgICBsZ25kLmlubmVyVGV4dCA9IHN0cnVjdC5kaXNwbGF5O1xuICAgICAgICAgICAgaWYgKHN0cnVjdC5jbGFzcykge1xuICAgICAgICAgICAgICAgIGdycC5jbGFzc05hbWUgPSBzdHJ1Y3QuY2xhc3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBncnAuYXBwZW5kQ2hpbGQobGduZCk7XG4gICAgICAgICAgICB0aGlzLmVsbSA9IGdycDtcbiAgICAgICAgfVxuICAgICAgICBzZXQoZmllbGRzKSB7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcyA9IGZpZWxkcztcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGRlbGlnYXRlKCkge1xuICAgICAgICAgICAgdGhpcy5maWVsZHMuZm9yRWFjaCgodikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxtLmFwcGVuZENoaWxkKHYuZGVsaWdhdGUoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBSZW5kZXIuR3JvdXAgPSBHcm91cDtcbiAgICBjbGFzcyBCaW5kIHtcbiAgICAgICAgY29uc3RydWN0b3IobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmhhc2ggPSBDb21tb24uaGFzaGVyKCk7XG4gICAgICAgICAgICB0aGlzLmVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsYXNzIFRleHQgZXh0ZW5kcyBCaW5kIHtcbiAgICAgICAgZGVsaWdhdGUoKSB7XG4gICAgICAgICAgICBsZXQgZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIHRoaXMuZWxtLmFwcGVuZENoaWxkKGVsbSk7XG4gICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcbiAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCB0aGlzLmhhc2gpO1xuICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZSgndmFsdWUnLCB0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBSZW5kZXIuVGV4dCA9IFRleHQ7XG59KShSZW5kZXIgfHwgKFJlbmRlciA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1SZW5kZXIuanMubWFwIiwiaW1wb3J0IHsgUmVuZGVyIGFzIHIgfSBmcm9tICdSZW5kZXInO1xuaW1wb3J0IHsgQ29tbW9uIH0gZnJvbSAnaGVscGVycy9Db21tb24nO1xuZXhwb3J0IHZhciBNZWxkO1xuKGZ1bmN0aW9uIChNZWxkKSB7XG4gICAgY2xhc3MgVWkge1xuICAgICAgICBjb25zdHJ1Y3RvcihiaW5kcykge1xuICAgICAgICAgICAgdGhpcy5zdHJ1Y3QgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgICBpZiAoYmluZHMgIT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kcyA9IGJpbmRzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgYnVpbGQoYmluZHMpIHtcbiAgICAgICAgICAgIHZhciByZXR1cm5zID0gW107XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhiaW5kcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbCA9IGJpbmRzW2tleV07XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RydWN0dXJlID0gdGhpcy5zdHJ1Y3QuZmlsdGVyKCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHYuZ3JvdXAgPT0ga2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSksIHNlbmRTdHJ1Y3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RydWN0dXJlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZW5kU3RydWN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBzdHJ1Y3R1cmVbMF0uZGlzcGxheSB8fCBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBzdHJ1Y3R1cmVbMF0uY2xhc3MgfHwgdm9pZCAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRTdHJ1Y3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGtleVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JwID0gbmV3IHIuR3JvdXAoc2VuZFN0cnVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBncnAuc2V0KHRoaXMuYnVpbGQodmFsKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5zLnB1c2goZ3JwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJucy5wdXNoKG5ldyByLlRleHQoa2V5LCB2YWwpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJldHVybnM7XG4gICAgICAgIH1cbiAgICAgICAgcmVuZGVyKGVsbSkge1xuICAgICAgICAgICAgaWYgKCFlbG0pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01lbGQ6IE5vIEhUTUxFbGVtZW50IHByb3ZpZGVkLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5lbG0gPSBlbG07XG4gICAgICAgICAgICBpZiAodGhpcy5iaW5kcyA9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01lbGQ6IEVtcHR5IGJpbmQgdmFsdWVzLCBub3RoaW5nIHRvIHJlbmRlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IF9yID0gbmV3IHIuUm5kcihDb21tb24uaGFzaGVyKCkpO1xuICAgICAgICAgICAgdGhpcy5lbG0uYXBwZW5kQ2hpbGQoX3IucmVuZGVyKHRoaXMuYnVpbGQodGhpcy5iaW5kcykpKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsbTtcbiAgICAgICAgfVxuICAgICAgICBzdHJ1Y3R1cmUoY29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLnN0cnVjdCA9IGNvbmZpZztcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGRlc3RvcnkoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbG0ucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5lbG0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdNZWxkOiBUaGVyZSB3YXMgbm8gZWxlbWVudCB0byBjdWxsLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIE1lbGQuVWkgPSBVaTtcbn0pKE1lbGQgfHwgKE1lbGQgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TWVsZC5qcy5tYXAiXSwibmFtZXMiOlsiTWVsZCIsInIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQUFhOzs7Ozs7O3FDQUNjO29CQUFULDREQUFNLGlCQUFHOztBQUNuQixJQUFBLG1CQUFPLEtBQUssTUFBTCxHQUFjLFFBQWQsQ0FBdUIsRUFBdkIsRUFBMkIsTUFBM0IsQ0FBa0MsQ0FBbEMsRUFBcUMsR0FBckMsQ0FBUCxDQURtQjs7O2VBRGQ7UUFBYjs7SUNDTyxJQUFJLE1BQUosQ0FBUDtBQUNBLElBQUEsQ0FBQyxVQUFVLE1BQVYsRUFBa0I7WUFDVDtBQUNGLElBQUEsaUJBREUsSUFDRixDQUFZLElBQVosRUFBa0I7a0RBRGhCLE1BQ2dCOztBQUNkLElBQUEsaUJBQUssSUFBTCxHQUFZLElBQVosQ0FEYztBQUVkLElBQUEsaUJBQUssR0FBTCxHQUFXLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFYLENBRmM7QUFHZCxJQUFBLGlCQUFLLEdBQUwsQ0FBUyxZQUFULENBQXNCLElBQXRCLEVBQTRCLElBQTVCLEVBSGM7YUFBbEI7O3FDQURFOzt1Q0FNSyxRQUFROzs7QUFDWCxJQUFBLHVCQUFPLE9BQVAsQ0FBZSxVQUFDLENBQUQsRUFBTztBQUNsQixJQUFBLDBCQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLEVBQUUsUUFBRixFQUFyQixFQURrQjtxQkFBUCxDQUFmLENBRFc7QUFJWCxJQUFBLHVCQUFPLEtBQUssR0FBTCxDQUpJ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