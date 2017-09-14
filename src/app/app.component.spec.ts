import { } from 'jasmine';
import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule, Routes, Route } from '@angular/router';
import { async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HelloWorldComponent } from './helloworld/hello-world.component'
import 'rxjs/Rx'

describe('The app.component', () => {

  const APP_ROUTES: Routes = [
    { path: 'hw', component: HelloWorldComponent }
  ];
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterModule.forRoot(APP_ROUTES)
      ],
      declarations: [
        AppComponent,
        HelloWorldComponent,
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
  });

  it('should build without a problem',
    async(() => {
      TestBed
        .compileComponents()
        .then(() => {
          let fixture = TestBed.createComponent(AppComponent);
          let compiled = fixture.nativeElement;

          expect(compiled).toBeTruthy();
        });
    }));
});
