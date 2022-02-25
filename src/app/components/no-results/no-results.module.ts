import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoResultsComponent } from './no-results.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    NoResultsComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NoResultsComponent
  ]
})
export class NoResultsModule { }
