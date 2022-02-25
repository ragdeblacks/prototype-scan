import { Injectable } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    public androidPermissions: AndroidPermissions,
    public platform: Platform
  ) { }

  permissionsApp(): void {
    this.storageWritePermission();
    this.camaraPermission();
  }
  camaraPermission() {
    const promise = new Promise((resolve) => {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(result => {
        console.log(result);
        if (!result.hasPermission) {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA).then(res => {
            resolve(true);
          }).catch(error => {
            console.log(error, 'negative');
          });
        }
      });
    });
    return promise;
  }
  storageWritePermission(): Promise<any> {
    const promise = new Promise((resolve) => {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(result => {
        console.log(result);
        if (!result.hasPermission) {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(res => {
            resolve(true);
          });
        }
      });
    });
    return promise;
  }
}
