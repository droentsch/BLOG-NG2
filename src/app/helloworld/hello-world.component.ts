import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'hello-world.component.html',
    styleUrls: ['hello-world.component.css'],
})
export class HelloWorldComponent  {
    public user: string;
    constructor() {
        this.user = 'World';
    }
}
