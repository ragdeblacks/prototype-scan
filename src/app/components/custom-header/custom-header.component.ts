import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss'],
})
export class CustomHeaderComponent {
  @Input() title = '';
  @Input() textColor = '';
  @Input() buttonType = '';
  @Input() color = '';
  constructor(
    public navCrtl: NavController
  ) {}
  onBack() {
    this.navCrtl.back();
  }

}
