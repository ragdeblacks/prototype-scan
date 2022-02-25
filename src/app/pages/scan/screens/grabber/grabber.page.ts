import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlNavigation } from '@app/core/enum/urlNavigation.enum';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-grabber',
  templateUrl: './grabber.page.html',
  styleUrls: ['./grabber.page.scss'],
})
export class GrabberPage implements OnInit {
  IMAGE_PATH = '';
  type: number;
  constructor(
    public navCtrl: NavController,
    public routeActiv: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeActiv.queryParams.forEach(params => {
      this.type = params.type;
    });
  }

  checkPhoto(event: any) {
    if (event.status === true) {
      //if (this.type === 1) {
        this.navCtrl.navigateForward(UrlNavigation.scan, { queryParams: { takePhoto: true } });
      //}

    }
  }
  cancelPhoto(event: any) {
    if (event.status === true) {
      if (this.type === 1) {
        this.navCtrl.navigateForward(UrlNavigation.scan);
      }
    }
  }


}
