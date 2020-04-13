import { Camera } from '../src/Camera';
import { equal } from '../src/equal';
import { point, vector } from '../src/Tuple';
import { Axes } from '../src/Matrix';
import { defaultWorld } from './World.test';
import { Color } from '../src/Color';
import { viewTransformation } from '../src/transformations';

describe('the Camera class', () => {
  it('can determine the proper pixel size (in world coordinates) for an image canvas of a certain size', () => {
    const wideCanvasCamera = new Camera(200, 125, Math.PI / 2);
    const tallCanvasCamera = new Camera(125, 200, Math.PI / 2);

    expect(equal(wideCanvasCamera.pixelSize, 0.01)).toBeTruthy();
    expect(equal(tallCanvasCamera.pixelSize, 0.01)).toBeTruthy();
  });

  it('can cast a ray through any point on the canvas, regardless of the transform of the camera', () => {
    const camera = new Camera(201, 101, Math.PI / 2);
    const centerRay = camera.rayForPixel(100, 50);
    const cornerRay = camera.rayForPixel(0, 0);

    expect(centerRay.origin.isEqualTo(point(0, 0, 0))).toBeTruthy();
    expect(centerRay.direction.isEqualTo(vector(0, 0, -1))).toBeTruthy();
    expect(cornerRay.origin.isEqualTo(point(0, 0, 0))).toBeTruthy();
    expect(cornerRay.direction.isEqualTo(vector(0.66519, 0.33259, -0.66851))).toBeTruthy();

    const transformedCamera = new Camera(201, 101, Math.PI / 2);
    transformedCamera.transform = transformedCamera.transform.translate(0, -2, 5).rotate(Axes.Y, Math.PI / 4);
    const transformedCenterRay = transformedCamera.rayForPixel(100, 50);

    expect(transformedCenterRay.origin.isEqualTo(point(0, 2, -5))).toBeTruthy();
    expect(transformedCenterRay.direction.isEqualTo(vector(Math.sqrt(2) / 2, 0, -Math.sqrt(2) / 2))).toBeTruthy();
  });

  it('can render a World to a Canvas', () => {
    const camera = new Camera(11, 11, Math.PI / 2);
    camera.transform = viewTransformation({
      eyePosition: point(0, 0, -5),
      eyeFocus: point(0, 0, 0),
      upRelativeToEye: vector(0, 1, 0)
    });
    const world = defaultWorld();
    const image = camera.render(world);

    expect(image.pixelAt(5, 5).isEqualTo(new Color(0.38066, 0.47583, 0.2855))).toBeTruthy();
  });
});
