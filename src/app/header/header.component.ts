import { Component, OnInit } from '@angular/core';
import { ApiService } from '@service/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  data: any = [];
  Menu: boolean = false;
  menuStyle: boolean = false;
  constructor(private api: ApiService) { }
  openMenu(_Effect: string) {
    switch (_Effect) {
      case 'open':
        this.menuStyle = !this.menuStyle;
        break;
      case 'close':
        this.menuStyle = false;
        break;
    }
    this.Menu = this.menuStyle;
  }
  ngOnInit() {
    this.api.postApi(113).subscribe(el => { this.data = el; })
  }

}
