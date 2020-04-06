import { Material } from './Material';
import { Color } from './Color';
import { PointLight } from './PointLight';
import { Tuple } from './Tuple';

export function lighting({ material, light, pointBeingLit, directionToEye, normalVector }: LightingArguments): Color {
  const effectiveColor = material.color.multiply(light.intensity);
  const directionToLightSource = light.position.subtract(pointBeingLit).normalize();

  const cosineOfAngleBetweenLightAndNormal = directionToLightSource.dotProduct(normalVector);
  let ambient = effectiveColor.scalarMultiply(material.ambient);
  let diffuse = new Color(0, 0, 0);
  let specular = new Color(0, 0, 0);
  if (cosineOfAngleBetweenLightAndNormal < 0) {
    const black = new Color(0, 0, 0);
    [diffuse, specular] = [black, black];
  } else {
    diffuse = effectiveColor.scalarMultiply(material.diffuse).scalarMultiply(cosineOfAngleBetweenLightAndNormal);
    const cosineOfAngleBetweenReflectionAndEye = directionToLightSource
      .negate()
      .reflect(normalVector)
      .dotProduct(directionToEye);
    if (cosineOfAngleBetweenReflectionAndEye <= 0) {
      specular = new Color(0, 0, 0);
    } else {
      const factor = Math.pow(cosineOfAngleBetweenReflectionAndEye, material.shininess);
      specular = light.intensity.scalarMultiply(material.specular).scalarMultiply(factor);
    }
  }
  return ambient.add(diffuse).add(specular);
}

interface LightingArguments {
  material: Material;
  light: PointLight;
  pointBeingLit: Tuple;
  directionToEye: Tuple;
  normalVector: Tuple;
}
