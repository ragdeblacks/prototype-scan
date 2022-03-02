import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageEnum } from '../enum/storageEnum.enum';
import { UrlServices } from '../enum/urlServices.enum';
import { FormInformation } from '../models/form-information.model';
import { IConnection } from './connection.base';


@Injectable({
  providedIn: 'root'
})

export class ConnectionService extends IConnection {
  userEmail: string;
  constructor(protected http: HttpClient) {
    super(http);
    this.validateData()
  }
  validateData() {
    const savedInfo = localStorage.getItem(StorageEnum.userData);
    if (savedInfo) {
      this.userEmail = JSON.parse(savedInfo).email;
    }
  }

  setData(info: FormInformation) {
    if (!this.userEmail) throw Error();
    const params = JSON.stringify(info)//this.fetchParams(info).append('user', this.userEmail);
    return this.http.post(UrlServices.dataUrl, params, this.Header);
  }
  getData(): Observable<Partial<FormInformation>> {
    if (!this.userEmail) throw Error();
    return this.http.get<any>(`${UrlServices.getDataUrl}/${encodeURIComponent(this.userEmail || '666')}`).pipe(map(response => {
      return response?.data?.length ?
        {
          ...response.data[0],
          lastName: response.data[0].lastname,
          delegationMunicipality: response.data[0].delegationmunicipality,
          suburbPopulation: response.data[0].suburbpopulation,
          CP: response.data[0].cp,
          CURP: response.data[0].curp,
          RFC: response.data[0].rfc
        } : {};
    }));
  }
}
