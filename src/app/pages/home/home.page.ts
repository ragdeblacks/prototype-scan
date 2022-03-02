import { Component, OnInit } from '@angular/core';
import { StorageEnum } from '@app/core/enum/storageEnum.enum';
import { UrlNavigation } from '@app/core/enum/urlNavigation.enum';
import { ConnectionService } from '@app/core/services/connection.service';
import { DataService } from '@app/core/services/data.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  title = 'Home';
  constructor(
    private navCtrl: NavController,
    private connectionService: ConnectionService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getData()
  }

  async getData() {
    this.connectionService.getData().subscribe(res => {
      console.log('data get', res);
      this.dataService.setData(res)
    }, err => {
      console.warn(err)
    });
  }
  goToScan() {
    this.navCtrl.navigateForward(UrlNavigation.scan);
  }
  goToManual() {
    this.navCtrl.navigateForward(UrlNavigation.validationForm);
  }

}
