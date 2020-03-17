import { equal } from '../src/equal';

describe('the equal function', () => {
  it('should determine that two numbers with 11 or fewer significant figures are equal', () => {
    const oneBillion = Math.pow(10, 9);
    const bigNum = oneBillion + 0.1 + 0.2;
    const sameNum = oneBillion + 0.3;

    expect(equal(bigNum, sameNum)).toBeTruthy();
  });
});
