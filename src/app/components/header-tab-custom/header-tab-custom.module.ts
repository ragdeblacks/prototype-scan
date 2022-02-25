import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTabCustomComponent } from './header-tab-custom.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderTabCustomComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    HeaderTabCustomComponent
  ]
})
export class HeaderTabCustomModule { }
