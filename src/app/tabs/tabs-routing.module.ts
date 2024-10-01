import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('../tabs/tabs.module').then( m => m.TabsPageModule)
  // },
  {
    path: '',
    component: HomePage,
    children: [
      {
      path: 'home',
      loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
    },
    {
      path: 'diagnose',
      loadChildren: () => import('../diagnose/diagnose.module').then( m => m.DiagnosePageModule)
    },
    {
      path: 'login',
      loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule)
    },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
