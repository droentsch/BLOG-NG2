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
        this.broadcast.chapterIndexChange(1);
    }
    public gotoLastChapter() {
        const lastChapter = this.getLastChapter();
        this.broadcast.chapterIndexChange(lastChapter.number);
    }
    public gotoNextChapter() {
        const num = this.state.currentChapter + 1;
        this.broadcast.chapterIndexChange(num);
    }
    public gotoPreviousChapter() {
        const num = this.state.currentChapter - 1;
        this.broadcast.chapterIndexChange(num);
    }
    private getChapterByIndex(idx: number) {
        const chaps = this.state.blogConfig.chapters;
        let chapIndex = this.getChapterIndexFromNumber(idx);
        if (chapIndex !== -1) {
            this.state.currentChapter = chaps[chapIndex].number;
            if (chapIndex + 1 === chaps.length) {
                this.setLastChapterState();
            } else if (chapIndex === 0) {
                this.setFirstChapterState();
            } else {
                this.setMidChapterState();
            }
            return chaps[chapIndex].contentToken;
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
    private getChapterIndexFromNumber(chapterNumber: number) {
        return this.state.blogConfig.chapters.findIndex((val) => val.number === chapterNumber);
    }
    private getLastChapter() {
        let highVal: IChapter;
        this.state.blogConfig.chapters.forEach((val) => {
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

