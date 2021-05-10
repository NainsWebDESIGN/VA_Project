import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
export const Lang: Lang = _Lang;

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
import { LoginAbout, LoginMessage, LoginService, LoginContact } from './Console/loginchild/loginchild.component';

// Service
import { ApiService } from '@service/api.service';
import { Information } from '@service/information.service';
import { messagePopup } from './popup/popup.component';
import { AuthGuard } from '@service/AuthGuard.service';

// PIPE
import { TranslationPipe } from '@pipe/translation.pipe';
import { KeyPipe } from '@pipe/key.pipe';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ContactComponent,
    MessageComponent,
    AboutComponent,
    ServicePageComponent,
    HeaderComponent,
    messagePopup,
    LoginComponent,
    ConsoleComponent,
    TranslationPipe,
    LoginAbout,
    LoginMessage,
    LoginService,
    LoginContact,
    KeyPipe
  ],
  imports: [
    BrowserModule,
    AppRouting,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [ApiService, Information, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
