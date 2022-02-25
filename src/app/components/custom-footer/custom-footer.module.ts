import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFooterComponent } from './custom-footer.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    CustomFooterComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CustomFooterComponent
  ]
})
export class CustomFooterModule { }
