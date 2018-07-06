import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
    public get TOC_HEADER() {
        return 'toc-list-numbered-nav';
    }
}

