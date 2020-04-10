import { Tuple, point } from './Tuple';
import { Color } from './Color';
import { Matrix, identityMatrix } from './Matrix';
import { Material } from './Material';
import { Actor } from './interfaces';

export class Sphere implements Actor {
  center: Tuple;
  radius: number;
  color: Color;
  transform: Matrix = identityMatrix(4);
  material: Material;

  constructor({ center = point(0, 0, 0), radius = 1, color = new Color(1, 1, 1), material = new Material() } = {}) {
    [this.center, this.radius, this.color, this.material] = [center, radius, color, material];
  }

  normalAt(pointOnSphere: Tuple): Tuple {
    const objectPoint = this.transform.inverse().multipliedBy(pointOnSphere);
    const objectNormal = objectPoint.subtract(point(0, 0, 0));

    const worldNormal = this.transform
      .inverse()
      .transpose()
      .multipliedBy(objectNormal);
    worldNormal.w = 0;
    return worldNormal.normalize();
  }
}
