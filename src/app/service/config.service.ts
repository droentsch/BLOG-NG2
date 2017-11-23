import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { IBlogConfig } from '../model/IBlogConfig';

const CONFIG_URL = '/config/config.json';

@Injectable()
export class ConfigService {
    private http: Http;
    constructor(http:Http) {
        this.http = http;
    }

    private getConfig(): Observable<(res: Response) => IBlogConfig | {}> {
        return this.http.get(CONFIG_URL)
            .map(data => this.extractData);
    }

    private extractData(res: Response): IBlogConfig | {} {
        let body = res.json || {};
        return body;
    }

}
