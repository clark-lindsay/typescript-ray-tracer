import { PointLight } from './PointLight';
import { Ray } from './Ray';
import { IntersectionCollection } from './IntersectionCollection';
import { Sphere } from './Sphere';
import { HitData } from './interfaces';
import { Color } from './Color';
import { lighting } from './lighting';

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

  shadeFromHitData(hitData: HitData): Color {
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
