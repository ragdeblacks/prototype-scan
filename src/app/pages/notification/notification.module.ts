import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationPageRoutingModule } from './notification-routing.module';

import { NotificationPage } from './notification.page';
import { HeaderTabCustomModule } from '@app/components/header-tab-custom/header-tab-custom.module';
import { ListSearchModule } from './components/list-search/list-search.module';
import { CustomFooterModule } from '@app/components/custom-footer/custom-footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationPageRoutingModule,
    HeaderTabCustomModule,
    ListSearchModule,
    CustomFooterModule
  ],
  declarations: [NotificationPage]
})
export class NotificationPageModule {}
