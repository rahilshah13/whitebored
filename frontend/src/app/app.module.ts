import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FeedComponent } from './feed/feed.component';
import { MyBoardComponent } from './myboard/myboard.component';
import { RegisterComponent } from './register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor} from './_interceptors/error.interceptor';
import {JwtInterceptor} from './_interceptors/jwt.interceptor';
import {SocketioService} from './_services/socketio.service';
import {MaterialModule} from './material-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NgWhiteboardModule} from 'ng-whiteboard';
import { NgWhiteboardService } from 'ng-whiteboard';

@NgModule({
  declarations: [
    AppComponent,
    WhiteboardComponent,
    HomeComponent,
    LoginComponent,
    FeedComponent,
    MyBoardComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    NgWhiteboardModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    SocketioService, NgWhiteboardService],
  bootstrap: [AppComponent]
})

export class AppModule { }
