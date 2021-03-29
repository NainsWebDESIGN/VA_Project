import { Component, OnInit } from '@angular/core';
import { InformationService } from '@service/Information.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Menu: boolean;
  constructor(private menu: InformationService) { }
  ngOnInit() {
    this.menu.Menu$.subscribe(el => {
      console.log(el);
      this.Menu = el;
    })
  }

}
