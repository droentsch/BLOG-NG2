import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    inputs: ['content'],
    selector: 'blog-body',
    templateUrl: './body.component.html',
})
export class BodyComponent  {
    constructor() {
    }
}
