import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { IBlogConfig } from '../model/IBlogConfig';

const CONFIG_URL = '/config/config.json';

@Injectable()
export class ConfigService {
    private http: HttpClient;
    constructor(http: HttpClient) {
        this.http = http;
    }

    public getConfig(): Observable<IBlogConfig> {
        return this.http.get<IBlogConfig>(CONFIG_URL);
    }

    public getBlogConfig() {};

}
