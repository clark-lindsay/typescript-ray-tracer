import { Material } from '../src/Material';
import { point, vector } from '../src/Tuple';
import { Color } from '../src/Color';
import { PointLight } from '../src/PointLight';
import { lighting } from '../src/lighting';

describe('the reflection of a Material under different conditions', () => {
  it('reflects at full intensity when the light source is behind the eye, and the material is default', () => {
    const material = new Material({});
    const pointBeingLit = point(0, 0, 0);

    const normalAtPointBeingLit = vector(0, 0, -1);
    const eyePosition = point(0, 0, -1);
    const light = new PointLight(new Color(1, 1, 1), point(0, 0, -10));

    expect(
      lighting({ material, light, pointBeingLit, eyePosition, normalAtPointBeingLit }).isEqualTo(
        new Color(1.9, 1.9, 1.9)
      )
    ).toBeTruthy();
  });

  it('lights correctly when the eye is betwwen the light and the surface, but offset by 45 degrees', () => {
    const material = new Material({});
    const pointBeingLit = point(0, 0, 0);

    const normalAtPointBeingLit = vector(0, 0, -1);
    const eyePosition = point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2);
    const light = new PointLight(new Color(1, 1, 1), point(0, 0, -10));

    expect(
      lighting({ material, light, pointBeingLit, eyePosition, normalAtPointBeingLit }).isEqualTo(
        new Color(1.0, 1.0, 1.0)
      )
    ).toBeTruthy();
  });

  it('lights correctly with the eye straight on with the surface and the light source offset by 45 degrees', () => {
    const material = new Material({});
    const pointBeingLit = point(0, 0, 0);

    const normalAtPointBeingLit = vector(0, 0, -1);
    const eyePosition = point(0, 0, -1);
    const light = new PointLight(new Color(1, 1, 1), point(0, 10, -10));

    expect(
      lighting({ material, light, pointBeingLit, eyePosition, normalAtPointBeingLit }).isEqualTo(
        new Color(0.7364, 0.7364, 0.7364)
      )
    ).toBeTruthy();
  });

  it('lights correctly with the eye in the path of the reflection vector', () => {
    const material = new Material({});
    const pointBeingLit = point(0, 0, 0);

    const normalAtPointBeingLit = vector(0, 0, -1);
    const eyePosition = point(0, -Math.sqrt(2) / 2, -Math.sqrt(2) / 2);
    const light = new PointLight(new Color(1, 1, 1), point(0, 10, -10));

    expect(
      lighting({ material, light, pointBeingLit, eyePosition, normalAtPointBeingLit }).isEqualTo(
        new Color(1.6364, 1.6364, 1.6364)
      )
    ).toBeTruthy();
  });
});
