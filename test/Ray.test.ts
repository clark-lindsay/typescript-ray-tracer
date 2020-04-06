import { equal } from '../src/equal';
import { Ray } from '../src/Ray';
import { point, vector } from '../src/Tuple';
import { Sphere } from '../src/Sphere';
import { translationTransformation, scalingTransformation } from '../src/transformations';

describe('the Ray class', () => {
  it('can be contstructed with a point for an origin and a vector for a direction', () => {
    const origin = point(1, 2, 3);
    const direction = vector(4, 5, 6);
    const ray = new Ray(origin, direction);

    expect(ray.origin.isEqualTo(origin)).toBeTruthy();
    expect(ray.direction.isEqualTo(direction)).toBeTruthy();
  });

  it('can calculate the distance at any point "t" along the path of the ray', () => {
    const ray = new Ray(point(2, 3, 4), vector(1, 0, 0));

    expect(ray.position(0).isEqualTo(point(2, 3, 4))).toBeTruthy();
    expect(ray.position(1).isEqualTo(point(3, 3, 4))).toBeTruthy();
    expect(ray.position(-1).isEqualTo(point(1, 3, 4))).toBeTruthy();
    expect(ray.position(2.5).isEqualTo(point(4.5, 3, 4))).toBeTruthy();

    const moreComplexRay = new Ray(point(0, 0, 0), vector(4, -7, 2.5));

    expect(moreComplexRay.position(2).isEqualTo(point(8, -14, 5))).toBeTruthy();
    expect(moreComplexRay.position(3.5).isEqualTo(point(14, -24.5, 8.75))).toBeTruthy();
  });

  it('intersects a sphere at two points, if it intersects it at all', () => {
    const ray = new Ray(point(0, 0, -5), vector(0, 0, 1));
    const sphere = new Sphere({});
    const intersections = ray.intersects(sphere).intersections;

    expect(intersections.length).toEqual(2);
    expect(equal(intersections[0].t, 4)).toBeTruthy();
    expect(equal(intersections[1].t, 6)).toBeTruthy();
  });

  it('returns two points if a ray intersects a sphere at a tangent', () => {
    const ray = new Ray(point(0, 1, -5), vector(0, 0, 1));
    const sphere = new Sphere({});
    const intersections = ray.intersects(sphere).intersections;

    expect(intersections.length).toEqual(2);
    expect(equal(intersections[0].t, 5)).toBeTruthy();
    expect(equal(intersections[1].t, 5)).toBeTruthy();
  });

  it('returns an empty intersections array when a ray misses a sphere', () => {
    const ray = new Ray(point(0, 2, -5), vector(0, 0, 1));
    const sphere = new Sphere({});
    const intersections = ray.intersects(sphere).intersections;

    expect(intersections.length).toEqual(0);
  });

  it('returns two intersections even when a ray originates inside of a sphere', () => {
    const ray = new Ray(point(0, 0, 0), vector(0, 0, 1));
    const sphere = new Sphere({});
    const intersections = ray.intersects(sphere).intersections;

    expect(intersections.length).toEqual(2);
    expect(equal(intersections[0].t, -1)).toBeTruthy();
    expect(equal(intersections[1].t, 1)).toBeTruthy();
  });

  it('returns two intersections even when a ray originates in front of a sphere and has a direction away from the sphere', () => {
    const ray = new Ray(point(0, 0, 2), vector(0, 0, 1));
    const sphere = new Sphere({});
    const intersections = ray.intersects(sphere).intersections;

    expect(intersections.length).toEqual(2);
    expect(equal(intersections[0].t, -3)).toBeTruthy();
    expect(equal(intersections[1].t, -1)).toBeTruthy();
  });

  it('returns the object that the intersection occured with', () => {
    const ray = new Ray(point(0, 0, -5), vector(0, 0, 1));
    const sphere = new Sphere({});
    const intersections = ray.intersects(sphere).intersections;

    expect(intersections[0].object).toBe(sphere);
    expect(intersections[1].object).toBe(sphere);
  });

  it('can be translated, which returns a new ray, without modifying the original', () => {
    const ray = new Ray(point(1, 2, 3), vector(0, 1, 0));
    const translation = translationTransformation(3, 4, 5);
    const translatedRay = ray.transform(translation);

    expect(ray.origin.isEqualTo(point(1, 2, 3))).toBeTruthy();
    expect(translatedRay.origin.isEqualTo(point(4, 6, 8))).toBeTruthy();
    expect(ray.direction.isEqualTo(vector(0, 1, 0))).toBeTruthy();
    expect(translatedRay.direction.isEqualTo(vector(0, 1, 0))).toBeTruthy();
  });

  it('can be scaled, returning a new ray, and not modifying the original', () => {
    const ray = new Ray(point(1, 2, 3), vector(0, 1, 0));
    const translation = scalingTransformation(2, 3, 4);
    const translatedRay = ray.transform(translation);

    expect(ray.origin.isEqualTo(point(1, 2, 3))).toBeTruthy();
    expect(translatedRay.origin.isEqualTo(point(2, 6, 12))).toBeTruthy();
    expect(ray.direction.isEqualTo(vector(0, 1, 0))).toBeTruthy();
    expect(translatedRay.direction.isEqualTo(vector(0, 3, 0))).toBeTruthy();
  });

  it('produces the correct intersections with a sphere that has been scaled', () => {
    const ray = new Ray(point(0, 0, -5), vector(0, 0, 1));
    const sphere = new Sphere({});
    sphere.transform = scalingTransformation(2, 2, 2);
    const intersections = ray.intersects(sphere).intersections;

    expect(intersections.length).toEqual(2);
    expect(equal(intersections[0].t, 3)).toBeTruthy();
    expect(equal(intersections[1].t, 7)).toBeTruthy();
  });

  it('produces the correct intersections with a sphere that has been translated', () => {
    const ray = new Ray(point(0, 0, -5), vector(0, 0, 1));
    const sphere = new Sphere({});
    sphere.transform = translationTransformation(5, 0, 0);
    const intersections = ray.intersects(sphere).intersections;

    expect(intersections.length).toEqual(0);
  });
});
