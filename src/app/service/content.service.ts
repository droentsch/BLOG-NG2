import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContentService {
    private http: HttpClient;
    constructor(http: HttpClient) {
        this.http = http;
    }

    public getChapter(token: string): Observable<string> {
        let content_url = `/content/${token}/${token}.html`;
        return this.http.get<string>(content_url);
    }

}
