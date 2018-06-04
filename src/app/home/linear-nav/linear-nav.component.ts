import  { Component } from '@angular/core';
import { StateService } from '../../service/state.service';
import { BroadcastService } from '../../service/broadcast.service';

@Component({
    selector: 'linear-nav',
    styleUrls: ['./linear-nav.component.css', '../home.component.css'],
    templateUrl: 'linear-nav.component.html'
})
export class LinearNavComponent {

    private state: StateService;
    private broadcast: BroadcastService;

    constructor(state: StateService, broadcast: BroadcastService) {
        this.state = state;
        this.broadcast = broadcast;
    }
    public gotoLastChapter() {
        const lastChap = this.getLastChapter();
        if (lastChap !== '') {
            this.broadcast.chapterChange(lastChap);
        }
        console.log(`Last known chapter: ${lastChap}`);
    }
    private getLastChapter(): string {
        const chaps = this.state.blogConfig.chapters;
        if (chaps.length) {
            this.state.currentChapter = chaps[chaps.length - 1];
            return chaps[chaps.length - 1];
        }
        return '';
    }
}

