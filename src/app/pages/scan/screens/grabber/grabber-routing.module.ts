import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrabberPage } from './grabber.page';

const routes: Routes = [
  {
    path: '',
    component: GrabberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrabberPageRoutingModule {}
