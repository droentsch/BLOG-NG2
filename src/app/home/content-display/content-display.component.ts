import { Component, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
@Component({
    selector: 'content-display',
    templateUrl: './content-display.component.html',
    styleUrls: ['./content-display.component.css']
})
export class ContentDisplayComponent {
    @Input() content: SafeHtml;

    constructor() {

    }
}
