import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from '../Index/Index.component';
import { ContactComponent } from '../contact/contact.component';
import { MessageComponent } from '../message/message.component';
import { AboutComponent } from '../about/about.component';
import { ServicePageComponent } from '../servicePage/servicePage.component';
import { HeaderComponent } from './header.component';

import { Preload } from '@app/service/preload.service';

const routes: Routes = [
  {
    path: '', component: HeaderComponent,
    children: [
      { path: '', redirectTo: '/Valleys_Awesome/Welcome', pathMatch: 'full' },
      {
        path: 'Welcome', component: IndexComponent,
        resolve: { data: Preload }
      },
      { path: 'Contact', component: ContactComponent },
      { path: 'Message', component: MessageComponent },
      { path: 'Service', component: ServicePageComponent },
      { path: 'About', component: AboutComponent },
      { path: '**', redirectTo: '/Valleys_Awesome/Welcome', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HeaderRoute { }