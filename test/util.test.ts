import { range, setCharAt } from '../src/util';

describe('the range function', () => {
  it('returns a range from the given start to the given end value, inclusive-exclusive', () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
    expect(range(10, 15)).toEqual([10, 11, 12, 13, 14]);
  });

  it('throws an error if the end value is greater than the start', () => {
    expect(() => range(10, 9)).toThrow();
  });

  it('throws an error if the start or end is negative', () => {
    expect(() => range(-1, 4)).toThrow();
    expect(() => range(0, -5)).toThrow();
  });
});

describe('the setCharAt function', () => {
  it('can replace a char at the start of a string', () => {
    const str = 'bat';

    expect(setCharAt(str, 0, 'c')).toEqual('cat');
  });

  it('can replace a char at the end of a string', () => {
    const str = 'bat';

    expect(setCharAt(str, str.length - 1, 'd')).toEqual('bad');
  });

  it('can replace a char in the middle of a string', () => {
    const str = 'bat';

    expect(setCharAt(str, 1, 'e')).toEqual('bet');
  });
});
