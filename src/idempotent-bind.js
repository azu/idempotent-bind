// LICENSE : MIT
"use strict";
import WeakMap from "es6-weak-map"
var map = new WeakMap();
export function bind(target, thisArg) {
    var secondMap = map.get(target);
    // cached
    if (secondMap != null && secondMap.has(thisArg)) {
        var binding = secondMap.get(thisArg);
        return binding;
    }
    var createBind = function () {
        var binding = target.bind(thisArg);
        var secondMap = map.get(target);
        if (secondMap == null) {
            secondMap = new WeakMap();
            map.set(target, secondMap);
        }
        secondMap.set(thisArg, binding);
        return binding;
    };
    return createBind();
}
export function unbind(target, thisArg) {
    return target;
}