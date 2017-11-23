import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../service/config.service';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {
    private config: ConfigService;

    constructor(config: ConfigService) {
        this.config = config;
    }

    public ngOnInit(): void {
        this.getBlogConfig();
        this.loadInitialContents();
    }
    private getBlogConfig(): void {
        this.config.getBlogConfig()
    }

    public loadInitialContents(): void {

    }
}
