import { Matrix, identityMatrix } from './Matrix';

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
}
