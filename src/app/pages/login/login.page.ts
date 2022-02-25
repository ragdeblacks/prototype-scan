import { Component } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { PopOverInfoComponent } from '../../pop-over-info/pop-over-info.component';
import { LoginService } from '@app/core/services/login.service';
import { UrlNavigation } from '@app/core/enum/urlNavigation.enum';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public loader: any;
  returnUrl: string;
  loading: HTMLIonLoadingElement;
  constructor(
    public sporeLogin: LoginService,
    public loadingCtrl: LoadingController,
    public router: NavController,
    public popoverCtrl: PopoverController,
  ) { }
  login() {
    this.loadingCtrl
      .create({
        message: 'Por favor espere...',
      }).then((res) => {
        this.loading = res;
        this.loading.present();
        this.initSession();
      });
  }
  initSession() {
    this.sporeLogin.sporeLogin().then(res => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.router.navigateForward(UrlNavigation.home);
      
    }).catch((err) => {
      const msg = err.message;
      alert(msg);
      if (this.loading) {
        this.loading.dismiss();
      }
    });
  }
  async info(myEvent: any) {
    const popover = await this.popoverCtrl.create({
      component: PopOverInfoComponent,
      event: myEvent,
      translucent: true,
    });
    return await popover.present();
  }
  // disconnect() {
  //   this.sporeLogin.disconnect()
  //     .then(res => console.log(res))
  //     .catch(error => console.log(error));
  // }
}
