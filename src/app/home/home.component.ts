import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../service/config.service';
import { BroadcastService } from '../service/broadcast.service';
import { IBlogConfig } from '../model/IBlogConfig';
import { IChapter } from '../model/IChapter';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    private configService: ConfigService;
    private broadcast: BroadcastService;

    constructor(config: ConfigService, broadcast: BroadcastService) {
        this.configService = config;
        this.broadcast = broadcast;
    }
    public ngOnInit() {
        this.registerBroadcasts();
    }
    private registerBroadcasts() {
        this.broadcast.onConfigData()
            .subscribe( (data: IBlogConfig) => this.loadBlogData(data) );
    }
    private loadBlogData(configData: IBlogConfig) {
        // On load, show chapter 1 for now
        const chapter = configData.chapters[0];
        this.configService.getBlogConfig(chapter)
            .subscribe( (data: IChapter) => this.handleChapter(data),
            (error) => this.handleError(error));
    }
    private handleChapter(data: IChapter) {
        console.log(data);
    }
    private handleError(error: string) {
        console.log(`ERROR: ${error}`);
    }
}
