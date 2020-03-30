import {
  translationTransformation,
  scalingTransformation,
  xRotationTransformation,
  yRotationTransformation,
  zRotationTransformation
} from '../src/transformations';
import { point, vector } from '../src/Tuple';

describe('the Matrix transformation functions', () => {
  describe('the translation function', () => {
    it('returns a 4x4 Matrix that can move a point in space by multiplication', () => {
      const translation = translationTransformation(5, -3, 2);
      const p = point(-3, 4, 5);

      expect(translation.multipliedBy(p).isEqualTo(point(2, 1, 7))).toBeTruthy();
    });

    it('its inverse creates the exactly opposite translation', () => {
      const translation = translationTransformation(5, -3, 2);
      const translationInverse = translation.inverse();
      const p = point(-3, 4, 5);

      expect(translationInverse.multipliedBy(p).isEqualTo(point(-8, 7, 3))).toBeTruthy();
    });

    it('will not have any effect when multiplied with a vector', () => {
      const translation = translationTransformation(5, -3, 2);
      const v = vector(-3, 4, 5);

      expect(translation.multipliedBy(v).isEqualTo(v)).toBeTruthy();
    });
  });

  describe('the scaling transformation', () => {
    it('returns a 4x4 Matrix that scales the components of a point or vector ', () => {
      const transform = scalingTransformation(2, 3, 4);
      const p = point(-4, 6, 8);

      expect(transform.multipliedBy(p).isEqualTo(point(-8, 18, 32))).toBeTruthy();
    });

    it('the scaling matrix will affect a vector in the same way that it affects a point', () => {
      const transform = scalingTransformation(2, 3, 4);
      const v = vector(-4, 6, 8);

      expect(transform.multipliedBy(v).isEqualTo(vector(-8, 18, 32))).toBeTruthy();
    });

    it('its inverse creates the exactly opposite translation', () => {
      const transform = scalingTransformation(2, 3, 4);
      const scalingInverse = transform.inverse();
      const v = vector(-4, 5, 8);

      expect(scalingInverse.multipliedBy(v).isEqualTo(vector(-2, 5 / 3, 2))).toBeTruthy();
    });

    it('can reflect a point across an axis by scaling that axis by -1, and scaling the other axes by 1', () => {
      const transform = scalingTransformation(-1, 1, 1);
      const p = point(-2, 3, 4);

      expect(transform.multipliedBy(p).isEqualTo(point(2, 3, 4))).toBeTruthy();
    });
  });

  describe('the rotation transformations', () => {
    it('can rotate a point around the x axis', () => {
      const p = point(0, 1, 0);
      const oneEighthTurn = xRotationTransformation(Math.PI / 4);
      const oneQuarterTurn = xRotationTransformation(Math.PI / 2);
      const reverseQuarterTurn = oneQuarterTurn.inverse();

      expect(oneEighthTurn.multipliedBy(p).isEqualTo(point(0, Math.SQRT2 / 2, Math.SQRT2 / 2))).toBeTruthy();
      expect(oneQuarterTurn.multipliedBy(p).isEqualTo(point(0, 0, 1))).toBeTruthy();
      expect(reverseQuarterTurn.multipliedBy(p).isEqualTo(point(0, 0, -1))).toBeTruthy();
    });

    it('can rotate a point around the y axis', () => {
      const p = point(0, 0, 1);
      const oneEighthTurn = yRotationTransformation(Math.PI / 4);
      const oneQuarterTurn = yRotationTransformation(Math.PI / 2);
      const reverseQuarterTurn = oneQuarterTurn.inverse();

      expect(oneEighthTurn.multipliedBy(p).isEqualTo(point(Math.SQRT2 / 2, 0, Math.SQRT2 / 2))).toBeTruthy();
      expect(oneQuarterTurn.multipliedBy(p).isEqualTo(point(1, 0, 0))).toBeTruthy();
      expect(reverseQuarterTurn.multipliedBy(p).isEqualTo(point(-1, 0, 0))).toBeTruthy();
    });

    it('can rotate a point around the z axis', () => {
      const p = point(0, 1, 0);
      const oneEighthTurn = zRotationTransformation(Math.PI / 4);
      const oneQuarterTurn = zRotationTransformation(Math.PI / 2);
      const reverseQuarterTurn = oneQuarterTurn.inverse();

      expect(oneEighthTurn.multipliedBy(p).isEqualTo(point(-Math.SQRT2 / 2, Math.SQRT2 / 2, 0))).toBeTruthy();
      expect(oneQuarterTurn.multipliedBy(p).isEqualTo(point(-1, 0, 0))).toBeTruthy();
      expect(reverseQuarterTurn.multipliedBy(p).isEqualTo(point(1, 0, 0))).toBeTruthy();
    });
  });
});
