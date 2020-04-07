import { World } from '../src/World';

describe('The World class', () => {
  it('is initialized with no Actors and no light sources when its default constructor is called', () => {
    const world = new World();

    expect(world.actors()).toHaveLength(0);
    expect(world.lights()).toHaveLength(0);
  });
});
