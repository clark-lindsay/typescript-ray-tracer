import { Camera } from '../src/Camera';
import { equal } from '../src/equal';
import { point, vector } from '../src/Tuple';
import { Axes } from '../src/Matrix';

describe('the Camera class', () => {
  it('can determine the proper pixel size (in world coordinates) for an image canvas of a certain size', () => {
    const wideCanvasCamera = new Camera(200, 125, Math.PI / 2);
    const tallCanvasCamera = new Camera(125, 200, Math.PI / 2);

    expect(equal(wideCanvasCamera.pixelSize, 0.01)).toBeTruthy();
    expect(equal(tallCanvasCamera.pixelSize, 0.01)).toBeTruthy();
  });

  it('can cast a ray through a pixel on the canvas when the camera has not been transformed', () => {
    const camera = new Camera(201, 101, Math.PI / 2);
    const centerRay = camera.rayForPixel(100, 50);
    const cornerRay = camera.rayForPixel(0, 0);

    expect(centerRay.origin.isEqualTo(point(0, 0, 0))).toBeTruthy();
    expect(centerRay.direction.isEqualTo(vector(0, 0, -1))).toBeTruthy();
    expect(cornerRay.origin.isEqualTo(point(0, 0, 0))).toBeTruthy();
    expect(cornerRay.direction.isEqualTo(vector(0.66519, 0.33259, -0.66851))).toBeTruthy();
  });

  it('can cast a ray through any point on the canvas when the camera has been transformed', () => {
    const camera = new Camera(201, 101, Math.PI / 2);
    camera.transform = camera.transform.translate(0, -2, 5).rotate(Axes.Y, Math.PI / 4);
    const centerRay = camera.rayForPixel(100, 50);

    expect(centerRay.origin.isEqualTo(point(0, 2, -5))).toBeTruthy();
    expect(centerRay.direction.isEqualTo(vector(Math.sqrt(2) / 2, 0, -Math.sqrt(2) / 2))).toBeTruthy();
  });
});
