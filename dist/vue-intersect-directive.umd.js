(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = global || self, factory(global['vue-intersect-directive'] = {}, global.Vue));
}(this, (function (exports, Vue) { 'use strict';

    Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    // --------------------------------------------------------------------------
    // Intersect
    // --------------------------------------------------------------------------
    var Intersect = /** @class */ (function () {
        /**
         *
         */
        function Intersect(vm) {
            this.vm = vm;
        }
        /**
         *
         */
        Intersect.prototype.bind = function (el, binding) {
            return __awaiter(this, void 0, void 0, function () {
                var observerOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.vm.$nextTick()
                            //
                        ];
                        case 1:
                            _a.sent();
                            observerOptions = __assign({}, binding.value.observerOptions);
                            this.interSectionObserver = new IntersectionObserver(this.onIntersectChange.bind(this), observerOptions);
                            this.interSectionObserver.observe(el);
                            //
                            this.el = el;
                            this.options = {
                                true: binding.value.true,
                                false: binding.value.false,
                                disposeWhen: binding.value.disposeWhen,
                            };
                            this.callback = binding.value.onChange;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         *
         */
        Intersect.prototype.unbind = function (el, binding) {
            if (this.interSectionObserver) {
                this.interSectionObserver.unobserve(el);
            }
        };
        /**
         *
         */
        Intersect.prototype.onIntersectChange = function (entries, observer) {
            var entry = entries[0];
            if (!entry)
                return;
            //
            if (entry.isIntersecting) {
                if (this.options.true)
                    this.addStyleOptions(this.options.true);
                if (this.options.false)
                    this.removeStyleOptions(this.options.false);
            }
            else {
                if (this.options.true)
                    this.removeStyleOptions(this.options.true);
                if (this.options.false)
                    this.addStyleOptions(this.options.false);
            }
            //
            if (this.callback) {
                this.callback(entry.isIntersecting, this.el, this.options);
            }
            //
            if (this.options.disposeWhen !== undefined) {
                var shouldDispose = entry.isIntersecting === this.options.disposeWhen;
                if (shouldDispose)
                    this.unbind(this.el);
            }
        };
        /**
         *
         */
        Intersect.prototype.addStyleOptions = function (options) {
            var _a;
            if (Array.isArray(options)) {
                (_a = this.el.classList).add.apply(_a, options);
            }
            else {
                for (var _i = 0, _b = Object.keys(options); _i < _b.length; _i++) {
                    var prop = _b[_i];
                    this.el.style[prop] = options[prop];
                }
            }
        };
        /**
         *
         */
        Intersect.prototype.removeStyleOptions = function (options) {
            var _a;
            if (Array.isArray(options)) {
                (_a = this.el.classList).remove.apply(_a, options);
            }
            else {
                for (var _i = 0, _b = Object.keys(options); _i < _b.length; _i++) {
                    var prop = _b[_i];
                    this.el.style.removeProperty(prop);
                }
            }
        };
        return Intersect;
    }());

    var intersectMap = new Map();
    /**
     *
     */
    var bind = function (el, binding, vnode, oldVnode) {
        var intersect = new Intersect(vnode.context);
        intersectMap.set(el, intersect);
        intersect.bind(el, binding);
    };
    /**
     *
     */
    var unbind = function (el, binding, vnode, oldVnode) {
        var intersect = intersectMap.get(el);
        if (intersect) {
            intersect.unbind(el, binding);
        }
    };
    /**
     *
     */
    var IntersectDirective = {
        bind: bind,
        unbind: unbind,
    };

    var install = function () {
        Vue.directive('intersect', IntersectDirective);
    };
    var VueIntersect = {
        install: install,
    };
    if (window.Vue) {
        Vue.use(VueIntersect.install);
    }

    exports.IntersectDirective = IntersectDirective;
    exports.default = VueIntersect;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
