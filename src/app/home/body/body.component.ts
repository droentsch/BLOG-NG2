import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from '../../service/config.service';
@Component({
    inputs: ['content'],
    selector: 'blog-body',
    templateUrl: './body.component.html',
})
export class BodyComponent  {

    constructor() {
    }
}
