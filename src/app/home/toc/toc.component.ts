import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../../service/constants.service';
import { BroadcastService } from '../../service/broadcast.service';

@Component({
    selector: 'toc',
    styleUrls: ['./toc.component.css'],
    templateUrl: './toc.component.html',
})
export class TocComponent implements OnInit {
    public tocHeader: string;
    private constants: ConstantsService;
    private broadcast: BroadcastService;

    constructor(constants: ConstantsService, broadcast: BroadcastService) {
        this.broadcast = broadcast;
        this.constants = constants;
        this.tocHeader = this.constants.TOC_HEADER;
    }
    public ngOnInit() {
    }
}
