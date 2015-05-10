// LICENSE : MIT
"use strict";
import WeakMap from "es6-weak-map"
var map = new WeakMap();
export function bind(target, thisArg) {
    var secondMap = map.get(target);
    // cached
    if (secondMap != null) {
        if (typeof secondMap === "function") {
            return secondMap;
        } else if (secondMap.has(thisArg)) {

            return secondMap.get(thisArg);
        }
    }
    var createBind = function () {
        var binding = target.bind(thisArg);
        var secondMap = map.get(target);
        if (secondMap == null) {
            secondMap = new WeakMap();
            map.set(target, secondMap);
        }
        // bind(bind(f, this), this) = binding
        map.set(binding, binding);
        // bind(f, this) = binding
        secondMap.set(thisArg, binding);
        return binding;
    };
    return createBind();
}
export function unbind(target, thisArg) {
    return target;
}