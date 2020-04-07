import { World } from '../src/World';
import { PointLight } from '../src/PointLight';
import { Color } from '../src/Color';
import { point } from '../src/Tuple';
import { Sphere } from '../src/Sphere';
import { Material } from '../src/Material';
import { scalingTransformation } from '../src/transformations';

describe('The World class', () => {
  it('is initialized with no Actors and no light sources when its default constructor is called', () => {
    const world = new World();

    expect(world.actors()).toHaveLength(0);
    expect(world.lights()).toHaveLength(0);
  });
});

describe('the "defaultWorld" test set-up function', () => {
  it('creates a world with a light source and two concentric spheres', () => {
    const light = new PointLight(new Color(1, 1, 1), point(-10, 10, -10));
    const outerSphere = new Sphere({
      material: new Material({ color: new Color(0.8, 1.0, 0.6), diffuse: 0.7, specular: 0.2 })
    });
    const innerSphere = new Sphere({});
    innerSphere.transform = scalingTransformation(0.5, 0.5, 0.5);

    const world = defaultWorld();

    expect(world.actors().find(actor => actor.color.isEqualTo(outerSphere.color))).toBeTruthy();
    expect(world.actors().find(actor => actor.transform.isEqualTo(innerSphere.transform))).toBeTruthy();
    expect(world.lights().find(sceneLight => sceneLight.position.isEqualTo(light.position))).toBeTruthy();
  });
});

function defaultWorld(): World {
  const light = new PointLight(new Color(1, 1, 1), point(-10, 10, -10));
  const outerSphere = new Sphere({
    material: new Material({ color: new Color(0.8, 1.0, 0.6), diffuse: 0.7, specular: 0.2 })
  });
  const innerSphere = new Sphere({});
  innerSphere.transform = scalingTransformation(0.5, 0.5, 0.5);
  const result = new World();
  result.addActor(outerSphere);
  result.addActor(innerSphere);
  result.addLight(light);
  return result;
}
