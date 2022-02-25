import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormSelectComponent } from './form-select.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormSelectComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormSelectComponent
  ]
})
export class FormSelectModule { }
