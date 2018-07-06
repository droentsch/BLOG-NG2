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
    public showTOC: boolean;
    public chapters: IChapter[];
    private constants: ConstantsService;
    private broadcast: BroadcastService;

    constructor(constants: ConstantsService, broadcast: BroadcastService) {
        this.broadcast = broadcast;
        this.constants = constants;
        this.tocHeader = this.constants.TOC_HEADER;
        this.showTOC = false;
    }
    public ngOnInit() {
        this.broadcast.onConfigData()
            .subscribe((data: IBlogConfig) => this.loadTOCData(data));
    }
    public getChapterIndex(index: number) {
        this.broadcast.chapterIndexChange(index);
    }
    public toggleTOC(): void {
        this.showTOC = !this.showTOC;
    }
    private loadTOCData(data: IBlogConfig) {
        this.chapters = data.chapters;
    }
}
