import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanPage } from './scan.page';

const routes: Routes = [
  {
    path: '',
    component: ScanPage
  },
  {
    path: 'validation-form',
    loadChildren: () => import('./screens/validation-form/validation-form.module').then(m => m.ValidationFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanPageRoutingModule {
  constructor(
  ) {
  }
}
