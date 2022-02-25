import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaptureComponent } from './capture.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    CaptureComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    CaptureComponent
  ]
})
export class CaptureModule { }
