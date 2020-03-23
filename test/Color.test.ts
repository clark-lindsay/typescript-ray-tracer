import { Color } from '../src/Color';

describe('the Color class', () => {
  it('can be initiated with a "thruple" syntax, populating red, green, and blue respectively', () => {
    const color = new Color(-0.5, 0.4, 1.7);

    expect(color.red()).toEqual(-0.5);
    expect(color.green()).toEqual(0.4);
    expect(color.blue()).toEqual(1.7);
  });

  it('can be added to another color to produce a new color', () => {
    const color = new Color(-0.5, 0.4, 1.7);
    const anotherColor = new Color(1, 2, 3);

    expect(color.add(anotherColor).isEqualTo(new Color(0.5, 2.4, 4.7))).toBeTruthy();
  });

  it('can subtract another color from itself to produce a new color', () => {
    const color = new Color(-0.5, 0.4, 1.7);
    const anotherColor = new Color(1, 2, 3);

    expect(color.subtract(anotherColor).isEqualTo(new Color(-1.5, -1.6, -1.3))).toBeTruthy();
  });

  it('can multiply itself by another color to produce a new color', () => {
    const color = new Color(-0.5, 0.4, 1.7);
    const anotherColor = new Color(1, 2, 3);

    expect(color.multiply(anotherColor).isEqualTo(new Color(-0.5, 0.8, 5.1))).toBeTruthy();
  });

  it('can scale a color to a particular color scale, defined by a scaleMin and a scaleMax', () => {
    const unscaledColor = new Color(-1, 1.7, 0.5);
    const targetColorFor255 = new Color(0, 255, 128);
    const targetColorFor1024 = new Color(0, 1024, 512);

    expect(unscaledColor.convertToScale().isEqualTo(targetColorFor255)).toBeTruthy();
    expect(unscaledColor.convertToScale(0, 255).isEqualTo(targetColorFor255)).toBeTruthy();
    expect(unscaledColor.convertToScale(0, 1024).isEqualTo(targetColorFor1024)).toBeTruthy();
  });
});
