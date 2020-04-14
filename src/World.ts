import { PointLight } from './PointLight';
import { Ray } from './Ray';
import { IntersectionCollection } from './IntersectionCollection';
import { Sphere } from './Sphere';
import { HitData } from './interfaces';
import { Color } from './Color';
import { Tuple } from './Tuple';
import { lighting } from './lighting';
import { hit } from './hit';

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

  colorAtHit(ray: Ray): Color {
    const firstIntersection = hit(this.intersect(ray));
    if (firstIntersection) {
      return this.shadeFromHitData(firstIntersection.hitData(ray));
    }
    return new Color(0, 0, 0);
  }

  isShadowed(point: Tuple, light: PointLight): boolean {
    const pointToLight = light.position.subtract(point);
    const distance = pointToLight.magnitude();
    const directionToLight = new Ray(point, pointToLight.normalize());
    const possibleObstruction = hit(this.intersect(directionToLight));
    if (possibleObstruction && possibleObstruction.t < distance) {
      return true;
    }
    return false;
  }

  private shadeFromHitData(hitData: HitData): Color {
    return this.allLights
      .map(light =>
        lighting({
          material: hitData.actor.material,
          light,
          pointBeingLit: hitData.point,
          eyePosition: hitData.eyePosition,
          normalAtPointBeingLit: hitData.normalAtHit
        })
      )
      .reduce((accumulator, currentValue) => accumulator.add(currentValue));
  }
}
