import { Intersection } from './interfaces';

// this may need something more robust like a BST
// at large scales, efficiency is going to get out of hand quickly
export class IntersectionCollection {
  intersections: Intersection[];

  constructor(intersections: Intersection[]) {
    this.intersections = intersections;
    this.intersections.sort((a, b) => a.t - b.t);
  }

  add(intersection: Intersection): void {
    const indexOfFirstLargerTValue = this.intersections.findIndex(element => element.t >= intersection.t);
    if (indexOfFirstLargerTValue === -1) this.intersections.push(intersection);
    else {
      this.intersections.splice(indexOfFirstLargerTValue, 0, intersection);
    }
  }
}
