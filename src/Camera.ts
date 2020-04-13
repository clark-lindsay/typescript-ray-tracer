import { Matrix, identityMatrix } from './Matrix';
import { Ray } from './Ray';
import { point } from './Tuple';

export class Camera {
  horizontalSize: number;
  verticalSize: number;
  fieldOfView: number;
  transform: Matrix;
  pixelSize: number;

  private halfWidth: number;
  private halfHeight: number;

  constructor(horizontalSize: number, verticalSize: number, fieldOfView: number) {
    [this.horizontalSize, this.verticalSize, this.fieldOfView] = [horizontalSize, verticalSize, fieldOfView];
    this.transform = identityMatrix(4);

    const halfView = Math.tan(this.fieldOfView / 2);
    const aspectRatio = this.horizontalSize / this.verticalSize;
    [this.halfHeight, this.halfWidth] =
      aspectRatio >= 1 ? [halfView / aspectRatio, halfView] : [halfView, halfView * aspectRatio];
    this.pixelSize = (this.halfWidth * 2) / this.horizontalSize;
    this.halfHeight;
  }

  rayForPixel(xCanvasCoordinate: number, yCanvasCoordinate: number): Ray {
    const [xWorldCoordinate, yWorldCoordinate] = this.worldCoordinates(xCanvasCoordinate, yCanvasCoordinate);

    const rayOrigin = this.transform.inverse().multipliedBy(point(0, 0, 0));
    const targetCoordinates = this.transform.inverse().multipliedBy(point(xWorldCoordinate, yWorldCoordinate, -1));
    const rayDirection = targetCoordinates.subtract(rayOrigin).normalize();

    return new Ray(rayOrigin, rayDirection);
  }

  private worldCoordinates(xCanvasCoordinate: number, yCanvasCoordinate: number): [number, number] {
    const xOffsetFromEdgeOfCanvas = (xCanvasCoordinate + 0.5) * this.pixelSize;
    const yOffsetFromEdgeOfCanvas = (yCanvasCoordinate + 0.5) * this.pixelSize;
    const xWorldCoordinate = this.halfWidth - xOffsetFromEdgeOfCanvas;
    const yWorldCoordinate = this.halfHeight - yOffsetFromEdgeOfCanvas;
    return [xWorldCoordinate, yWorldCoordinate];
  }
}
