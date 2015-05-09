// LICENSE : MIT
"use strict";
import assert from "power-assert"
import {bind, unbind} from "../src/idempotent-bind"
describe("idempotent-bind", function () {
    describe("#bind", function () {
        it("is idempotent", function () {
            var f = function () {
            };
            assert(bind(bind(f, this), this) === bind(f, this))
        });
    });
    describe("#unbind", function () {
        it("should release existing binding", function () {
            var f = function () {
            };
            var g = bind(f, this);
            unbind(f, this);// release
            assert(g !== bind(f, this))
        });
    });
});