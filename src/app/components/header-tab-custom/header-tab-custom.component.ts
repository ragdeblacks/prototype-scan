import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageEnum } from '@app/core/enum/storageEnum.enum';
import { ToastIcons } from '@app/core/enum/toast.enum';
import { UrlNavigation } from '@app/core/enum/urlNavigation.enum';
import { Menu } from '@app/core/models/menu';
import { LoginService } from '@app/core/services/login.service';
import { ObserversService } from '@app/core/services/observers.service';
//import { Network } from '@ionic-native/network/ngx';
import { LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { SubSink } from 'subsink';
import ListMenus from '../../mocks/menu.json';

@Component({
  selector: 'app-header-tab-custom',
  templateUrl: './header-tab-custom.component.html',
  styleUrls: ['./header-tab-custom.component.scss'],
})
export class HeaderTabCustomComponent implements OnInit {
  @Input() optionSelect = '';
  @Input() typeTab = '';
  @Input() typeMenu = true;
  optSelet = '';
  @Input() titleDescription = '';
  @Input() title = '';
  @Input() searchElement = '';
  @Output() ongoToUrl = new EventEmitter<any>();
  @Output() onchangeType = new EventEmitter<any>();
  @Output() ondetectChangeSearch = new EventEmitter<any>();
  usuario: any;
  picture: any;
  data: any;
  subs: SubSink = new SubSink();
  network = 0;
  loading: HTMLIonLoadingElement;
  appPages: Menu[];
  nav = UrlNavigation;
  constructor(
    public navCtrl: NavController,
    public actRouter: ActivatedRoute,
    public obs: ObserversService,
    public toastCtrl: ToastController,
    // public networkValid: Network,
    public loginService: LoginService,
    public renderer: Renderer2,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController
  ) { 
    this.appPages = ListMenus.menu;
    this.menuCtrl.enable(false);
  }
  ngOnInit(): void {
    this.actRouter.queryParams
      .subscribe(params => {
        if (Object.values(params).length !== 0) {
          this.optSelet = params.type;
        }
      });
    this.data = JSON.parse(localStorage.getItem(StorageEnum.userData));
    console.log(this.data);
    if (this.data !== null) {
      this.usuario = this.data.displayName || '';
      this.picture = this.data.imageUrl || '';
    }
  }

  goToUrl(element: string): void {
    let url = '';
    let param = '';
  }
  detectChanges(value: string) {
    this.ondetectChangeSearch.emit({ value });
  }

  connectStatus() {
    if (this.network === 1) {
      this.showToast('El dispositivo esta conectado a Wifi', 'wifi-outline', '');
    } else if (this.network === 2) {
      this.showToast('El dispositivo esta conectado a Datos', 'bar-chart-outline', '');
    } else {
      this.showToast('No hay conexión disponible', 'warning-outline', 'warning');
    }


  }
  async showToast(msg, icon?, state = '') {
    const cssClass = (state == '') ? 'custom-toast' : 'custom-toast-danger';
    const toast = await this.toastCtrl.create({
      animated: true,
      translucent: false,
      cssClass: cssClass,
      message: msg,
      position: 'bottom',
      buttons: [
        {
          side: 'start',
          icon: icon ? icon : ToastIcons.checkmarkCircle,
          role: 'cancel',
          handler: () => { }
        }
      ],
      duration: 2500
    });
    toast.present();
  }
  ionViewDidLeave() {
    this.subs.unsubscribe();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
  openFirst() {
    this.menuCtrl.enable(true, 'first');
    this.menuCtrl.open('first');
  }
  disconnect() {
    console.log('cerrrar');
    this.loadingCtrl
      .create({
        message: 'Cargando...',
      }).then((res) => {
        this.loading = res;
        this.loading.present();
        this.logout();
      });

  }
  logout() {
    this.loginService.disconnect()
      .then((res: any) => {
        if (this.loading) { this.loading.dismiss(); }
        this.navCtrl.navigateRoot(UrlNavigation.login);
      });
  }
  goToPage(url) {
    this.navCtrl.navigateForward(url);
  }

}
