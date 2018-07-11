import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
    public get TOC_HEADER() {
        return 'toc-list-numbered-nav';
    }
    public get TOC_TITLE() {
        return 'Chapter list';
    }
    public get SELECTED_CHAPTER_STYLE() {
        return 'menu-text-selected';
    }
    public get UNSELECTED_CHAPTER_STYLE() {
        return 'menu-text';
    }
}

