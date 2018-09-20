import { Injectable } from '@angular/core';
import { IBlogConfig } from '../model/IBlogConfig';
import { IChapter } from '../model/IChapter';


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

    public getLastChapter() {
        let highVal: IChapter;
        this.blogConfig.chapters.forEach((val) => {
            if (highVal) {
                if (val.number > highVal.number) {
                    highVal = val;
                }
            } else {
                highVal = val;
            }
        });
        return highVal;
    }
}
