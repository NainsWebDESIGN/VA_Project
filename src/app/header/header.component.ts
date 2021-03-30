import { Component, OnInit } from '@angular/core';
import { InformationService } from '@service/Information.service';
import { ApiService } from '@service/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  data: any = [];
  Menu: boolean;
  menuStyle: boolean = false;
  constructor(private menu: InformationService, private api: ApiService) { }
  openMenu(_Effect: string) {
    switch (_Effect) {
      case 'open':
        this.menuStyle = !this.menuStyle;
        break;
      case 'close':
        this.menuStyle = false;
        break;
    }
    this.menu.MenuEffect(this.menuStyle);
  }
  ngOnInit() {
    this.menu.Menu$.subscribe(el => { this.Menu = el; })
    this.api.postApi(113).subscribe(el => { this.data = el; })
  }

}
