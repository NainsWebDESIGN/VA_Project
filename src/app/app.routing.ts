import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './Index/Index.component';
import { ContactComponent } from './contact/contact.component';
import { MessageComponent } from './message/message.component';
import { ServicePageComponent } from './servicePage/servicePage.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './Login/Login.component';
import { ConsoleComponent } from './Console/Console.component';

// Service
import { AuthGuard } from '@service/AuthGuard.service';

const routes: Routes = [
  { path: '', redirectTo: '/Valleys_Awesome/Welcome', pathMatch: 'full' },
  {
    path: 'Valleys_Awesome', component: HeaderComponent,
    children: [
      { path: '', redirectTo: '/Valleys_Awesome/Welcome', pathMatch: 'full' },
      { path: 'Welcome', component: IndexComponent },
      { path: 'Contact', component: ContactComponent },
      { path: 'Message', component: MessageComponent },
      { path: 'Service', component: ServicePageComponent },
      { path: 'About', component: AboutComponent },
      { path: '**', redirectTo: '/Valleys_Awesome/Welcome', pathMatch: 'full' }
    ]
  },
  { path: 'Login', component: LoginComponent },
  {
    path: 'Member', component: ConsoleComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/Valleys_Awesome/Welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRouting { }
