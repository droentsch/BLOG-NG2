import { Component } from '@angular/core';
@Component({
    selector: 'content-display',
    inputs: ['content'],
    templateUrl: './content-display.component.html',
    styleUrls: ['./content-display.component.css']
})
export class ContentDisplayComponent {
    public content: string;

    constructor() {

    }
}
