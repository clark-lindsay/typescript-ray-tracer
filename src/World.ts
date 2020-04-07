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
}
