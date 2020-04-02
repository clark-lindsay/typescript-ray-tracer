import { Intersection } from './interfaces';

export class IntersectionCollection {
  intersections: Intersection[];

  constructor(intersections: Intersection[]) {
    this.intersections = intersections;
    this.intersections.sort((a, b) => a.t - b.t);
  }
}
