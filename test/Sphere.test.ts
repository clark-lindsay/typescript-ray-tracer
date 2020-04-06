import { Sphere } from '../src/Sphere';
import { vector, point } from '../src/Tuple';
import { identityMatrix } from '../src/Matrix';
import { translationTransformation, zRotationTransformation } from '../src/transformations';

describe('the Sphere class', () => {
  it('has a default transform, which is the identity matrix', () => {
    const sphere = new Sphere({});

    expect(sphere.transform.isEqualTo(identityMatrix(4))).toBeTruthy();
  });

  it('can have its transformation changed', () => {
    const sphere = new Sphere({});
    sphere.transform = translationTransformation(2, 3, 4);

    expect(sphere.transform.isEqualTo(translationTransformation(2, 3, 4))).toBeTruthy();
  });

  it('can calculate the normal at any point on its surface', () => {
    const sphere = new Sphere({});

    expect(sphere.normalAt(point(1, 0, 0)).isEqualTo(vector(1, 0, 0))).toBeTruthy();
    expect(sphere.normalAt(point(0, 1, 0)).isEqualTo(vector(0, 1, 0))).toBeTruthy();
    expect(sphere.normalAt(point(0, 0, 1)).isEqualTo(vector(0, 0, 1))).toBeTruthy();

    const rootThreeOverThree = Math.sqrt(3) / 3;
    const nonAxialPoint = point(rootThreeOverThree, rootThreeOverThree, rootThreeOverThree);
    const nonAxialVector = vector(rootThreeOverThree, rootThreeOverThree, rootThreeOverThree);
    expect(sphere.normalAt(nonAxialPoint).isEqualTo(nonAxialVector)).toBeTruthy();
    expect(
      sphere
        .normalAt(nonAxialPoint)
        .normalize()
        .isEqualTo(sphere.normalAt(nonAxialPoint))
    ).toBeTruthy();
  });

  it('can calculate the normal even if the sphere undergoes arbitrary transformations', () => {
    const sphere = new Sphere({});
    sphere.transform = translationTransformation(0, 1, 0);

    expect(sphere.normalAt(point(0, 1.70711, -0.70711)).isEqualTo(vector(0, 0.70711, -0.70711))).toBeTruthy();

    sphere.transform = zRotationTransformation(Math.PI / 5).scale(1, 0.5, 1);

    const normal = sphere.normalAt(point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2));
    expect(normal.isEqualTo(vector(0, 0.97014, -0.24254))).toBeTruthy();
  });
});
