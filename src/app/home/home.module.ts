import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
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
    ],
    providers: [
    ]
})
export class HomeModule { }
