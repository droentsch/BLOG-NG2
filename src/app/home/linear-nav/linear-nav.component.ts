import  { Component, OnInit } from '@angular/core';
import { StateService } from '../../service/state.service';
import { BroadcastService } from '../../service/broadcast.service';
import { IBlogConfig } from '../../model/IBlogConfig';
import { IChapter } from '../../model/IChapter';

@Component({
    selector: 'linear-nav',
    styleUrls: ['./linear-nav.component.css', '../home.component.css'],
    templateUrl: 'linear-nav.component.html'
})
export class LinearNavComponent implements OnInit {

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

    public ngOnInit() {
        this.registerBroadcasts();
    }
    private registerBroadcasts() {
        this.broadcast.onConfigData()
            .subscribe((data: IBlogConfig) => this.setFirstChapterState());
        this.broadcast.onChapterIndexChange()
            .subscribe((data: number) => this.getChapterByIndex(data));
    }
    public gotoFirstChapter() {
        const lastChap = this.getFirstChapter();
        if (lastChap !== '') {
            this.broadcast.chapterChange(lastChap);
        }
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
            this.setLastChapterState();
            this.state.currentChapter = chaps.length - 1;
            return chaps[this.state.currentChapter].contentToken;
        }
        return '';
    }

    private getFirstChapter(): string {
        const chaps = this.state.blogConfig.chapters;
        if (chaps.length) {
            this.setFirstChapterState();
            this.state.currentChapter = 0;
            return chaps[this.state.currentChapter].contentToken;
        }
        return '';
    }

    private getChapter(num: number): string {
        return this.getChapterByIndex(this.state.currentChapter + num);
    }

    private getChapterByIndex(idx: number) {
        const chaps = this.state.blogConfig.chapters;
        if (idx + 1 <= chaps.length) {
            this.state.currentChapter = idx;
            if (this.state.currentChapter + 1 === chaps.length) {
                this.setLastChapterState();
            } else if (this.state.currentChapter === 0) {
                this.setFirstChapterState();
            } else {
                this.setMidChapterState();
            }
            return chaps[this.state.currentChapter].contentToken;
        }
        return '';
    }

    private setMidChapterState() {
        this.isFirstChapter = false;
        this.isLastChapter = false;
    }

    private setFirstChapterState() {
        this.isFirstChapter = true;
        this.isLastChapter = false;
    }

    private setLastChapterState() {
        this.isFirstChapter = false;
        this.isLastChapter = true;
    }
}

