import { Component, OnInit, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApiService } from '@service/api.service';
import { Information } from '@service/information.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @HostListener('window:scroll', ['$event'])
  SetWidth(_Event) {
    let height = _Event.srcElement.scrollingElement.scrollHeight - _Event.srcElement.scrollingElement.clientHeight;
    let scrollbar = (_Event.srcElement.scrollingElement.scrollTop / height) * 100;
    document.getElementById("myBar").style.width = scrollbar + "%";
  }
  data: any = [];
  Menu: boolean = false;
  menuStyle: boolean = false;
  constructor(private api: ApiService, public infor: Information, private router: Router) { }
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
  toTop(_Where: number, ..._ID: Array<any>) {
    (_Where == 0) ? scroll(0, 0) : document.getElementById(_ID[0]).scrollIntoView({ behavior: 'smooth' });
  }
  ScrollToElement(_Item: number, $element: string) {
    let Contact = '/Valleys_Awesome/Contact';
    let Message = '/Valleys_Awesome/Message';
    let Service = '/Valleys_Awesome/Service';
    let About = '/Valleys_Awesome/About';
    this.openMenu('close');
    this.infor.pageLink[_Item] = $element;
    switch (_Item) {
      case 0:
        (this.infor.Page == About) ? this.toTop($element == 'AboutTop' ? 0 : 1, $element) : this.router.navigate([About]);
        break;
      case 1:
        (this.infor.Page == Message) ? this.toTop($element == 'MessTop' ? 0 : 1, $element) : this.router.navigate([Message]);
        break;
      case 2:
        (this.infor.Page == Service) ? this.toTop($element == 'SerTop' ? 0 : 1, $element) : this.router.navigate([Service]);
        break;
      case 3:
        (this.infor.Page == Contact) ? this.toTop($element == 'ConTop' ? 0 : 1, $element) : this.router.navigate([Contact]);
        break;
    }
  }
  ngOnInit() {
    this.api.postApi(113).subscribe(el => { this.data = el; })
  }

}
