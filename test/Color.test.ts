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
});
