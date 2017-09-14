import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HelloWorldComponent } from './hello-world.component';


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
export class HelloWorldModule { }
