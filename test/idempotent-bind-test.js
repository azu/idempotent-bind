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
    });
});