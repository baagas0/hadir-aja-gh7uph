import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PresenceBarcodePageRoutingModule } from './presence-barcode-routing.module';

import { PresenceBarcodePage } from './presence-barcode.page';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PresenceBarcodePageRoutingModule,
  ],
  declarations: [PresenceBarcodePage]
})
export class PresenceBarcodePageModule {}
