import { World } from '../src/World';
import { PointLight } from '../src/PointLight';
import { Color } from '../src/Color';
import { point, vector } from '../src/Tuple';
import { Sphere } from '../src/Sphere';
import { Material } from '../src/Material';
import { scalingTransformation } from '../src/transformations';
import { Ray } from '../src/Ray';

describe('The World class', () => {
  it('is initialized with no Actors and no light sources when its default constructor is called', () => {
    const world = new World();

    expect(world.actors()).toHaveLength(0);
    expect(world.lights()).toHaveLength(0);
  });

  it('can find intersections (in sorted order) with the actors in the world, given a ray', () => {
    const world = defaultWorld();
    const intersections = world.intersect(new Ray(point(0, 0, -5), vector(0, 0, 1)));

    expect(intersections.intersections()).toHaveLength(4);
    expect(intersections.intersections()[0].t).toEqual(4);
    expect(intersections.intersections()[1].t).toEqual(4.5);
    expect(intersections.intersections()[2].t).toEqual(5.5);
    expect(intersections.intersections()[3].t).toEqual(6);
  });

  it('can return the color produced where a ray strikes the world, given the ray', () => {
    const world = defaultWorld();
    const ray = new Ray(point(0, 0, -5), vector(0, 0, 1));

    expect(world.colorAtHit(ray).isEqualTo(new Color(0.38066, 0.47583, 0.2855))).toBeTruthy();
  });

  it('can return the color when a ray misses', () => {
    const world = defaultWorld();
    const ray = new Ray(point(0, 0, -5), vector(0, 1, 0));

    expect(world.colorAtHit(ray).isEqualTo(new Color(0, 0, 0))).toBeTruthy();
  });

  it('can return the color when an intersection occurs behind the ray', () => {
    const world = defaultWorld();
    const outerSphere = world.actors()[0];
    outerSphere.material.ambient = 1;
    const innerSphere = world.actors()[1];
    innerSphere.material.ambient = 1;
    const ray = new Ray(point(0, 0, 0.75), vector(0, 0, -1));

    expect(world.colorAtHit(ray).isEqualTo(innerSphere.material.color)).toBeTruthy();
  });
});

describe('the "defaultWorld" test set-up function', () => {
  it('creates a world with a light source and two concentric spheres', () => {
    const light = new PointLight(new Color(1, 1, 1), point(-10, 10, -10));
    const outerSphere = new Sphere({
      material: new Material({ color: new Color(0.8, 1.0, 0.6), diffuse: 0.7, specular: 0.2 })
    });
    const innerSphere = new Sphere();
    innerSphere.transform = scalingTransformation(0.5, 0.5, 0.5);

    const world = defaultWorld();

    expect(world.actors().find(actor => actor.color.isEqualTo(outerSphere.color))).toBeTruthy();
    expect(world.actors().find(actor => actor.transform.isEqualTo(innerSphere.transform))).toBeTruthy();
    expect(world.lights().find(sceneLight => sceneLight.position.isEqualTo(light.position))).toBeTruthy();
  });
});

export function defaultWorld(): World {
  const light = new PointLight(new Color(1, 1, 1), point(-10, 10, -10));
  const outerSphere = new Sphere({
    material: new Material({ color: new Color(0.8, 1.0, 0.6), diffuse: 0.7, specular: 0.2 })
  });
  const innerSphere = new Sphere();
  innerSphere.transform = scalingTransformation(0.5, 0.5, 0.5);
  const result = new World();
  result.addActor(outerSphere);
  result.addActor(innerSphere);
  result.addLight(light);
  return result;
}
