import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeComponent } from './qr-code/qr-code.component';
import { QRCodeService } from './qr-code.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [QRCodeComponent],
  imports: [CommonModule, FormsModule],
  exports: [QRCodeComponent],
  providers: [QRCodeService]
})
export class QrCodeModule {}
