import { Component, OnInit } from '@angular/core';
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
            .subscribe(() => this.setFirstChapterState());
        this.broadcast.onChapterIndexChange()
            .subscribe((data: number) => this.getChapterByIndex(data));
    }
    public gotoFirstChapter() {
        this.broadcast.chapterIndexChange(0);
    }
    public gotoLastChapter() {
        this.broadcast.chapterIndexChange(this.state.blogConfig.chapters.length - 1);
    }
    public gotoNextChapter() {
        const num = this.state.currentChapter + 1;
        if (num <= this.state.blogConfig.chapters.length - 1) {
            this.broadcast.chapterIndexChange(num);
        }
    }
    public gotoPreviousChapter() {
        const num = this.state.currentChapter - 1;
        if (num >= 0) {
            this.broadcast.chapterIndexChange(num);
        }
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

