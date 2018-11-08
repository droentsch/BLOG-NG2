import { Component } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
@Component({
    selector: 'content-display',
    inputs: ['content'],
    templateUrl: './content-display.component.html',
    styleUrls: ['./content-display.component.css']
})
export class ContentDisplayComponent {
    public content: SafeHtml;

    constructor() {

    }
}
