import { Color } from './Color';
import { setCharAt, range, hasLineAboveLength } from './util';

export class Canvas {
  private grid: Color[][];
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.grid = [];
    for (const i of range(0, height)) {
      this.grid.push([]);
      for (const _ of range(0, width)) {
        this.grid[i].push(new Color(0, 0, 0));
      }
    }
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
    this.checkIndexBounds(x, y);
    return this.grid[y][x];
  }

  setPixel(x: number, y: number, color: Color): void {
    this.checkIndexBounds(x, y);
    this.grid[y][x] = color;
  }

  toPPM(): string {
    const plainPPMHeader = `P3\n${this.width} ${this.height}\n255\n`;
    let result = plainPPMHeader;
    for (const row of this.grid) {
      result += rowToPPM(row);
    }
    return result;

    function rowToPPM(row: Color[]): string {
      let result = '';
      for (const pixel of row) {
        const scaledPixel = pixel.convertToScale();
        result += `${scaledPixel.red()} ${scaledPixel.green()} ${scaledPixel.blue()} `;
      }
      result = breakPixelListIntoLines(result, 70);
      return result;
    }

    function breakPixelListIntoLines(str: string, maxLineLength: number): string {
      let result = str;
      if (result.length > maxLineLength) {
        let searchStartIndex = 0;
        while (hasLineAboveLength(result, maxLineLength)) {
          result = setCharAt(
            result,
            result.substring(searchStartIndex, searchStartIndex + maxLineLength).lastIndexOf(' '),
            '\n'
          );
          searchStartIndex += maxLineLength;
        }
      }
      result = setCharAt(result, result.length - 1, '\n');
      return result;
    }
  }

  private checkIndexBounds(x: number, y: number): void {
    if (x >= this.width || x < 0 || y >= this.height || y < 0) {
      throw new Error('The index for a pixel must be within the bounds of the grid: ( [0, width), [0, height) )');
    }
  }
}
