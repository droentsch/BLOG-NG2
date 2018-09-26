import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../../service/constants.service';
import { BroadcastService } from '../../service/broadcast.service';
import { IBlogConfig } from '../../model/IBlogConfig';
import { IChapter } from '../../model/IChapter';
import { TocState } from '../../model/TocState.enum';
import { StateService } from '../../service/state.service';

@Component({
    selector: 'toc',
    styleUrls: ['./toc.component.css'],
    templateUrl: './toc.component.html',
})
export class TocComponent implements OnInit {
    public tocHeader: string;
    public tocTitle: string;
    public showTOC: boolean;
    public chapters: IChapter[];
    private currentIndex: number;
    private constants: ConstantsService;
    private broadcast: BroadcastService;
    private state: StateService;
    private troggle: TocState;

    constructor(constants: ConstantsService, broadcast: BroadcastService, state: StateService) {
        this.broadcast = broadcast;
        this.constants = constants;
        this.state = state;
        this.tocHeader = this.constants.TOC_HEADER;
        this.tocTitle = this.constants.TOC_TITLE;
        this.showTOC = false;
        this.troggle = TocState.DESCENDING;
    }
    public ngOnInit() {
        this.registerBroadcast();
    }
    public registerBroadcast() {
        this.broadcast.onChapterIndexChange()
            .subscribe((data: number) => this.setChapterIndex(data))
    }
    public getChapterIndex(index: number) {
        this.currentIndex = index;
        this.broadcast.chapterIndexChange(index);
    }
    public setChapterIndex(index: number) {
        this.chapters = this.state.blogConfig.chapters;
        const lastChapter = this.state.getLastChapter();
        if (index <= lastChapter.number) {
            this.currentIndex = index;
        } else {
            this.currentIndex = lastChapter.number;
        }
    }
    public troggleTOC(): void {
        if (this.troggle === TocState.HIDDEN) {
            this.showTOC = true;
            this.troggle = TocState.DESCENDING;
        } else if (this.troggle === TocState.SHOWN) {
            this.showTOC = false;
            this.troggle = TocState.HIDDEN;
        } else if (this.troggle === TocState.DESCENDING) {
            this.chapters = this.chapters.reverse();
            this.showTOC = true;
            this.troggle = TocState.SHOWN;
        }
    }
    public isSelectedClass(index: number) {
        if (index === this.currentIndex) {
            return this.constants.SELECTED_CHAPTER_STYLE;
        } else {
            return this.constants.UNSELECTED_CHAPTER_STYLE;
        }
    }
}
