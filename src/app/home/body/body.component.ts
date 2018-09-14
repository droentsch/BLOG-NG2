import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { BroadcastService } from '../../service/broadcast.service';
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
            .subscribe(() => this.loadBlogData());
        this.broadcast.onChapterIndexChange()
            .subscribe((data: number) => this.getChapter(data))
    }
    private loadBlogData() {
        this.getChapter(this.state.currentChapter);
    }

    private getChapter(chapterNumber: number) {
        const chapIndex = this.state.blogConfig.chapters.findIndex((val) => val.number === chapterNumber);
        if (chapIndex !== -1) {
        const chapter = this.state.blogConfig.chapters[chapIndex];
        this.configService.getBlogConfig(chapter.contentToken)
            .subscribe((data: IChapter) => this.handleChapter(data), (error: string) => this.handleError(error));

        }
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
