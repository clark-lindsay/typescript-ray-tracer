import { createWriteStream } from 'fs';

import { Color } from './Color';
import { range } from './util';

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

  writePPM(filePath: string): void {
    const plainPPMHeader = `P3\n${this.width} ${this.height}\n255\n`;
    const writeStream = createWriteStream(filePath, { flags: 'a' });
    writeStream.write(plainPPMHeader);
    for (const row of this.grid) {
      writeStream.write(rowToPPM(row));
    }
    writeStream.end();
  }

  toPPM(): string {
    const plainPPMHeader = `P3\n${this.width} ${this.height}\n255\n`;
    let result = plainPPMHeader;
    const rows = [];
    for (const row of this.grid) {
      rows.push(rowToPPM(row));
    }
    result += rows.join('');
    return result;
  }

  private checkIndexBounds(x: number, y: number): void {
    if (x >= this.width || x < 0 || y >= this.height || y < 0) {
      throw new Error('The index for a pixel must be within the bounds of the grid: ( [0, width), [0, height) )');
    }
  }
}

function rowToPPM(row: Color[]): string {
  const pixels = [];
  for (const pixel of row) {
    const scaledPixel = pixel.convertToScale();
    pixels.push(`${scaledPixel.red()} ${scaledPixel.green()} ${scaledPixel.blue()} `);
  }
  let result = breakPixelListIntoLines(pixels.join(''));
  return result;
}

function breakPixelListIntoLines(str: string): string {
  let result = str;
  const maxLineLength = 70;
  if (result.length > maxLineLength) {
    result = toLines(result, 60);
  }
  result = result.trimRight() + '\n';
  return result;

  function toLines(text: string, approximateLineLength: number) {
    let searchStartIndex = 0;
    const resultLines = [];
    while (searchStartIndex + approximateLineLength < text.length) {
      let nextSpaceIndex = text.indexOf(' ', searchStartIndex + approximateLineLength);
      const nextLine = text.slice(searchStartIndex, nextSpaceIndex).trimRight();
      resultLines.push(nextLine);
      searchStartIndex = nextSpaceIndex + 1;
    }
    return resultLines.join('\n');
  }
}
