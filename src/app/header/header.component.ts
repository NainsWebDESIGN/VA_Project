import { Component, OnInit } from '@angular/core';
import { InformationService } from '@service/Information.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Menu: boolean;
  menuStyle: boolean = false;
  constructor(private menu: InformationService) { }
  openMenu() {
    this.menu.MenuEffect(!this.menuStyle);
    this.menuStyle = !this.menuStyle;
  }
  ngOnInit() {
    this.menu.Menu$.subscribe(el => { this.Menu = el; })
  }

}
