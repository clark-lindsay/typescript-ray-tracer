"use strict";
exports.__esModule = true;
function equal(a, b) {
    var twoToTheNegativeTen = 0.0009765625;
    return Math.abs(a - b) < twoToTheNegativeTen;
}
exports.equal = equal;
