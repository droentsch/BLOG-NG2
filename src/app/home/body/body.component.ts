import { Component, OnInit } from '@angular/core';
import { BroadcastService } from '../../service/broadcast.service';
import { IBlogConfig } from '../../model/IBlogConfig';
import { IChapter } from '../../model/IChapter';
import { ConfigService } from '../../service/config.service';
import { ContentService } from '../../service/content.service';
import { StateService } from '../../service/state.service';
@Component({
    selector: 'blog-body',
    styleUrls: ['body.component.css'],
    templateUrl: './body.component.html',
})
export class BodyComponent implements OnInit {
    public chapter: string;
    private broadcast: BroadcastService;
    private configService: ConfigService;
    private contentService: ContentService;
    private state: StateService;

    constructor(broadcast: BroadcastService, config: ConfigService,
                chapters: ContentService, state: StateService) {
        this.broadcast = broadcast;
        this.configService = config;
        this.contentService = chapters;
        this.state = state;
    }
    public ngOnInit() {
        this.registerBroadcasts();
    }
    private registerBroadcasts() {
        this.broadcast.onConfigData()
            .subscribe((data: IBlogConfig) => this.loadBlogData(data));
        this.broadcast.onChapterChange()
            .subscribe((data: string) => this.getChapter(data))
    }
    private loadBlogData(configData: IBlogConfig) {
        const chapter = configData.chapters[this.state.currentChapter];
        this.getChapter(chapter);
    }

    private getChapter(chapter: string) {
        this.configService.getBlogConfig(chapter)
            .subscribe((data: IChapter) => this.handleChapter(data), (error: string) => this.handleError(error));
    }

    private handleChapter(data: IChapter) {
        console.log(data);
        this.contentService.getChapter(data.contentToken)
            .subscribe((chap: string) => this.gimmeChapter(chap),
            (error: string) => this.handleError(error));
    }
    private gimmeChapter(chapter: string) {
        this.chapter = chapter;
    }
    private handleError(error: string) {
        console.log(`ERROR: ${error}`);
    }
}
