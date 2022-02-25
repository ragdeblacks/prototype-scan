import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScanPageRoutingModule } from './scan-routing.module';
import { ScanPage } from './scan.page';
import { HeaderTabCustomModule } from '@app/components/header-tab-custom/header-tab-custom.module';
import { CustomFooterModule } from '@app/components/custom-footer/custom-footer.module';
import { WizardInfoModule } from './components/wizard-info/wizard-info.module';
import { CaptureModule } from './components/capture/capture.module';
import { OCR } from '@ionic-native/ocr/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanPageRoutingModule,
    HeaderTabCustomModule,
    CustomFooterModule,
    WizardInfoModule,
    CaptureModule
  ],
  providers:[
    OCR
  ],
  declarations: [ScanPage]
})
export class ScanPageModule {}
