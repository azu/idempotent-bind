// LICENSE : MIT
"use strict";
import WeakMap from "es6-weak-map"
var map = new WeakMap();
// for WeakMap Reference, not to use bind
function getGlobal() {
    if (typeof global !== "undefined") {
        return global;
    }
    if (typeof window !== "undefined") {
        return window;
    }
    // web worker
    if (typeof self !== "undefined") {
        return self;
    }
}
function createBind(target, thisArg) {
    var binding = target.bind(thisArg);
    var secondMap = map.get(target);
    if (secondMap == null) {
        secondMap = new WeakMap();
        map.set(target, secondMap);
    }
    // bind(bind(f, this), this) = binding
    map.set(binding, secondMap);
    // bind(f, this) = binding
    secondMap.set(thisArg, binding);
    return binding;
}
function releaseBind(secondMap, thisArg) {
    if (secondMap.has(thisArg)) {
        var boundFn = secondMap.get(thisArg);
        secondMap.delete(thisArg);
        map.delete(boundFn);
    }
}
/**
 * bind target and thisArg, return bound function.
 * @param {Function} target
 * @param {T} thisArg
 * @returns {function(this:T)} the bound function is target.bind(thisArg)
 * @template T
 */
export function bind(target, thisArg) {
    var secondMap = map.get(target);
    // need to save the bound function into WeakMp.
    if (thisArg == null) {
        thisArg = getGlobal();
    }
    // cached
    if (secondMap != null) {
        if (secondMap.has(thisArg)) {
            return secondMap.get(thisArg);
        }
    }
    return createBind(target, thisArg);
}
/**
 * unbind the binding(target, thisArg)
 * manually unbind function.
 * @param {Function} target
 * @param {T} thisArg
 * @returns {function(this:T)} the bound function
 * @template T
 */
export function unbind(target, thisArg) {
    if (typeof target !== "function") {
        throw new Error("target must be function.");
    }
    // need to remove the bound function from WeakMp.
    if (thisArg == null) {
        thisArg = getGlobal();
    }
    if (map.has(target)) {
        let secondMap = map.get(target);
        var boundFn = secondMap.get(thisArg);
        releaseBind(secondMap, thisArg);
        return boundFn;
    }
}
