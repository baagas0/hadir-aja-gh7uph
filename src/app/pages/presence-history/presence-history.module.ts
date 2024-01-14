import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PresenceHistoryPageRoutingModule } from './presence-history-routing.module';

import { PresenceHistoryPage } from './presence-history.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PresenceHistoryPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PresenceHistoryPage]
})
export class PresenceHistoryPageModule {}
