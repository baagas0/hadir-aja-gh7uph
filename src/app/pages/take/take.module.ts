import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TakePageRoutingModule } from './take-routing.module';

import { TakePage } from './take.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TakePageRoutingModule
  ],
  declarations: [TakePage]
})
export class TakePageModule {}
