import { Projectile } from './Projectile';
import { Environment } from './Environment';
import { point, vector } from '../../src/Tuple';

export function cannon(projectile: Projectile, environment: Environment): void {
  let travellingProjectile = tick(projectile, environment);
  while (travellingProjectile.position.y >= 0) {
    travellingProjectile = tick(travellingProjectile, environment);
  }
  console.log(travellingProjectile.position);
}

function tick(projectile: Projectile, environment: Environment): Projectile {
  return {
    position: projectile.position.add(projectile.velocity),
    velocity: projectile.velocity.add(environment.gravity).add(environment.wind)
  };
}

const projectile = { position: point(0, 0, 0), velocity: vector(10, 5, 0) };
const environment = { gravity: vector(0, -3, 0), wind: vector(3, 1, 2) };
cannon(projectile, environment);
