import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { ConsoleComponent } from '../Console/Console.component';
import { LoginAbout, LoginMessage, LoginService, LoginContact } from '../Console/loginchild/loginchild.component';

// Service
import { AuthGuard } from '@service';

const routes: Routes = [
  {
    path: '', component: ConsoleComponent,
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MemberRoute { }