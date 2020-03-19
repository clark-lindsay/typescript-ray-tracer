import { Canvas } from '../src/Canvas';
import { Color } from '../src/Color';

describe('the Canvas class', () => {
  it('can be initialized with a width and a height, and all of the pixels will have a color of (0, 0, 0)', () => {
    const canvas = new Canvas(10, 20);

    expect(canvas.getWidth()).toEqual(10);
    expect(canvas.getHeight()).toEqual(20);
    for (const row of canvas.getGrid()) {
      for (const pixel of row) {
        expect(pixel.isEqualTo(new Color(0, 0, 0))).toBeTruthy();
      }
    }
  });

  it('can set a particular pixel in the grid to a certain color', () => {
    const canvas = new Canvas(5, 5);
    const blue = new Color(0, 0, 1);
    canvas.setPixel(2, 2, blue);

    expect(canvas.getPixel(2, 2).isEqualTo(blue)).toBeTruthy();
  });

  it('can produce a PPM file, in the "Plain PPM" format, with a proper header and format', () => {
    const canvas = new Canvas(4, 3);
    const ppmImage = canvas.toPPM();

    expect(ppmImage.slice(0, 2)).toEqual('P3');
    expect(ppmImage[3]).toEqual('4');
    expect(ppmImage[5]).toEqual('3');
    expect(ppmImage.slice(7, 10)).toEqual('255');
  });
});
