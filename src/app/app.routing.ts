import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadComponent } from './load/load.component';
import { IndexComponent } from './Index/Index.component';

const routes: Routes = [
  { path: '', redirectTo: '/VA-Technology', pathMatch: 'full' },
  { path: 'load', component: LoadComponent },
  { path: 'VA-Technology', component: IndexComponent },
  { path: '**', redirectTo: '/VA-Technology', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRouting { }
