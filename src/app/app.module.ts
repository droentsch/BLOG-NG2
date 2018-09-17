import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import 'rxjs/Rx'
import { ConfigService } from './service/config.service';
import { StateService } from './service/state.service';

const APP_ROUTES: Routes = [
    { path: 'book/:id', component: HomeComponent },
    { path: '', redirectTo: 'book/1', pathMatch: 'full' },
    { path: 'book', redirectTo: 'book/1', pathMatch: 'full' },
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(APP_ROUTES),
        HttpClientModule,
        HomeModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
        ConfigService,
        StateService,
  ]
})
export class AppModule { }
