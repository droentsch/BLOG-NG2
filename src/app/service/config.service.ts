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

    public getConfig() {
        
    }
    private getJSON(url: string, extract: (data: any)=>void, handleError: ()=>void ): Observable<any> {
        return this.http.get(url)
            .map((data: any) => extract(data));
    }
}