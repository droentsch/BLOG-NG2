import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {
    public user: string;
    constructor() {
        this.user = 'World';
    }

    public ngOnInit(): void {
        getBlogConfig();
        loadInitialContents();
    }
}
