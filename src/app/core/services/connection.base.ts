import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

export abstract class IConnection {
    constructor(protected http: HttpClient) { }

    protected fetchParams<T extends {}>(requestParams: T): HttpParams {
        let params = new HttpParams();
        for (const property in requestParams) {
            if (requestParams.hasOwnProperty(property)) {
                params = params.append(property, requestParams[property.toString()]);
            }
        }
        return params;
    }
    protected get Header() {
        return {
            headers: new HttpHeaders().set(
                'Content-Type',
                'application/json'
            ),
        };
    }
}