import { PointLight } from './PointLight';
import { Ray } from './Ray';
import { IntersectionCollection } from './IntersectionCollection';
import { Sphere } from './Sphere';

export class World {
  private allActors: Sphere[];
  private allLights: PointLight[];

  constructor() {
    [this.allActors, this.allLights] = [[], []];
  }

  actors(): Sphere[] {
    return this.allActors;
  }

  lights(): PointLight[] {
    return this.allLights;
  }

  addActor(actor: Sphere): void {
    this.allActors.push(actor);
  }

  addLight(light: PointLight): void {
    this.allLights.push(light);
  }

  intersect(ray: Ray): IntersectionCollection {
    return ray.intersects(this.actors());
  }
}
