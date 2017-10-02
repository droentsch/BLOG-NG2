import {Component} from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
    selector: 'blog-app',
    template: `
<div>
    <router-outlet></router-outlet>
</div>
`,
})
export class AppComponent {
    public title: Title;
    constructor(title: Title) {
        this.title = title;
        this.title.setTitle('Some blog');
    }
}
