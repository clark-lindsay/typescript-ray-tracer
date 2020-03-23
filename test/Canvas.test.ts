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
    const canvas = new Canvas(3, 3);
    const blue = new Color(0, 0, 1);
    const red = new Color(1, 0, 0);
    const white = new Color(0, 0, 0);
    canvas.setPixel(2, 2, blue);
    canvas.setPixel(0, 0, red);
    canvas.setPixel(1, 1, red);

    expect(canvas.getPixel(0, 0).isEqualTo(red)).toBeTruthy();
    expect(canvas.getPixel(0, 1).isEqualTo(white)).toBeTruthy();
    expect(canvas.getPixel(0, 2).isEqualTo(white)).toBeTruthy();
    expect(canvas.getPixel(1, 0).isEqualTo(white)).toBeTruthy();
    expect(canvas.getPixel(1, 1).isEqualTo(red)).toBeTruthy();
    expect(canvas.getPixel(1, 2).isEqualTo(white)).toBeTruthy();
    expect(canvas.getPixel(2, 0).isEqualTo(white)).toBeTruthy();
    expect(canvas.getPixel(2, 1).isEqualTo(white)).toBeTruthy();
    expect(canvas.getPixel(2, 2).isEqualTo(blue)).toBeTruthy();
  });

  it('has a getter function that does not allow assignment of pixels', () => {
    const canvas = new Canvas(5, 5);
    const blue = new Color(0, 0, 1);
    canvas.setPixel(2, 2, blue);
    let justAColorValue = canvas.getPixel(2, 2);

    expect(justAColorValue.isEqualTo(blue)).toBeTruthy();
    justAColorValue = new Color(0, 0, 0);
    expect(canvas.getPixel(2, 2).isEqualTo(blue)).toBeTruthy();
  });

  it('shoud throw an error if there is an attempt to index outside of the range of the grid', () => {
    const canvas = new Canvas(3, 3);
    const color = new Color(0, 0, 0);

    expect(() => canvas.setPixel(-1, 0, color)).toThrow();
    expect(() => canvas.setPixel(0, -1, color)).toThrow();
    expect(() => canvas.setPixel(0, 3, color)).toThrow();
    expect(() => canvas.setPixel(3, 0, color)).toThrow();
    expect(() => canvas.getPixel(-1, 0)).toThrow();
    expect(() => canvas.getPixel(0, -1)).toThrow();
    expect(() => canvas.getPixel(0, 3)).toThrow();
    expect(() => canvas.getPixel(3, 0)).toThrow();
  });

  it('can produce a PPM file, in the "Plain PPM" format, with a proper header and pixel format', () => {
    const canvas = new Canvas(4, 3);
    canvas.setPixel(0, 0, new Color(1.5, 0, 0));
    canvas.setPixel(2, 1, new Color(0, 0.5, 0));
    canvas.setPixel(3, 2, new Color(-0.5, 0, 1));
    const ppmImage = canvas.toPPM();

    expect(ppmImage.slice(0, 2)).toEqual('P3');
    expect(ppmImage[3]).toEqual('4');
    expect(ppmImage[5]).toEqual('3');
    expect(ppmImage.slice(7, 10)).toEqual('255');
    expect(ppmImage.slice(11)).toEqual(
      '255 0 0 0 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 128 0 0 0 0\n0 0 0 0 0 0 0 0 0 0 0 255\n'
    );
  });
});
