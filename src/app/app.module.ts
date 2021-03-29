import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouting } from './app.routing';


import { AppComponent } from './app.component';
import { LoadComponent } from './load/load.component';
import { IndexComponent } from './Index/Index.component';


@NgModule({
  declarations: [	
    AppComponent,
    LoadComponent,
      IndexComponent
   ],
  imports: [
    BrowserModule,
    AppRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
