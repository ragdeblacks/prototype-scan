import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-custom-footer',
  templateUrl: './custom-footer.component.html',
  styleUrls: ['./custom-footer.component.scss'],
})
export class CustomFooterComponent {
  @Input() buttonBack = true;
  constructor(
    public navCtrl: NavController,
  ) { }
  returnBack() {
    this.navCtrl.back();
  }
}
