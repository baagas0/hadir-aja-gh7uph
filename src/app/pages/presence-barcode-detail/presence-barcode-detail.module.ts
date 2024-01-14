import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PresenceBarcodeDetailPageRoutingModule } from './presence-barcode-detail-routing.module';

import { PresenceBarcodeDetailPage } from './presence-barcode-detail.page';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PresenceBarcodeDetailPageRoutingModule,
  ],
  declarations: [PresenceBarcodeDetailPage]
})
export class PresenceBarcodeDetailPageModule {}
