import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FormInformation } from "../models/form-information.model";
import { filter } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class DataService {

    private dataVal = new BehaviorSubject<Partial<FormInformation>>(null);
    data: Partial<FormInformation>

    setData(data: Partial<FormInformation>) {
        this.data = { ...data };
        this.dataVal.next(this.data);
    }

    get data$() {
        return this.dataVal.asObservable().pipe(filter(x => !!x));
    }
}