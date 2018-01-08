import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
    private state: StateService;

    constructor(title: Title, config: ConfigService, state: StateService ) {
        this.title = title;
        this.config = config;
        this.state = state;
    }

    public ngOnInit() {
        // TODO: CREATE A LOADER COMPONENT
        this.config.getConfig()
            .subscribe((data: IBlogConfig) => this.handleConfig(data),
            (error) => this.handleConfigError);
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
