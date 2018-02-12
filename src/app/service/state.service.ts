import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { IBlogConfig } from '../model/IBlogConfig';


@Injectable()
export class StateService {
    private _blogConfig: IBlogConfig;

    public set blogConfig(config: IBlogConfig) {
        this._blogConfig = config;
    }

    public get blogConfig(): IBlogConfig {
        return this._blogConfig;
    }
}
