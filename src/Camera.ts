import { Matrix, identityMatrix } from './Matrix';

export class Camera {
  horizontalSize: number;
  verticalSize: number;
  fieldOfView: number;
  transform: Matrix;

  constructor(horizontalSize: number, verticalSize: number, fieldOfView: number) {
    [this.horizontalSize, this.verticalSize, this.fieldOfView] = [horizontalSize, verticalSize, fieldOfView];
    this.transform = identityMatrix(4);
  }

  pixelSize(): number {
    return 0; // stub
  }
}
