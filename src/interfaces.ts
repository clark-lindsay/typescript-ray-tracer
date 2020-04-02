import { Color } from './Color';
import { Matrix } from './Matrix';

export class Intersection {
  t: number;
  object: Actor;

  constructor(t: number, object: Actor) {
    [this.t, this.object] = [t, object];
  }
}

export interface Actor {
  transform: Matrix;
  color: Color;
}
