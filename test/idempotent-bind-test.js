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
    });
    describe("#unbind", function () {
        it("should release binding", function () {
            var f = function () {
            };
            var g = bind(f, this);
            unbind(f, this);
            assert(g !== bind(f, this));
        });
    });
});