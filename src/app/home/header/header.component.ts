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
}
