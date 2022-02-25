import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrabberPageRoutingModule } from './grabber-routing.module';

import { GrabberPage } from './grabber.page';
import { ComponentsCDCModule } from '@app/pages/scan/components/components-cdc.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrabberPageRoutingModule,
    ComponentsCDCModule
  ],
  declarations: [GrabberPage]
})
export class GrabberPageModule {}
