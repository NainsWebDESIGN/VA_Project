import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MemberRoute } from './Console.routing';

// Component
import { ConsoleComponent } from './Console.component';
import { LoginAbout, LoginMessage, LoginService, LoginContact } from '../Console/loginchild/loginchild.component';

// Service
import { ApiService, Information, AuthGuard } from '@service';

// Pipe
import { PipeModule } from '../pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MemberRoute,
    PipeModule
  ],
  declarations: [
    ConsoleComponent,
    LoginAbout,
    LoginMessage,
    LoginService,
    LoginContact
  ],
  providers: [ApiService, Information, AuthGuard]
})
export class MemberModule { }
