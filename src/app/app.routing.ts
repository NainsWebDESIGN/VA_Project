import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './Login/Login.component';

// Service
import { Preload } from '@app/service/preload.service';

const routes: Routes = [
  { path: '', redirectTo: '/Valleys_Awesome/Welcome', pathMatch: 'full' },
  { path: 'Valleys_Awesome', loadChildren: 'app/header/header.module#HeaderModule' },
  { path: 'Login', component: LoginComponent },
  {
    path: 'Member', loadChildren: 'app/Console/Console.module#MemberModule'
  },
  { path: '**', redirectTo: '/Valleys_Awesome/Welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [Preload]
})
export class AppRouting { }
