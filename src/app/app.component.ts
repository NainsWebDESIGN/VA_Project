import { Component } from '@angular/core';
import { ApiService } from '@service/api.service';
import { InformationService } from '@service/Information.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService, InformationService]
})
export class AppComponent {
}
