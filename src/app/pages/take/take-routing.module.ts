import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TakePage } from './take.page';

const routes: Routes = [
  {
    path: '',
    component: TakePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TakePageRoutingModule {}
