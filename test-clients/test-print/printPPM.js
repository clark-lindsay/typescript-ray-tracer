"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Canvas_1 = require("../../src/Canvas");
const Color_1 = require("../../src/Color");
function writePPMToFile() {
    const canvas = new Canvas_1.Canvas(22, 22);
    canvas.setPixel(0, 0, new Color_1.Color(1.5, 0, 0));
    canvas.setPixel(2, 1, new Color_1.Color(0, 0.5, 0));
    canvas.setPixel(3, 2, new Color_1.Color(-0.5, 0, 1));
    canvas.printToPPM();
}
writePPMToFile();
