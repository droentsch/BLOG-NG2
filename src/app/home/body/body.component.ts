import { Component, OnChanges } from '@angular/core';
import { ConfigService } from '../../service/config.service';
@Component({
    inputs: ['content'],
    selector: 'blog-body',
    templateUrl: './body.component.html',
})
export class BodyComponent  {
    private content: string;

    constructor() {
    }

    public ngOnChanges() {
        console.log(this.content);
    }
}
