import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth/login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  // }
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.TabsPageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
