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

    constructor(broadcast: BroadcastService, config: ConfigService,
        chapters: ContentService, private state: StateService,
        private route: ActivatedRoute, private router: Router) {
        this.broadcast = broadcast;
        this.configService = config;
        this.contentService = chapters;
    }
    public ngOnInit() {
        // this.registerBroadcasts();
        if (this.route.snapshot.paramMap.has('id')) {
            this.state.currentChapter = parseInt(this.route.snapshot.paramMap.get('id'), 10);
            this.getChapter(this.state.currentChapter);
        }
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
        const chapter = this.state.blogConfig.chapters.find((val) => val.number === chapterNumber);
        this.configService.getBlogConfig(chapter.contentToken)
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
