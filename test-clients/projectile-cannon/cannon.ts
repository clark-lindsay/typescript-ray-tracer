import { Projectile } from './Projectile';
import { Environment } from './Environment';
import { point, vector } from '../../src/Tuple';
import { Canvas } from '../../src/Canvas';
import { Color } from '../../src/Color';

const projectile = { position: point(0, 0, 0), velocity: vector(30, 35, 0) };
const environment = { gravity: vector(0, -9.81, 0), wind: vector(3, 1, 2) };
cannon(projectile, environment);

export function cannon(projectile: Projectile, environment: Environment): void {
  const canvas = new Canvas(1000, 1000);
  markLocation(0, 0);
  let travellingProjectile = tick(projectile, environment);

  while (travellingProjectile.position.y >= 0) {
    let [x, y] = floorCoordinates(travellingProjectile.position.x, travellingProjectile.position.y);
    if (x >= 0 && x <= 1000 && y >= 0 && y <= 1000) {
      console.log(x, y);
      markLocation(x, y);
    }
    travellingProjectile = tick(travellingProjectile, environment);
  }

  canvas.writePPM('projectile-motion.ppm');

  function markLocation(x: number, y: number) {
    const projectileColor = new Color(0.5, 0, 0.5);
    canvas.setPixel(x, canvas.getHeight() - y - 1, projectileColor);
  }

  function floorCoordinates(x: number, y: number): [number, number] {
    return [Math.floor(x), Math.floor(y)];
  }
}

function tick(projectile: Projectile, environment: Environment): Projectile {
  return {
    position: projectile.position.add(projectile.velocity),
    velocity: projectile.velocity.add(environment.gravity).add(environment.wind)
  };
}
