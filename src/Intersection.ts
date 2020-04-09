import { Sphere } from './Sphere';
import { Ray } from './Ray';
import { HitData } from './interfaces';

export class Intersection {
  t: number;
  actor: Sphere;

  constructor(t: number, actor: Sphere) {
    [this.t, this.actor] = [t, actor];
  }

  hitData(ray: Ray): HitData {
    const t = this.t;
    const actor = this.actor;
    const point = ray.position(this.t);
    const eyePosition = ray.origin;
    let normalAtHit = this.actor.normalAt(point);
    const isInsideActor = normalAtHit.dotProduct(ray.direction.normalize().negate()) < 0 ? true : false;
    normalAtHit = isInsideActor ? normalAtHit.scalarMultiply(-1) : normalAtHit;
    return { t, actor, point, eyePosition, normalAtHit, isInsideActor };
  }
}
