import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { HttpModule } from '@angular/http';


import 'rxjs/Rx'


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        HttpModule
    ],
    declarations: [
        HomeComponent,
        HeaderComponent,
        BodyComponent
    ],
    providers: [
        Title
    ]
})
export class HomeModule { }
