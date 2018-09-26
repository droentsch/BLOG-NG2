import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BroadcastService } from './service/broadcast.service';
import { ConfigService } from './service/config.service';
import { StateService } from './service/state.service';
import { IBlogConfig } from './model/IBlogConfig';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'blog-app',
    template: `
<div>
    <router-outlet></router-outlet>
</div>
`,
})
export class AppComponent implements OnInit {

    constructor(private title: Title,
        private config: ConfigService,
        private state: StateService,
        private broadcast: BroadcastService,
        private router: Router) {
    }

    public ngOnInit() {
        // TODO: CREATE A LOADER COMPONENT
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.handleRoute(event);
            }
        });
    }

    private handleState(data: IBlogConfig): void {
        this.title.setTitle(data.blogTitle);
        this.state.blogConfig = data;
        this.broadcast.configData(data);
        this.broadcast.chapterIndexChange(this.state.currentChapter);
    }

    private handleConfigError(error: string): void {
        // TODO: MAKE A VISIBLE ERROR HANDLER
        console.error(error);
    }

    private handleRoute(end: NavigationEnd): void {
        let chapter = 1;
        if (end.url !== '/') {
            chapter = parseInt(end.url.split('/').pop(), 10);
        }
        this.state.currentChapter = chapter;
        console.log(chapter);
        this.config.getConfig()
            .subscribe((data: IBlogConfig) =>
                this.handleState(data)
            ,
                (err) => this.handleConfigError(err));
        }
}
