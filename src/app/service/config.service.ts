import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ConfigService {
    private http: Http;
    constructor(http:Http) {
        this.http = http;
    }

    public getJSON(extract: ()=>void, handleError: ()=>void ): Observable<IConfig> {
        return 
    }
}