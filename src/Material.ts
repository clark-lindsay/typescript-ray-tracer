import { Color } from './Color';

export class Material {
  color: Color;
  ambient: number;
  diffuse: number;
  specular: number;
  shininess: number;

  constructor({ color = new Color(1, 1, 1), ambient = 0.1, diffuse = 0.9, specular = 0.9, shininess = 200 } = {}) {
    [this.color, this.ambient, this.diffuse, this.specular, this.shininess] = [
      color,
      ambient,
      diffuse,
      specular,
      shininess
    ];
  }
}
