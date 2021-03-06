import { Intersection } from './Intersection';
import { IntersectionCollection } from './IntersectionCollection';

export function hit(intersectionCollection: IntersectionCollection): Intersection | null {
  const intersections = intersectionCollection.intersections();
  if (intersections.length === 0) return null;

  const indexOfLowestNonNegative = intersections.findIndex(intersection => intersection.t >= 0);
  if (indexOfLowestNonNegative !== -1) {
    return intersections[indexOfLowestNonNegative];
  }
  return null;
}
