import { World } from '../../src/World';
import { Camera } from '../../src/Camera';
import { PointLight } from '../../src/PointLight';
import { Sphere } from '../../src/Sphere';
import { Material } from '../../src/Material';
import { Color } from '../../src/Color';
import {
  scalingTransformation,
  viewTransformation,
  translationTransformation,
  yRotationTransformation,
  xRotationTransformation
} from '../../src/transformations';
import { point, vector } from '../../src/Tuple';

renderSmallScene(100, 50);

export function renderSmallScene(imageWidth: number, imageHeight: number): void {
  const world = smallWorld();
  const camera = new Camera(imageWidth, imageHeight, Math.PI / 3);
  camera.transform = viewTransformation({
    eyePosition: point(0, 1.5, -5),
    eyeFocus: point(0, 1, 0),
    upRelativeToEye: vector(0, 1, 0)
  });

  const image = camera.render(world);
  image.writePPM(`${__dirname}/scene`);
}

function smallWorld(): World {
  const result = new World();
  const floor = largeFlattenedSphere();
  const leftWall = largeFlattenedSphere();
  leftWall.transform = translationTransformation(0, 0, 5)
    .cross(yRotationTransformation(-Math.PI / 4))
    .cross(xRotationTransformation(Math.PI / 2))
    .cross(scalingTransformation(10, 0.01, 10));
  const rightWall = largeFlattenedSphere();
  rightWall.transform = translationTransformation(0, 0, 5)
    .cross(yRotationTransformation(Math.PI / 4))
    .cross(xRotationTransformation(Math.PI / 2))
    .cross(scalingTransformation(10, 0.01, 10));
  const centerSphere = new Sphere({
    material: new Material({ color: new Color(0.1, 1, 0.5), diffuse: 0.7, specular: 0.3 })
  });
  centerSphere.transform = translationTransformation(-0.5, 1, 0.5);

  const rightSphere = new Sphere({
    material: new Material({ color: new Color(0.5, 1, 0.1), diffuse: 0.7, specular: 0.3 })
  });
  rightSphere.transform = translationTransformation(1.5, 0.5, -0.5).cross(scalingTransformation(0.5, 0.5, 0.5));

  const leftSphere = new Sphere({
    material: new Material({ color: new Color(1, 0.8, 0.1), diffuse: 0.7, specular: 0.3 })
  });
  leftSphere.transform = translationTransformation(-1.5, 0.33, -0.75).cross(scalingTransformation(0.33, 0.33, 0.33));

  result.addActor(floor);
  result.addActor(leftWall);
  result.addActor(rightWall);
  result.addActor(centerSphere);
  result.addActor(rightSphere);
  result.addActor(leftSphere);
  result.addLight(new PointLight(new Color(1, 1, 1), point(-10, 10, -10)));
  return result;
}

function largeFlattenedSphere(): Sphere {
  const result = new Sphere({ material: new Material({ color: new Color(1, 0.9, 0.9), specular: 0 }) });
  result.transform = scalingTransformation(10, 0.01, 10);
  return result;
}
