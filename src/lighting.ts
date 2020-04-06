import { Material } from './Material';
import { Color } from './Color';
import { PointLight } from './PointLight';
import { Tuple } from './Tuple';

export function lighting({ material, light, pointBeingLit, eyePosition, normalVector }: LightingArguments): Color {
  const effectiveColor = material.color.multiply(light.intensity);
  const directionToLightSource = light.position.subtract(pointBeingLit).normalize();
  const directionToEye = eyePosition.subtract(pointBeingLit).normalize();

  const result = { ambient: new Color(0, 0, 0), diffuse: new Color(0, 0, 0), specular: new Color(0, 0, 0) };

  const cosineOfAngleBetweenLightAndNormal = directionToLightSource.dotProduct(normalVector);
  result.ambient = effectiveColor.scalarMultiply(material.ambient);
  if (cosineOfAngleBetweenLightAndNormal < 0) {
    const black = new Color(0, 0, 0);
    [result.diffuse, result.specular] = [black, black];
  } else {
    result.diffuse = effectiveColor.scalarMultiply(material.diffuse).scalarMultiply(cosineOfAngleBetweenLightAndNormal);
    const cosineOfAngleBetweenReflectionAndEye = directionToLightSource
      .negate()
      .reflect(normalVector)
      .dotProduct(directionToEye);
    if (cosineOfAngleBetweenReflectionAndEye <= 0) {
      result.specular = new Color(0, 0, 0);
    } else {
      const factor = Math.pow(cosineOfAngleBetweenReflectionAndEye, material.shininess);
      result.specular = light.intensity.scalarMultiply(material.specular).scalarMultiply(factor);
    }
  }
  return result.ambient.add(result.diffuse).add(result.specular);
}

interface LightingArguments {
  material: Material;
  light: PointLight;
  pointBeingLit: Tuple;
  eyePosition: Tuple;
  normalVector: Tuple;
}
