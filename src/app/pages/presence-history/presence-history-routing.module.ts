import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresenceHistoryPage } from './presence-history.page';

const routes: Routes = [
  {
    path: '',
    component: PresenceHistoryPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PresenceHistoryPageRoutingModule {}
