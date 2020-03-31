import { Canvas } from '../../src/Canvas';
import { Color } from '../../src/Color';
import { point, Tuple } from '../../src/Tuple';
import { zRotationTransformation, translationTransformation } from '../../src/transformations';

export function drawClockFace() {
  const canvas = new Canvas(400, 400);
  const oneHourInRadians = Math.PI / 6;

  Array(12)
    .fill(point(0, 150, 0))
    .map((value: Tuple, index) => zRotationTransformation(oneHourInRadians * index).multipliedBy(value))
    .map((value: Tuple) => translationTransformation(200, 200, 0).multipliedBy(value))
    .forEach((coordinate: Tuple) => drawPointOntoCanvas(coordinate));
  canvas.writePPM('test-clients/analog-clock/clockFace');

  function drawPointOntoCanvas(coordinates: Tuple) {
    const [flooredX, flooredY] = [Math.floor(coordinates.x), Math.floor(canvas.height() - 1 - coordinates.y)];
    canvas.setPixelAt(flooredX, flooredY, new Color(1, 1, 1));
  }
}

drawClockFace();
