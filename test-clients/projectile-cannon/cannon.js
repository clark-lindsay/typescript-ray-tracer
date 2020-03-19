"use strict";
exports.__esModule = true;
var Tuple_1 = require("../../src/Tuple");
function cannon(projectile, environment) {
    var travellingProjectile = tick(projectile, environment);
    while (travellingProjectile.position.y >= 0) {
        travellingProjectile = tick(travellingProjectile, environment);
    }
    console.log(travellingProjectile.position);
}
exports.cannon = cannon;
function tick(projectile, environment) {
    return {
        position: projectile.position.add(projectile.velocity),
        velocity: projectile.velocity.add(environment.gravity).add(environment.wind)
    };
}
var projectile = { position: Tuple_1.point(0, 0, 0), velocity: Tuple_1.vector(10, 5, 0) };
var environment = { gravity: Tuple_1.vector(0, -3, 0), wind: Tuple_1.vector(3, 1, 2) };
cannon(projectile, environment);
