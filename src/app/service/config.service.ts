import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { IBlogConfig } from '../model/IBlogConfig';

const CONFIG_URL = '/assets/config/config.json';

@Injectable()
export class ConfigService {
    private http: Http;
    constructor(http: Http) {
        this.http = http;
    }

    public getConfig(): Observable<any> {
        return this.http.get(CONFIG_URL)
            .map(this.extractData);
    }

    public getBlogConfig() {};

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

}
