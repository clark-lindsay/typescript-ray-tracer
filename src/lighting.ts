import { Material } from './Material';
import { Color } from './Color';
import { PointLight } from './PointLight';
import { Tuple } from './Tuple';

const black = new Color(0, 0, 0);

export function lighting({
  material,
  light,
  pointBeingLit,
  eyePosition,
  normalAtPointBeingLit,
  pointIsInShadow = false
}: LightingArguments): Color {
  const result = { ambient: black, diffuse: black, specular: black };

  const sceneAmbientColor = material.color.multiply(light.intensity);
  const directionToLightSource = light.position.subtract(pointBeingLit).normalize();
  const directionToEye = eyePosition.subtract(pointBeingLit).normalize();
  const cosineOfAngleBetweenLightAndNormal = directionToLightSource.dotProduct(normalAtPointBeingLit);

  result.ambient = ambientComponent();
  if (pointIsInShadow) return result.ambient;
  if (cosineOfAngleBetweenLightAndNormal < 0) {
    [result.diffuse, result.specular] = [black, black];
  } else {
    result.diffuse = diffuseComponent();
    result.specular = specularComponent();
  }
  return result.ambient.add(result.diffuse).add(result.specular);

  function ambientComponent(): Color {
    return sceneAmbientColor.scalarMultiply(material.ambient);
  }

  function diffuseComponent(): Color {
    return sceneAmbientColor.scalarMultiply(material.diffuse).scalarMultiply(cosineOfAngleBetweenLightAndNormal);
  }

  function specularComponent(): Color {
    const cosineOfAngleBetweenReflectionAndEye = directionToLightSource
      .negate()
      .reflect(normalAtPointBeingLit)
      .dotProduct(directionToEye);
    if (cosineOfAngleBetweenReflectionAndEye <= 0) {
      return black;
    } else {
      return calculateSpecularComponent(light, material, cosineOfAngleBetweenReflectionAndEye);
    }
  }
}

interface LightingArguments {
  material: Material;
  light: PointLight;
  pointBeingLit: Tuple;
  eyePosition: Tuple;
  normalAtPointBeingLit: Tuple;
  pointIsInShadow?: boolean;
}

function calculateSpecularComponent(
  light: PointLight,
  material: Material,
  cosineOfAngleBetweenReflectionAndEye: number
): Color {
  const factor = Math.pow(cosineOfAngleBetweenReflectionAndEye, material.shininess);
  return light.intensity.scalarMultiply(material.specular).scalarMultiply(factor);
}
