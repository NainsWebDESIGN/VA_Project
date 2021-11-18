import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { HttpModule } from '@angular/http';
export const Lang: Lang = _Lang;

// Component & Route
import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/Login.component';

// Service
import { ApiService, Information } from '@service';

// PIPE && Module
import { PipeModule } from './pipe.module';
import { HeaderModule } from './header/header.module';
import { MemberModule } from './Console/Console.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    FormsModule,
    HttpClientModule,
    HttpModule,
    PipeModule,
    HeaderModule,
    MemberModule
  ],
  providers: [ApiService, Information, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
