import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// Component & Route
import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { LoadComponent } from './load/load.component';
import { IndexComponent } from './Index/Index.component';
import { ContactComponent } from './contact/contact.component';
import { MessageComponent } from './message/message.component';
import { AboutComponent } from './about/about.component';
import { ServicePageComponent } from './servicePage/servicePage.component';
import { HeaderComponent } from './header/header.component';

// Service
import { ApiService } from '@service/api.service';


@NgModule({
  declarations: [
    AppComponent,
    LoadComponent,
    IndexComponent,
    ContactComponent,
    MessageComponent,
    AboutComponent,
    ServicePageComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
