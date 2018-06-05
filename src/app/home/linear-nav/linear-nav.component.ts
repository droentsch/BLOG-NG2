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

    constructor(state: StateService, broadcast: BroadcastService) {
        this.state = state;
        this.broadcast = broadcast;
    }
    public gotoLastChapter() {
        const lastChap = this.getLastChapter();
        if (lastChap !== '') {
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
    private getChapter(num: number): string {
        const chaps = this.state.blogConfig.chapters;
        if (this.state.currentChapter + num + 1 <= chaps.length) {
            this.state.currentChapter = this.state.currentChapter + num;
            return chaps[this.state.currentChapter];
        }
        return '';
    }
}

