import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresenceBarcodePage } from './presence-barcode.page';

const routes: Routes = [
  {
    path: '',
    component: PresenceBarcodePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PresenceBarcodePageRoutingModule {}
