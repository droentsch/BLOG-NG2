import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../../service/constants.service';
import { BroadcastService } from '../../service/broadcast.service';
import { IBlogConfig } from '../../model/IBlogConfig';
import { IChapter } from '../../model/IChapter';

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

    constructor(constants: ConstantsService, broadcast: BroadcastService) {
        this.broadcast = broadcast;
        this.constants = constants;
        this.tocHeader = this.constants.TOC_HEADER;
        this.tocTitle = this.constants.TOC_TITLE;
        this.showTOC = false;
    }
    public ngOnInit() {
        this.registerBroadcast();
        this.currentIndex = 0;
    }
    public registerBroadcast() {
        this.broadcast.onConfigData()
            .subscribe((data: IBlogConfig) => this.loadTOCData(data));
        this.broadcast.onChapterIndexChange()
            .subscribe((data: number) => this.setChapterIndex(data))
    }
    public getChapterIndex(index: number) {
        this.currentIndex = index;
        this.broadcast.chapterIndexChange(index);
    }
    public setChapterIndex(index: number) {
        this.currentIndex = index;
    }
    public toggleTOC(): void {
        this.showTOC = !this.showTOC;
    }
    public isSelectedClass(index: number) {
        if (index === this.currentIndex) {
            return this.constants.SELECTED_CHAPTER_STYLE;
        } else {
            return this.constants.UNSELECTED_CHAPTER_STYLE;
        }
    }
    private loadTOCData(data: IBlogConfig) {
        this.chapters = data.chapters;
    }
}
