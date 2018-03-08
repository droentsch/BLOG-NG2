import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BroadcastService } from '../../service/broadcast.service';
import { IBlogConfig } from '../../model/IBlogConfig';

@Component({
    inputs: ['content'],
    selector: 'blog-header',
    styleUrls: ['header.component.css'],
    templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit  {
    public title: string;
    public byline: string;
    public firstTitleWord: string;
    public titleRemainder: string;

    private broadcast: BroadcastService;
    constructor(broadcast: BroadcastService) {
        this.broadcast = broadcast;
    }

    public ngOnInit() {
        this.registerBroadcastHandlers();
    }

    private registerBroadcastHandlers() {
        this.broadcast.onConfigData()
            .subscribe((data: IBlogConfig) => this.handleConfigData(data),
                       (error: string) => this.handleConfigError(error));
    }
    private handleConfigData(data: IBlogConfig) {
        let first: string;
        let rest: string;
        if (data.EmphasizeFirstWord === true) {
            ({ first, rest } = this.getFirstWordAndRemainder());
            this.firstTitleWord = first;
            this.titleRemainder = rest;
        } else {
            this.title = data.blogTitle;
        }
        this.byline = data.blogByline;
    }
    private handleConfigError(error: string) {
        // TODO: Show the user the error
        console.log(error);
    }
}
