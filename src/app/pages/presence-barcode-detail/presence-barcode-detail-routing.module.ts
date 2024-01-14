import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresenceBarcodeDetailPage } from './presence-barcode-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PresenceBarcodeDetailPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PresenceBarcodeDetailPageRoutingModule {}
