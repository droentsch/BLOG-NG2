import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HelloWorldComponent } from './helloworld/hello-world.component';
import { HelloWorldModule } from './helloworld/hello-world.module';
import { AppComponent } from './app.component';
import 'rxjs/Rx'

const APP_ROUTES: Routes = [
    { path: 'hw', component: HelloWorldComponent },
    { path: '', redirectTo: '/hw', pathMatch: 'full' }
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(APP_ROUTES),
        HttpModule,
        HelloWorldModule,
    ],
    declarations: [
        AppComponent,
        HelloWorldComponent
    ],
    bootstrap: [AppComponent],
    providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class AppModule { }
