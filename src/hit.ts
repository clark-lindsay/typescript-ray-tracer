import { Intersection } from './interfaces';

export function hit(intersections: Intersection[]): Intersection | null {
  if (intersections.length === 0) return null;
  return intersections[0];
}
