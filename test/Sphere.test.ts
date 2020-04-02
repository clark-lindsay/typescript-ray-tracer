import { Sphere } from '../src/Sphere';
import { identityMatrix } from '../src/Matrix';
import { translationTransformation } from '../src/transformations';

describe('the Sphere class', () => {
  it('has a default transform, which is the identity matrix', () => {
    const sphere = new Sphere();

    expect(sphere.transform.isEqualTo(identityMatrix(4))).toBeTruthy();
  });

  it('can have its transformation changed', () => {
    const sphere = new Sphere();
    sphere.transform = translationTransformation(2, 3, 4);

    expect(sphere.transform.isEqualTo(translationTransformation(2, 3, 4))).toBeTruthy();
  });
});
