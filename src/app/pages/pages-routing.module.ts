import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './pages.page';

const routes: Routes = [
  {
    path: '',
    // component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'presence-history',
        loadChildren: () =>
          import('./presence-history/presence-history.module').then((m) => m.PresenceHistoryPageModule),
      },
      {
        path: 'take',
        loadChildren: () =>
          import('./take/take.module').then((m) => m.TakePageModule),
      },
      
      {
        path: '',
        redirectTo: '/pages/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/pages/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
