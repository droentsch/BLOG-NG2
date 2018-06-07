import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { IBlogConfig } from '../model/IBlogConfig';

@Injectable()
export class BroadcastService {
    private configData$: Subject<IBlogConfig>;
    private loadingData$: Subject<boolean>;
    private chapterChange$: Subject<string>;

    constructor() {
        this.configData$ = new Subject<IBlogConfig>();
        this.loadingData$ = new Subject<boolean>();
        this.chapterChange$ = new Subject<string>();
    }

    public configData(data: IBlogConfig): void {
        this.configData$.next(data);
    }
    public loadingData(data: boolean): void {
        this.loadingData$.next(data);
    }
    public chapterChange(data: string): void {
        this.chapterChange$.next(data);
    }
    public onConfigData(): Observable<IBlogConfig> {
        return this.configData$.asObservable()
            .map((data) => data);
    }
    public onLoadingData(): Observable<boolean> {
        return this.loadingData$.asObservable()
            .map((data) => data);
    }
    public onChapterChange(): Observable<string> {
        return this.chapterChange$.asObservable()
            .map((data) => data);
    }
}
