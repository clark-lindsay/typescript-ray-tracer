import { IntersectionCollection } from '../src/IntersectionCollection';
import { Intersection } from '../src/Intersection';
import { Sphere } from '../src/Sphere';

describe('The IntersectionCollection class', () => {
  it('can add a new intersection and keep its collection sorted', () => {
    const sphere = new Sphere({});
    const collection = new IntersectionCollection([
      new Intersection(0, sphere),
      new Intersection(1, sphere),
      new Intersection(3, sphere),
      new Intersection(4, sphere)
    ]);

    collection.add(new Intersection(2, sphere));
    expect(collection.intersections()[2].t).toEqual(2);

    collection.add(new Intersection(-1, sphere));
    expect(collection.intersections()[0].t).toEqual(-1);

    collection.add(new Intersection(5, sphere));
    expect(collection.intersections()[6].t).toEqual(5);
  });
});
