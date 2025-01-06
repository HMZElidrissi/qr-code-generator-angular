import { Injectable } from '@angular/core';
import QRCode from 'qrcode';

@Injectable({
  providedIn: 'root'
})
export class QRCodeService {
  async generateQR(
    data: string,
    canvas: HTMLCanvasElement,
    width: number,
    height: number
  ): Promise<void> {
    try {
      await QRCode.toCanvas(canvas, data, {
        width,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  }
}
