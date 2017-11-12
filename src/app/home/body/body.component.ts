import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    inputs: ['content'],
    moduleId: module.id,
    selector: 'blog-body',
    styleUrls: ['body.component.css'],
    templateUrl: 'body.component.html',
})
export class BodyComponent  {
    constructor() {
    }
}
