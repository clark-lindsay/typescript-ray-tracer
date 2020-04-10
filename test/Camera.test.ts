import { Camera } from '../src/Camera';
import { equal } from '../src/equal';

describe('the Camera class', () => {
  it('can determine the proper pixel size (in world coordinates) for an image canvas of a certain size', () => {
    const wideCanvasCamera = new Camera(200, 125, Math.PI / 2);
    const tallCanvasCamera = new Camera(125, 200, Math.PI / 2);

    expect(equal(wideCanvasCamera.pixelSize(), 0.01)).toBeTruthy();
    expect(equal(tallCanvasCamera.pixelSize(), 0.01)).toBeTruthy();
  });
});
