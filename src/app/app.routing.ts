import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './Login/Login.component';
import { ConsoleComponent } from './Console/Console.component';
import { LoginAbout, LoginMessage, LoginService, LoginContact } from './Console/loginchild/loginchild.component';

// Service
import { AuthGuard } from '@service';
import { Preload } from '@app/service/preload.service';

const routes: Routes = [
  { path: '', redirectTo: '/Valleys_Awesome/Welcome', pathMatch: 'full' },
  { path: 'Valleys_Awesome', loadChildren: 'app/header/header.module#HeaderModule' },
  { path: 'Login', component: LoginComponent },
  {
    path: 'Member', component: ConsoleComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: '/Member/loginAbout', pathMatch: 'full' },
      { path: 'loginAbout', component: LoginAbout },
      { path: 'loginMessage', component: LoginMessage },
      { path: 'loginService', component: LoginService },
      { path: 'loginContact', component: LoginContact },
      { path: '**', redirectTo: '/Member/loginAbout', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/Valleys_Awesome/Welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [AuthGuard, Preload]
})
export class AppRouting { }
