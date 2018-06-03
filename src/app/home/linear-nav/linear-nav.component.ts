import  { Component } from '@angular/core';
import { StateService } from '../../service/state.service';

@Component({
    selector: 'linear-nav',
    styleUrls: ['./linear-nav.component.css', '../home.component.css'],
    templateUrl: 'linear-nav.component.html'
})
export class LinearNavComponent {

    private state: StateService;

    constructor(state: StateService) {
        this.state = state;
    }
    public gotoLastChapter() {
        const lastChap = this.getLastChapter();
        console.log(`Last known chapter: ${lastChap}`);
    }
    private getLastChapter(): string {
        const chaps = this.state.blogConfig.chapters;
        if (chaps.length) {
            return chaps[chaps.length - 1];
        }
        return '';
    }
}

