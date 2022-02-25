import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Platform } from '@ionic/angular';
import { User } from '../models/user';
import * as firebase from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { StorageEnum } from '../enum/storageEnum.enum';

@Injectable({
  providedIn: 'root'
})
export class LoginService  {
  public userData: User;
  webClientId = '821752268885-qnv8jl8gqde9r1a3rv1sp2tos93859rk.apps.googleusercontent.com';
  picture;
  name;
  email;
  constructor(
    public platform: Platform,
    private afAuth: AngularFireAuth,
    private googlePlus: GooglePlus
  ) {
  }
  sporeLogin(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      if (this.platform.is('cordova')) {

        this.googlePlus.login({
          webClientId: this.webClientId,
          offline: false
        }).then(res=>{
          const body = {
            id_token: res.idToken,
            client_id: this.webClientId
          };
          this.userData = {
            displayName: res.displayName,
            email: res.email,
            isLoggedIn: 1,
            imageUrl: res.imageUrl
          };
          localStorage.setItem('login','true');
          localStorage.setItem(StorageEnum.userData, JSON.stringify(this.userData));
          resolve(this.userData);
          
        });
       
        
      }
    });
    return promise;
  }

  disconnect(): Promise<any> {
    localStorage.clear();
    if (this.platform.is('cordova')) {
      return this.googlePlus.logout();
    }
  }

}
