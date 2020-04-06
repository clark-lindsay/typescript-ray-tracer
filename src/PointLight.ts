import { Color } from './Color';
import { Tuple, point } from './Tuple';

export class PointLight {
  intensity: Color;
  position: Tuple;

  constructor(intensity = new Color(1, 1, 1), position = point(0, 0, 0)) {
    [this.intensity, this.position] = [intensity, position];
  }
}
