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

    constructor() {
        this.configData$ = new Subject<IBlogConfig>();
        this.loadingData$ = new Subject<boolean>();
    }

    public configData(data: IBlogConfig): void {
        this.configData$.next(data);
    }
    public loadingData(data: boolean): void {
        this.loadingData$.next(data);
    }
    public onConfigData(): Observable<IBlogConfig> {
        return this.configData$.asObservable()
            .map((data) => data);
    }
    public onLoadingData(): Observable<boolean> {
        return this.loadingData$.asObservable()
            .map((data) => data);
    }
}
