import { Intersection } from './interfaces';

// this may need something more robust like a BST
// at large scales, efficiency is going to get out of hand quickly
export class IntersectionCollection {
  private collection: Intersection[];

  constructor(intersections: Intersection[] = []) {
    this.collection = intersections;
    this.collection.sort((a, b) => a.t - b.t);
  }

  add(intersection: Intersection): void {
    const indexOfFirstLargerTValue = this.collection.findIndex(element => element.t >= intersection.t);
    if (indexOfFirstLargerTValue === -1) this.collection.push(intersection);
    else {
      this.collection.splice(indexOfFirstLargerTValue, 0, intersection);
    }
  }

  intersections(): Intersection[] {
    return this.collection;
  }

  [Symbol.iterator]() {
    return this.intersections().values();
  }
}
