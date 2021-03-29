import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouting } from './app.routing';


import { AppComponent } from './app.component';
import { LoadComponent } from './load/load.component';
import { IndexComponent } from './Index/Index.component';
import { ContactComponent } from './contact/contact.component';
import { MessageComponent } from './message/message.component';
import { ServiceComponent } from './service/service.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [					
    AppComponent,
    LoadComponent,
      IndexComponent,
      ContactComponent,
      MessageComponent,
      ServiceComponent,
      AboutComponent
   ],
  imports: [
    BrowserModule,
    AppRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
