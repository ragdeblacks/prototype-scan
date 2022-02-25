import { Component, OnInit } from '@angular/core';
import { StorageEnum } from '@app/core/enum/storageEnum.enum';
import { UrlNavigation } from '@app/core/enum/urlNavigation.enum';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  title = 'Home';
  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }
  goToScan(){
    this.navCtrl.navigateForward(UrlNavigation.scan);
  }
  goToManual(){
    this.navCtrl.navigateForward(UrlNavigation.validationForm);
  }

}
