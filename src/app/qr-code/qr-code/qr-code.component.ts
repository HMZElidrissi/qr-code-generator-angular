import {
  Component,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild
} from '@angular/core';
import { QRCodeService } from '../qr-code.service';

@Component({
  selector: 'app-qr-code',
  standalone: false,
  templateUrl: 'qr-code.component.html'
})
export class QRCodeComponent implements OnChanges {
  @Input() data: string = '';
  @Output() dataChange = new EventEmitter<string>();
  @Input() width: number = 200;
  @Input() height: number = 200;
  @ViewChild('qrCanvas', { static: true }) qrCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private qrService: QRCodeService) {}

  ngOnChanges() {
    this.generateQRCode();
  }

  onInputChange(value: string) {
    this.data = value;
    this.dataChange.emit(value);
    this.generateQRCode();
  }

  private async generateQRCode() {
    const canvas = this.qrCanvas.nativeElement;
    if (this.data.trim()) {
      await this.qrService.generateQR(this.data, canvas, this.width, this.height);
    } else {
      // Clear canvas if no data
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  downloadQR() {
    const canvas = this.qrCanvas.nativeElement;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'qr-code.png';
    link.href = url;
    link.click();
  }
}
