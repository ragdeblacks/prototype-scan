import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidationFormPage } from './validation-form.page';

const routes: Routes = [
  {
    path: '',
    component: ValidationFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidationFormPageRoutingModule {}
