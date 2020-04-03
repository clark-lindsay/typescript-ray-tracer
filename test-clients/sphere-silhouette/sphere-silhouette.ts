import { Canvas } from '../../src/Canvas';
import { Sphere } from '../../src/Sphere';
import { Ray } from '../../src/Ray';
import { range } from '../../src/util';
import { point } from '../../src/Tuple';
import { hit } from '../../src/hit';
import { Color } from '../../src/Color';
import { shearTransformation } from '../../src/transformations';

export function drawSilhouette(canvasSize: number): void {
  const canvas = new Canvas(canvasSize, canvasSize);
  const rayOrigin = point(0, 0, -5);
  const hitColor = new Color(1, 1, 1);
  const wallZCoordinate = 10;
  const wallSize = 7.0;
  const pixelSizeInWorldUnits = wallSize / canvasSize;
  const sphere = new Sphere();
  sphere.transform = shearTransformation(1, 0, 0, 0, 0, 0).scale(1, 0.5, 1);

  for (const y of range(0, canvas.height())) {
    const worldYCoordinate = wallSize / 2 - pixelSizeInWorldUnits * y;
    for (const x of range(0, canvas.width())) {
      const worldXCoordinate = -(wallSize / 2) + pixelSizeInWorldUnits * x;
      const rayTarget = point(worldXCoordinate, worldYCoordinate, wallZCoordinate);
      const rayCastResult = hit(new Ray(rayOrigin, rayTarget.subtract(rayOrigin).normalize()).intersects(sphere));
      if (rayCastResult) {
        canvas.setPixelAt(x, y, hitColor);
      }
    }
  }
  canvas.writePPM('test-clients/sphere-silhouette/sphere');
}

drawSilhouette(500);
