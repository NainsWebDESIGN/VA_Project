import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadComponent } from './load/load.component';
import { IndexComponent } from './Index/Index.component';
import { ContactComponent } from './contact/contact.component';
import { MessageComponent } from './message/message.component';
import { ServiceComponent } from './service/service.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/VA-Technology', pathMatch: 'full' },
  { path: 'load', component: LoadComponent },
  { path: 'VA-Technology', component: IndexComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'Message', component: MessageComponent },
  { path: 'Service', component: ServiceComponent },
  { path: 'About', component: AboutComponent },
  { path: '**', redirectTo: '/VA-Technology', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRouting { }
