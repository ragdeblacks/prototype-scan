import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidationFormPageRoutingModule } from './validation-form-routing.module';

import { ValidationFormPage } from './validation-form.page';
import { HeaderTabCustomModule } from '@app/components/header-tab-custom/header-tab-custom.module';
import { CustomFooterModule } from '@app/components/custom-footer/custom-footer.module';
import { FormInputModule } from '@app/components/form-input/form-input.module';
import { FormSelectModule } from '@app/components/form-select/form-select.module';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ValidationFormPageRoutingModule,
    HeaderTabCustomModule,
    CustomFooterModule,
    FormInputModule,
    FormSelectModule
  ],
  providers: [
    CurrencyPipe,
    NativeGeocoder
  ],
  declarations: [ValidationFormPage]
})
export class ValidationFormPageModule {}
