import { Canvas } from '../../src/Canvas';
import { Sphere } from '../../src/Sphere';
import { Ray } from '../../src/Ray';
import { range } from '../../src/util';
import { point } from '../../src/Tuple';
import { hit } from '../../src/hit';
import { Color } from '../../src/Color';
import { Material } from '../../src/Material';
import { PointLight } from '../../src/PointLight';
import { lighting } from '../../src/lighting';

export function renderSphere(canvasSize: number): void {
  const canvas = new Canvas(canvasSize, canvasSize);
  const eyePosition = point(0, 0, -5);
  const rayOrigin = point(0, 0, -5);
  const wallZCoordinate = 10;
  const wallSize = 7.0;
  const pixelSizeInWorldUnits = wallSize / canvasSize;
  const sphere = new Sphere({ material: new Material({ color: new Color(0, 1, 1) }) });
  const lightSource = new PointLight(new Color(1, 1, 1), point(-10, 10, -10));

  for (const y of range(0, canvas.height())) {
    const worldYCoordinate = wallSize / 2 - pixelSizeInWorldUnits * y;
    for (const x of range(0, canvas.width())) {
      const worldXCoordinate = -(wallSize / 2) + pixelSizeInWorldUnits * x;
      const rayTarget = point(worldXCoordinate, worldYCoordinate, wallZCoordinate);
      const ray = new Ray(rayOrigin, rayTarget.subtract(rayOrigin).normalize());
      const rayCastResult = hit(ray.intersects(sphere));
      if (rayCastResult) {
        const pointOfImpact = ray.position(rayCastResult.t);
        const normalAtImpact = sphere.normalAt(pointOfImpact);
        const color = lighting({
          material: sphere.material,
          light: lightSource,
          pointBeingLit: pointOfImpact,
          normalAtPointBeingLit: normalAtImpact,
          eyePosition
        });
        canvas.setPixelAt(x, y, color);
      }
    }
  }
  canvas.writePPM('test-clients/sphere-render/sphere');
}

renderSphere(1000);
