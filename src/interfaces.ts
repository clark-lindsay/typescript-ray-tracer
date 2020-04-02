import { Color } from './Color';

export class Intersection {
  t: number;
  object: Actor;

  constructor(t: number, object: Actor) {
    [this.t, this.object] = [t, object];
  }
}

export interface Actor {
  color: Color;
}
