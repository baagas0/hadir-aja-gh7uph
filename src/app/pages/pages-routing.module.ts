import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './pages.page';
import { PresenceBarcodeDetailPage } from './presence-barcode-detail/presence-barcode-detail.page';

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
        path: 'presence-barcode',
        loadChildren: () =>
          import('./presence-barcode/presence-barcode.module').then((m) => m.PresenceBarcodePageModule),
      },
      {
        path: 'presence-barcode/detail',
        loadChildren: () =>
          import('./presence-barcode-detail/presence-barcode-detail.module').then((m) => m.PresenceBarcodeDetailPageModule),
      },
      {
        path: 'barcode-scanning',
        loadChildren: () =>
          import('./barcode-scanning/barcode-scanning.module').then((m) => m.BarcodeScanningPageModule),
      },
      // {
      //   path: 'take',
      //   loadChildren: () =>
      //     import('./take/take.module').then((m) => m.TakePageModule),
      // },

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
