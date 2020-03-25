"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tuple_1 = require("../../src/Tuple");
const Canvas_1 = require("../../src/Canvas");
const Color_1 = require("../../src/Color");
const projectile = { position: Tuple_1.point(0, 0, 0), velocity: Tuple_1.vector(30, 35, 0) };
const environment = { gravity: Tuple_1.vector(0, -9.81, 0), wind: Tuple_1.vector(3, 1, 2) };
cannon(projectile, environment);
function cannon(projectile, environment) {
    const canvas = new Canvas_1.Canvas(1000, 1000);
    markLocation(0, 0);
    let travellingProjectile = tick(projectile, environment);
    while (travellingProjectile.position.y >= 0) {
        let [x, y] = floorCoordinates(travellingProjectile.position.x, travellingProjectile.position.y);
        if (x >= 0 && x <= 1000 && y >= 0 && y <= 1000) {
            console.log(x, y);
            markLocation(x, y);
        }
        travellingProjectile = tick(travellingProjectile, environment);
    }
    canvas.printToPPM();
    function markLocation(x, y) {
        const projectileColor = new Color_1.Color(0.5, 0, 0.5);
        canvas.setPixel(x, canvas.getHeight() - y - 1, projectileColor);
    }
    function floorCoordinates(x, y) {
        return [Math.floor(x), Math.floor(y)];
    }
}
exports.cannon = cannon;
function tick(projectile, environment) {
    return {
        position: projectile.position.add(projectile.velocity),
        velocity: projectile.velocity.add(environment.gravity).add(environment.wind)
    };
}
