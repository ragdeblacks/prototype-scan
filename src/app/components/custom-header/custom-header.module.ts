import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomHeaderComponent } from './custom-header.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    CustomHeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CustomHeaderComponent
  ]
})
export class CustomHeaderModule { }
