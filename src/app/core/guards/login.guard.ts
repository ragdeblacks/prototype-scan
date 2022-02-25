import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { StorageEnum } from '../enum/storageEnum.enum';
import { UrlNavigation } from '../enum/urlNavigation.enum';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivateChild {
  timeNow: number;
  timeOut: number;
  
  constructor(
    public route: Router,
    public loginService: LoginService
  ) {}
  async canActivateChild() {
    let isLoggedIn = localStorage.getItem('login')=='true';
    if (isLoggedIn) {
      return true;
    } else {
      this.loginService.disconnect();
      this.route.navigateByUrl(UrlNavigation.login);
    }
  }
}
