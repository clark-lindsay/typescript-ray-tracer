import { Canvas } from '../../src/Canvas';
import { Color } from '../../src/Color';

function writePPMToFile() {
  const canvas = new Canvas(1000, 1000);
  canvas.setPixel(0, 0, new Color(1.5, 0, 0));
  canvas.setPixel(2, 1, new Color(0, 0.5, 0));
  canvas.setPixel(3, 2, new Color(-0.5, 0, 1));
  canvas.writePPM('test.ppm');
}

writePPMToFile();
