"use strict";
exports.__esModule = true;
var equal_1 = require("./equal");
var Tuple = /** @class */ (function () {
    function Tuple(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    Tuple.prototype.add = function (other) {
        return new Tuple(this.x + other.x, this.y + other.y, this.z + other.z, this.w + other.w);
    };
    Tuple.prototype.subtract = function (other) {
        return new Tuple(this.x - other.x, this.y - other.y, this.z - other.z, this.w - other.w);
    };
    Tuple.prototype.scalarMultiply = function (scalar) {
        var dimensions = [this.x, this.y, this.z, this.w].map(function (num) { return num * scalar; });
        return new Tuple(dimensions[0], dimensions[1], dimensions[2], dimensions[3]);
    };
    Tuple.prototype.scalarDivide = function (scalar) {
        var scaledDimensions = [this.x, this.y, this.z, this.w].map(function (num) { return num / scalar; });
        return new Tuple(scaledDimensions[0], scaledDimensions[1], scaledDimensions[2], scaledDimensions[3]);
    };
    Tuple.prototype.magnitude = function () {
        var dimensions = [this.x, this.y, this.z, this.w];
        return Math.sqrt(dimensions.map(function (num) { return Math.pow(num, 2); }).reduce(function (accumulator, num) { return accumulator + num; }));
    };
    Tuple.prototype.normalize = function () {
        if (this.isAPoint()) {
            throw new Error('"normalize" can not be called on a point; it does not make mathematical sense');
        }
        return this.scalarDivide(this.magnitude());
    };
    Tuple.prototype.dotProduct = function (other) {
        if (this.isAPoint() || other.isAPoint()) {
            throw new Error('"dotProduct" cannot have a point as either of its arguments; this calculation is meaningless when it involves a point');
        }
        var dimensions = [this.x, this.y, this.z, this.w];
        var otherDimensions = [other.x, other.y, other.z, other.w];
        return dimensions.map(function (num, index) { return num * otherDimensions[index]; }).reduce(function (accumulator, num) { return accumulator + num; });
    };
    Tuple.prototype.crossProduct = function (other) {
        if (this.isAPoint() || other.isAPoint()) {
            throw new Error('"crossProduct" cannot have a point as either of its arguments; this calculation is meaningless when it involves a point');
        }
        return vector(this.y * other.z - this.z * other.y, this.z * other.x - this.x * other.z, this.x * other.y - this.y * other.x);
    };
    Tuple.prototype.negate = function () {
        return this.scalarMultiply(-1);
    };
    Tuple.prototype.isAPoint = function () {
        return this.w === 1;
    };
    Tuple.prototype.isAVector = function () {
        return this.w === 0;
    };
    Tuple.prototype.isEqualTo = function (other) {
        return equal_1.equal(this.x, other.x) && equal_1.equal(this.y, other.y) && equal_1.equal(this.z, other.z) && equal_1.equal(this.w, other.w);
    };
    return Tuple;
}());
exports.Tuple = Tuple;
function point(x, y, z) {
    return new Tuple(x, y, z, 1);
}
exports.point = point;
function vector(x, y, z) {
    return new Tuple(x, y, z, 0);
}
exports.vector = vector;
