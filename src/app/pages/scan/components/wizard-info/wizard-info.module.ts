import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardInfoComponent } from './wizard-info.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    WizardInfoComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    WizardInfoComponent
  ]
})
export class WizardInfoModule { }
