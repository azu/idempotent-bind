// LICENSE : MIT
"use strict";
import assert from "power-assert"
import {bind, unbind} from "../src/idempotent-bind"
describe("idempotent-bind", function () {
    describe("#bind", function () {
        it("bind(bind(f)) === bind(f)", function () {
            var f = function () {
            };
            assert(bind(bind(f, this), this) === bind(f, this));
        });
        it("bind(f) === bind(f)", function () {
            var f = function () {
            };
            assert(bind(f, this) === bind(f, this));
        });
        it("support null binding", function () {
            var f = function () {
            };
            assert(bind(f, null) === bind(f, null));
        });

        it("supports implicit `target` from callee's `this`", function () {
            var f = function () {
            };
            assert(bind.call(f, this) === bind.call(f, this));
        });
    });
    describe("#unbind", function () {
        it("should release binding", function () {
            var f = function () {
            };
            var g = bind(f, this);
            unbind(f, this);
            assert(g !== bind(f, this));
        });
        it("support null binding function", function () {
            var f = function () {
            };
            var g = bind(f, null);
            unbind(f, null);
            assert(g !== bind(f, null));
        });
        it("should return bound function", function () {
            var f = function () {
            };
            var g = bind(f, null);
            assert(g === unbind(f, null));
        });
        it("should release binding for implicit `target`", function () {
            var f = function () {
            };
            var g = bind.call(f, this);
            unbind.call(f, this);
            assert(g !== bind.call(f, this));
        });
    });
});