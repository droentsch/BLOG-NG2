import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { IBlogConfig } from '../model/IBlogConfig';


@Injectable()
export class StateService {
    private _blogConfig: IBlogConfig;
    private _currentChapter: string;

    public set blogConfig(config: IBlogConfig) {
        this._blogConfig = config;
        this._currentChapter = this._blogConfig.chapters[0];
    }

    public get blogConfig(): IBlogConfig {
        return this._blogConfig;
    }

    public set currentChapter(val: string) {
        this._currentChapter = val;
    }

    public get currentChapter(): string {
        return this._currentChapter;
    }
}
