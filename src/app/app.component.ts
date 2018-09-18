import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BroadcastService } from './service/broadcast.service';
import { ConfigService } from './service/config.service';
import { StateService } from './service/state.service';
import { IBlogConfig } from './model/IBlogConfig';

@Component({
    selector: 'blog-app',
    template: `
<div>
    <router-outlet></router-outlet>
</div>
`,
})
export class AppComponent implements OnInit {
    public title: Title;
    private config: ConfigService;

    constructor(title: Title, config: ConfigService, private state: StateService ) {
        this.title = title;
        this.config = config;
    }

    public ngOnInit() {
        // TODO: CREATE A LOADER COMPONENT
        this.config.getConfig()
            .subscribe((data: IBlogConfig) => this.handleConfig(data),
            () => this.handleConfigError);
    }

    private handleConfig(data: IBlogConfig): void {
        this.title.setTitle(data.blogTitle);
        this.state.blogConfig = data;
    }

    private handleConfigError(error: string): void {
        // TODO: MAKE A VISIBLE ERROR HANDLER
        console.error(error);
    }


}
