import { createWriteStream } from 'fs';

import { Color } from './Color';
import { range } from './util';

export class Canvas {
  private pixelGrid: Color[][];

  constructor(width: number, height: number) {
    this.pixelGrid = [];
    for (const i of range(0, height)) {
      this.pixelGrid.push([]);
      for (const _ of range(0, width)) {
        this.pixelGrid[i].push(new Color(0, 0, 0));
      }
    }
  }

  width(): number {
    return this.grid()[0].length;
  }

  height(): number {
    return this.grid().length;
  }

  grid(): Color[][] {
    return this.pixelGrid;
  }

  pixelAt(x: number, y: number): Color {
    this.checkIndexBounds(x, y);
    return this.grid()[y][x];
  }

  setPixelAt(x: number, y: number, color: Color): void {
    this.checkIndexBounds(x, y);
    this.pixelGrid[y][x] = color;
  }

  writePPM(filePath: string): void {
    const plainPPMHeader = `P3\n${this.width()} ${this.height()}\n255\n`;
    const writeStream = createWriteStream(filePath, { flags: 'a' });
    writeStream.write(plainPPMHeader);
    for (const row of this.grid()) {
      writeStream.write(rowToPPM(row));
    }
    writeStream.end();
  }

  toPPM(): string {
    const plainPPMHeader = `P3\n${this.width()} ${this.height()}\n255\n`;
    let result = plainPPMHeader;
    const rows = [];
    for (const row of this.grid()) {
      rows.push(rowToPPM(row));
    }
    result += rows.join('');
    return result;
  }

  private checkIndexBounds(x: number, y: number): void {
    if (x >= this.width() || x < 0 || y >= this.height() || y < 0) {
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
  return pixels.join('').trimRight() + '\n';
}
