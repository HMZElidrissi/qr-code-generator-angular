import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { QRCodeService } from '../qr-code.service';

interface ColorTheme {
  name: string;
  dark: string;
  light: string;
}

@Component({
  selector: 'app-qr-code',
  standalone: false,
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QRCodeComponent implements OnChanges {
  @Input() data: string = '';
  @Output() dataChange = new EventEmitter<string>();
  @Input() width: number = 250;
  @Input() height: number = 250;
  @ViewChild('qrCanvas', { static: true }) qrCanvas!: ElementRef<HTMLCanvasElement>;

  isLoading = false;
  error: string | null = null;
  selectedTheme: ColorTheme;

  colorThemes: ColorTheme[] = [
    { name: 'Classic', dark: '#000000', light: '#FFFFFF' },
    { name: 'Blue', dark: '#1E40AF', light: '#EFF6FF' },
    { name: 'Green', dark: '#166534', light: '#F0FDF4' },
    { name: 'Purple', dark: '#6D28D9', light: '#F5F3FF' },
    { name: 'Rose', dark: '#BE185D', light: '#FFF1F2' }
  ];

  constructor(private qrService: QRCodeService) {
    this.selectedTheme = this.colorThemes[0];
  }

  ngOnChanges() {
    this.generateQRCode();
  }

  onInputChange(value: string) {
    this.data = value;
    this.dataChange.emit(value);
    this.generateQRCode();
  }

  async generateQRCode() {
    if (!this.data.trim()) {
      this.clearCanvas();
      return;
    }

    this.isLoading = true;
    this.error = null;

    try {
      const canvas = this.qrCanvas.nativeElement;
      await this.qrService.generateQR(
        this.data,
        canvas,
        this.width,
        this.height,
        this.selectedTheme.dark,
        this.selectedTheme.light
      );
    } catch (err) {
      this.error = 'Failed to generate QR code';
      this.clearCanvas();
    } finally {
      this.isLoading = false;
    }
  }

  private clearCanvas() {
    const canvas = this.qrCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  }

  onThemeChange(theme: ColorTheme) {
    this.selectedTheme = theme;
    this.generateQRCode();
  }

  downloadQR() {
    const canvas = this.qrCanvas.nativeElement;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `qr-code-${Date.now()}.png`;
    link.href = url;
    link.click();
  }
}
