import { Tuple, point } from './Tuple';

export class Sphere {
  center: Tuple;
  radius: number;

  constructor(center = point(0, 0, 0), radius = 1) {
    [this.center, this.radius] = [center, radius];
  }
}
