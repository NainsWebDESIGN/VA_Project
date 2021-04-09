import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// Component & Route
import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { IndexComponent } from './Index/Index.component';
import { ContactComponent } from './contact/contact.component';
import { MessageComponent } from './message/message.component';
import { AboutComponent } from './about/about.component';
import { ServicePageComponent } from './servicePage/servicePage.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './Login/Login.component';
import { ConsoleComponent } from './Console/Console.component';

// Service
import { ApiService } from '@service/api.service';
import { Information } from '@service/information.service';
import { PopupComponent } from './popup/popup.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ContactComponent,
    MessageComponent,
    AboutComponent,
    ServicePageComponent,
    HeaderComponent,
    PopupComponent,
    LoginComponent,
    ConsoleComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [ApiService, Information],
  bootstrap: [AppComponent]
})
export class AppModule { }
