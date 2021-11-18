import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';
import { HeaderRoute } from './header.routing';
import { IndexComponent } from '../Index/Index.component';
import { ContactComponent } from '../contact/contact.component';
import { MessageComponent } from '../message/message.component';
import { AboutComponent } from '../about/about.component';
import { ServicePageComponent } from '../servicePage/servicePage.component';
import { messagePopup } from '../popup/popup.component';

import { PipeModule } from '../pipe.module';

// Service
import { ApiService, Information, AuthGuard } from '@service';

@NgModule({
  imports: [
    CommonModule,
    HeaderRoute,
    PipeModule,
    FormsModule
  ],
  declarations: [
    HeaderComponent,
    IndexComponent,
    ContactComponent,
    MessageComponent,
    AboutComponent,
    ServicePageComponent,
    messagePopup
  ],
  providers: [ApiService, Information, AuthGuard]
})
export class HeaderModule { }
