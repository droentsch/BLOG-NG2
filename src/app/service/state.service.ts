import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { IBlogConfig } from '../model/IBlogConfig';


@Injectable()
export class StateService {
    private _blogConfig: IBlogConfig;
    private _currentChapter: number;

    public set blogConfig(config: IBlogConfig) {
        this._blogConfig = config;
    }

    public get blogConfig(): IBlogConfig {
        return this._blogConfig;
    }

    public set currentChapter(val: number) {
        this._currentChapter = val;
    }

    public get currentChapter(): number {
        return this._currentChapter;
    }
}
