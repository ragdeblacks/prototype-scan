import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSearchComponent } from './list-search.component';
import { IonicModule } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    ListSearchComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    Ng2SearchPipeModule
  ],
  exports: [
    ListSearchComponent
  ]
})
export class ListSearchModule { }
