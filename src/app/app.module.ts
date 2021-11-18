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
import { ConsoleComponent } from './Console/Console.component';
import { LoginAbout, LoginMessage, LoginService, LoginContact } from './Console/loginchild/loginchild.component';

// Service
import { ApiService, Information, AuthGuard } from '@service';

// PIPE
import { PipeModule } from './pipe.module';
import { HeaderModule } from './header/header.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConsoleComponent,
    LoginAbout,
    LoginMessage,
    LoginService,
    LoginContact
  ],
  imports: [
    BrowserModule,
    AppRouting,
    FormsModule,
    HttpClientModule,
    HttpModule,
    PipeModule,
    HeaderModule
  ],
  providers: [ApiService, Information, AuthGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
