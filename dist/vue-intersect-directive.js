(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = global || self, factory(global['vue-intersect-directive'] = {}, global.Vue));
}(this, function (exports, Vue) { 'use strict';

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
        Intersect.prototype.onBind = function (el, binding) {
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
        Intersect.prototype.onUnbind = function (el, binding) {
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
                    this.el.style.setProperty(prop, options[prop]);
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
        intersect.onBind(el, binding);
    };
    /**
     *
     */
    var unbind = function (el, binding, vnode, oldVnode) {
        var intersect = intersectMap.get(el);
        if (intersect) {
            intersect.onUnbind(el, binding);
        }
    };
    /**
     *
     */
    var intersectDirective = {
        bind: bind,
        unbind: unbind,
    };

    var install = function (_Vue) {
        Vue.directive('intersect', intersectDirective);
    };
    var VueIntersectPlugin = {
        install: install,
    };
    if (window.Vue) {
        Vue.use(VueIntersectPlugin.install);
    }

    exports.default = VueIntersectPlugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnVlLWludGVyc2VjdC1kaXJlY3RpdmUuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9JbnRlcnNlY3QudHMiLCIuLi9zcmMvaW50ZXJzZWN0LWRpcmVjdGl2ZS50cyIsIi4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmVCaW5kaW5nIH0gZnJvbSAndnVlL3R5cGVzL29wdGlvbnMnXG5pbXBvcnQgVnVlIGZyb20gJ3Z1ZSdcblxudHlwZSBTdHlsZU9wdGlvbnMgPSBzdHJpbmdbXSB8IHsgW3Byb3A6IHN0cmluZ106IGFueSB9XG5cbmludGVyZmFjZSBJbnRlcnNlY3RPcHRpb25zIHtcbiAgb2JzZXJ2ZXJPcHRpb25zPzogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0XG4gIHRydWU/OiBTdHlsZU9wdGlvbnNcbiAgZmFsc2U/OiBTdHlsZU9wdGlvbnNcbiAgb25DaGFuZ2U/OiBJbnRlcnNlY3RDaGFuZ2VIYW5kbGVyXG59XG5cbnR5cGUgSW50ZXJzZWN0Q2hhbmdlSGFuZGxlciA9IChpc0ludGVyU2VjdGluZzogYm9vbGVhbiwgZWw6IEhUTUxFbGVtZW50LCBvcHRpb25zOiBJbnRlcnNlY3RPcHRpb25zKSA9PiBhbnlcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEludGVyc2VjdFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVyc2VjdCB7XG4gIHByb3RlY3RlZCBpbnRlclNlY3Rpb25PYnNlcnZlciE6IEludGVyc2VjdGlvbk9ic2VydmVyXG4gIHByb3RlY3RlZCBlbCE6IEhUTUxFbGVtZW50XG4gIHByb3RlY3RlZCBvcHRpb25zITogSW50ZXJzZWN0T3B0aW9uc1xuICBwcm90ZWN0ZWQgY2FsbGJhY2shOiBJbnRlcnNlY3RDaGFuZ2VIYW5kbGVyXG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IocHJvdGVjdGVkIHZtOiBWdWUpIHt9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgb25CaW5kKGVsOiBIVE1MRWxlbWVudCwgYmluZGluZzogRGlyZWN0aXZlQmluZGluZykge1xuICAgIGF3YWl0IHRoaXMudm0uJG5leHRUaWNrKClcbiAgICAvL1xuICAgIGNvbnN0IG9ic2VydmVyT3B0aW9uczogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0ID0geyAuLi5iaW5kaW5nLnZhbHVlLm9ic2VydmVyT3B0aW9ucyB9XG4gICAgdGhpcy5pbnRlclNlY3Rpb25PYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcih0aGlzLm9uSW50ZXJzZWN0Q2hhbmdlLmJpbmQodGhpcyksIG9ic2VydmVyT3B0aW9ucylcbiAgICB0aGlzLmludGVyU2VjdGlvbk9ic2VydmVyLm9ic2VydmUoZWwpXG4gICAgLy9cbiAgICB0aGlzLmVsID0gZWxcbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICB0cnVlOiBiaW5kaW5nLnZhbHVlLnRydWUsXG4gICAgICBmYWxzZTogYmluZGluZy52YWx1ZS5mYWxzZSxcbiAgICB9XG4gICAgdGhpcy5jYWxsYmFjayA9IGJpbmRpbmcudmFsdWUub25DaGFuZ2VcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgcHVibGljIG9uVW5iaW5kKGVsOiBIVE1MRWxlbWVudCwgYmluZGluZzogRGlyZWN0aXZlQmluZGluZykge1xuICAgIGlmICh0aGlzLmludGVyU2VjdGlvbk9ic2VydmVyKSB7XG4gICAgICB0aGlzLmludGVyU2VjdGlvbk9ic2VydmVyLnVub2JzZXJ2ZShlbClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIHByb3RlY3RlZCBvbkludGVyc2VjdENoYW5nZShlbnRyaWVzOiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5W10sIG9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlcik6IHZvaWQge1xuICAgIGNvbnN0IGVudHJ5OiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5ID0gZW50cmllc1swXVxuICAgIGlmICghZW50cnkpIHJldHVyblxuICAgIC8vXG4gICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLnRydWUpIHRoaXMuYWRkU3R5bGVPcHRpb25zKHRoaXMub3B0aW9ucy50cnVlKVxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5mYWxzZSkgdGhpcy5yZW1vdmVTdHlsZU9wdGlvbnModGhpcy5vcHRpb25zLmZhbHNlKVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLnRydWUpIHRoaXMucmVtb3ZlU3R5bGVPcHRpb25zKHRoaXMub3B0aW9ucy50cnVlKVxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5mYWxzZSkgdGhpcy5hZGRTdHlsZU9wdGlvbnModGhpcy5vcHRpb25zLmZhbHNlKVxuICAgIH1cbiAgICAvL1xuICAgIGlmICh0aGlzLmNhbGxiYWNrKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrKGVudHJ5LmlzSW50ZXJzZWN0aW5nLCB0aGlzLmVsLCB0aGlzLm9wdGlvbnMpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBwcm90ZWN0ZWQgYWRkU3R5bGVPcHRpb25zKG9wdGlvbnM6IFN0eWxlT3B0aW9ucyk6IHZvaWQge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoLi4ub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5rZXlzKG9wdGlvbnMpKSB7XG4gICAgICAgIHRoaXMuZWwuc3R5bGUuc2V0UHJvcGVydHkocHJvcCwgb3B0aW9uc1twcm9wXSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIHByb3RlY3RlZCByZW1vdmVTdHlsZU9wdGlvbnMob3B0aW9uczogU3R5bGVPcHRpb25zKTogdm9pZCB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSguLi5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGNvbnN0IHByb3Agb2YgT2JqZWN0LmtleXMob3B0aW9ucykpIHtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShwcm9wKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmVPcHRpb25zLCBEaXJlY3RpdmVGdW5jdGlvbiwgVk5vZGUgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyBEaXJlY3RpdmVCaW5kaW5nIH0gZnJvbSAndnVlL3R5cGVzL29wdGlvbnMnXG5pbXBvcnQgSW50ZXJzZWN0IGZyb20gJy4vSW50ZXJzZWN0J1xuXG5jb25zdCBpbnRlcnNlY3RNYXA6IE1hcDxIVE1MRWxlbWVudCwgSW50ZXJzZWN0PiA9IG5ldyBNYXA8SFRNTEVsZW1lbnQsIEludGVyc2VjdD4oKVxuXG4vKipcbiAqXG4gKi9cbmNvbnN0IGJpbmQ6IERpcmVjdGl2ZUZ1bmN0aW9uID0gKGVsOiBIVE1MRWxlbWVudCwgYmluZGluZzogRGlyZWN0aXZlQmluZGluZywgdm5vZGU6IFZOb2RlLCBvbGRWbm9kZTogVk5vZGUpID0+IHtcbiAgY29uc3QgaW50ZXJzZWN0OiBJbnRlcnNlY3QgPSBuZXcgSW50ZXJzZWN0KHZub2RlLmNvbnRleHQhKVxuICBpbnRlcnNlY3RNYXAuc2V0KGVsLCBpbnRlcnNlY3QpXG4gIGludGVyc2VjdC5vbkJpbmQoZWwsIGJpbmRpbmcpXG59XG5cbi8qKlxuICpcbiAqL1xuY29uc3QgdW5iaW5kOiBEaXJlY3RpdmVGdW5jdGlvbiA9IChlbDogSFRNTEVsZW1lbnQsIGJpbmRpbmc6IERpcmVjdGl2ZUJpbmRpbmcsIHZub2RlOiBWTm9kZSwgb2xkVm5vZGU6IFZOb2RlKSA9PiB7XG4gIGNvbnN0IGludGVyc2VjdDogSW50ZXJzZWN0IHwgdW5kZWZpbmVkID0gaW50ZXJzZWN0TWFwLmdldChlbClcbiAgaWYgKGludGVyc2VjdCkge1xuICAgIGludGVyc2VjdC5vblVuYmluZChlbCwgYmluZGluZylcbiAgfVxufVxuXG4vKipcbiAqXG4gKi9cbmNvbnN0IGludGVyc2VjdERpcmVjdGl2ZTogRGlyZWN0aXZlT3B0aW9ucyA9IHtcbiAgYmluZCxcbiAgdW5iaW5kLFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbnRlcnNlY3REaXJlY3RpdmVcbiIsImltcG9ydCBpbnRlcnNlY3REaXJlY3RpdmUgZnJvbSAnLi9pbnRlcnNlY3QtZGlyZWN0aXZlJ1xuaW1wb3J0IFZ1ZSwgeyBWdWVDb25zdHJ1Y3RvciwgUGx1Z2luT2JqZWN0LCBQbHVnaW5GdW5jdGlvbiB9IGZyb20gJ3Z1ZSdcblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBWdWU6IFZ1ZSB8IHVuZGVmaW5lZFxuICB9XG59XG5cbmNvbnN0IGluc3RhbGw6IFBsdWdpbkZ1bmN0aW9uPGFueT4gPSAoX1Z1ZTogVnVlQ29uc3RydWN0b3IpID0+IHtcbiAgVnVlLmRpcmVjdGl2ZSgnaW50ZXJzZWN0JywgaW50ZXJzZWN0RGlyZWN0aXZlKVxufVxuXG5jb25zdCBWdWVJbnRlcnNlY3RQbHVnaW46IFBsdWdpbk9iamVjdDxhbnk+ID0ge1xuICBpbnN0YWxsLFxufVxuXG5pZiAod2luZG93LlZ1ZSkge1xuICBWdWUudXNlKFZ1ZUludGVyc2VjdFBsdWdpbi5pbnN0YWxsKVxufVxuXG5leHBvcnQgZGVmYXVsdCBWdWVJbnRlcnNlY3RQbHVnaW5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
