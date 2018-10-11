import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BroadcastService } from '../../service/broadcast.service';
import { IChapter } from '../../model/IChapter';
import { ConfigService } from '../../service/config.service';
import { ContentService } from '../../service/content.service';
import { StateService } from '../../service/state.service';
import { IBlogConfig } from '../../model/IBlogConfig';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'blog-body',
    styleUrls: ['body.component.css'],
    templateUrl: './body.component.html',
})
export class BodyComponent implements OnInit {
    public feeds: string[];
    public chapter: string;
    private broadcast: BroadcastService;

    constructor(broadcast: BroadcastService, private configService: ConfigService,
        private contentService: ContentService, private state: StateService,
        private router: Router, private title: Title) {
        this.broadcast = broadcast;
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.handleRoute(event);
            }
        });
        this.feeds = [];
    }
    public ngOnInit() {
        this.registerBroadcasts();
    }
    private registerBroadcasts() {
        this.broadcast.onChapterIndexChange()
            .subscribe((data: number) => this.getChapter(data))
    }

    private getChapter(chapterNumber: number) {
        const chapter = this.state.blogConfig.chapters.find((val) => val.number === chapterNumber);
        this.configService.getBlogConfig(chapter.contentToken)
            .subscribe((data: IChapter) => this.handleChapter(data), (error: string) => this.handleError(error));
    }

    private handleChapter(data: IChapter) {
        this.feeds = data.audioFeeds;
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
    private handleRoute(end: NavigationEnd): void {
        let chapter: number;
        if (!this.state.blogConfig) {
            this.configService.getConfig()
                .subscribe((data: IBlogConfig) => {
                    this.handleConfig(data);
                    if (end.url === '/' || end.url === '/book') {
                        chapter = this.state.getLastChapter().number;
                        this.router.navigate([`/book/${chapter}`]);
                    } else {
                        chapter = parseInt(end.url.split('/').pop(), 10);
                    }
                    this.state.currentChapter = chapter;
                    this.broadcast.chapterIndexChange(chapter);
                }
                    ,
                    (err) => this.handleConfigError(err));
        }
    }
    private handleConfig(data: IBlogConfig): void {
        this.title.setTitle(data.blogTitle);
        this.state.blogConfig = data
        this.broadcast.configData(data);
    }
    private handleConfigError(error: string): void {
        // TODO: Figure out what to do with this error.
        console.log(`Error ${error} getting configuration.`);
    }
}
