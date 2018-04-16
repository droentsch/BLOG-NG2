import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { ContentDisplayComponent } from './content-display/content-display.component';

import 'rxjs/Rx'
import { BroadcastService } from '../service/broadcast.service';
import { ContentService } from '../service/content.service';
import { LinearNavComponent } from './linear-nav/linear-nav.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
    ],
    declarations: [
        HomeComponent,
        HeaderComponent,
        BodyComponent,
        ContentDisplayComponent,
        LinearNavComponent,
    ],
    providers: [
        Title,
        BroadcastService,
        ContentService,
    ]
})
export class HomeModule { }
