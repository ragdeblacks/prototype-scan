import { Component, OnInit } from '@angular/core';
import { StorageEnum } from '@app/core/enum/storageEnum.enum';
import { UrlNavigation } from '@app/core/enum/urlNavigation.enum';
import { Menu } from '@app/core/models/menu';
import { LoginService } from '@app/core/services/login.service';
import { MenuController, NavController } from '@ionic/angular';
import ListMenus from '../../mocks/menu.json';

@Component({
  selector: 'app-Prototype',
  templateUrl: './prototype.page.html',
  styleUrls: ['./prototype.page.scss'],
})
export class PrototypePage implements OnInit {
  usuario: any;
  picture: any;
  data: any;
  email: any;
  appPages: Menu[];
  constructor(
    public router: NavController,
    public loginService: LoginService,
    public menuCtrl: MenuController,
  ) {
    this.appPages = ListMenus.menu;
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem(StorageEnum.loginInfo));
    if (this.data !== null) {
      this.usuario = this.data.name || '';
      this.picture = this.data.picture || '';
      this.email = this.data.email || '';
    }
  }
  // disconnect() {
  //   this.loginService.disconnect()
  //     .then(() => {
  //       this.goToLogin();
  //     });
  // }
  goToLogin() {
    this.router.navigateForward([UrlNavigation.login]);
  }
}
