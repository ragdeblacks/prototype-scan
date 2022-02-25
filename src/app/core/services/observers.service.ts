import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObserversService {
  public changeNetwork: Subject<any> = new Subject<any>();
  public subsNetwork(): Observable<any> {
    return this.changeNetwork.asObservable();
  }
}
