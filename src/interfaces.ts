import { Color } from './Color';
import { Matrix } from './Matrix';
import { Tuple } from './Tuple';
import { Sphere } from './Sphere';

export interface Actor {
  transform: Matrix;
  color: Color;
}

export interface HitData {
  t: number;
  actor: Sphere;
  point: Tuple;
  directionToEye: Tuple;
  normalAtHit: Tuple;
  isInsideActor: boolean;
}
