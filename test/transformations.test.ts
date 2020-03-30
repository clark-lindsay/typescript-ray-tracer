import { translation } from '../src/transformations';
import { point, vector } from '../src/Tuple';

describe('the Matrix transformation functions', () => {
  describe('the translation function', () => {
    it('returns a 4x4 Matrix that can move a point in space by multiplication', () => {
      const translationTransform = translation(5, -3, 2);
      const p = point(-3, 4, 5);

      expect(translationTransform.multipliedBy(p).isEqualTo(point(2, 1, 7))).toBeTruthy();
    });

    it('its inverse creates the exactly opposite translation', () => {
      const translationTransform = translation(5, -3, 2);
      const translationInverse = translationTransform.inverse();
      const p = point(-3, 4, 5);

      expect(translationInverse.multipliedBy(p).isEqualTo(point(-8, 7, 3))).toBeTruthy();
    });

    it('will not have any effect when multiplied with a vector', () => {
      const translationTransform = translation(5, -3, 2);
      const v = vector(-3, 4, 5);

      expect(translationTransform.multipliedBy(v).isEqualTo(v)).toBeTruthy();
    });
  });
});
