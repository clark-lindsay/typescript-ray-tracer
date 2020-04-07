import { Actor } from './interfaces';
import { PointLight } from './PointLight';

export class World {
  private allActors: Actor[];
  private allLights: PointLight[];

  constructor() {
    [this.allActors, this.allLights] = [[], []];
  }

  actors(): Actor[] {
    return this.allActors;
  }

  lights(): PointLight[] {
    return this.allLights;
  }

  addActor(actor: Actor): void {
    this.allActors.push(actor);
  }

  addLight(light: PointLight): void {
    this.allLights.push(light);
  }
}
