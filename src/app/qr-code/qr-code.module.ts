import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeComponent } from './qr-code/qr-code.component';
import { QRCodeService } from './qr-code.service';
import { FormsModule } from '@angular/forms';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatTooltip } from '@angular/material/tooltip';
import { MatInput } from '@angular/material/input';
import { MatButton, MatMiniFabButton } from '@angular/material/button';

@NgModule({
  declarations: [QRCodeComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatProgressSpinner,
    MatIcon,
    MatFormField,
    MatCardActions,
    MatTooltip,
    MatLabel,
    MatInput,
    MatMiniFabButton,
    MatButton
  ],
  exports: [QRCodeComponent],
  providers: [QRCodeService]
})
export class QrCodeModule {}
