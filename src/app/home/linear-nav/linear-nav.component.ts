import  { Component } from '@angular/core';
import { StateService } from '../../service/state.service';
import { BroadcastService } from '../../service/broadcast.service';

@Component({
    selector: 'linear-nav',
    styleUrls: ['./linear-nav.component.css', '../home.component.css'],
    templateUrl: 'linear-nav.component.html'
})
export class LinearNavComponent {

    private state: StateService;
    private broadcast: BroadcastService;
    public isFirstChapter: boolean;
    public isLastChapter: boolean;

    constructor(state: StateService, broadcast: BroadcastService) {
        this.state = state;
        this.broadcast = broadcast;
        this.isFirstChapter = false;
        this.isLastChapter = false;
    }

    public gotoFirstChapter() {
        const lastChap = this.getFirstChapter();
        if (lastChap !== '') {
            this.isFirstChapter = true;
            this.isLastChapter = false;
            this.broadcast.chapterChange(lastChap);
        }
    }
    public gotoLastChapter() {
        const lastChap = this.getLastChapter();
        if (lastChap !== '') {
            this.isFirstChapter = false;
            this.isLastChapter = true;
            this.broadcast.chapterChange(lastChap);
        }
    }
    public gotoNextChapter() {
        const chap = this.getChapter(1);
        if (chap !== '') {
            this.broadcast.chapterChange(chap);
        }
    }
    public gotoPreviousChapter() {
        const chap = this.getChapter(-1);
        if (chap !== '') {
            this.broadcast.chapterChange(chap);
        }
    }
    private getLastChapter(): string {
        const chaps = this.state.blogConfig.chapters;
        if (chaps.length) {
            this.state.currentChapter = chaps.length - 1;
            return chaps[this.state.currentChapter];
        }
        return '';
    }
    private getFirstChapter(): string {
        const chaps = this.state.blogConfig.chapters;
        if (chaps.length) {
            this.state.currentChapter = 0;
            return chaps[this.state.currentChapter];
        }
        return '';
    }
    private getChapter(num: number): string {
        const chaps = this.state.blogConfig.chapters;
        if (this.state.currentChapter + num + 1 <= chaps.length) {
            this.state.currentChapter = this.state.currentChapter + num;
            return chaps[this.state.currentChapter];
        }
        return '';
    }
}

