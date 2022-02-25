import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraPreviewComponent } from './camera-preview/camera-preview.component';
import { IonicModule } from '@ionic/angular';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CameraPreviewComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  providers:[
    CameraPreview
  ],
  exports:[
    CameraPreviewComponent
  ]
})
export class ComponentsCDCModule { }
