import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    inputs: ['content'],
    moduleId: module.id,
    selector: 'blog-header',
    styleUrls: ['header.component.css'],
    templateUrl: 'header.component.html',
})
export class HeaderComponent  {
    constructor() {
    }
}
