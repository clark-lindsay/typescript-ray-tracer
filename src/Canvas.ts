import { Color } from './Color';

export class Canvas {
  grid: Color[][];
  width: number;
  height: number;

  constructor(width: number, height: number) {
    let row = new Array(width).fill(new Color(0, 0, 0));
    this.grid = new Array(height).fill(row);
    [this.width, this.height] = [width, height];
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  getGrid(): Color[][] {
    return this.grid;
  }

  getPixel(x: number, y: number): Color {
    return this.grid[x][y];
  }

  setPixel(x: number, y: number, color: Color): void {
    this.grid[x][y] = color;
  }
}
