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
  /** data存放原始資料 */
  data: Array<any> = [];
  Menu: boolean = false;
  menuStyle: boolean = false;
  constructor(private api: ApiService, public infor: Information, private router: Router) { }
  ChangeLang(_Lang: string) {
    this.infor.lang = _Lang;
  }
  openMenu(_Effect: string) {
    this.menuStyle = _Effect == 'open' ? !this.menuStyle : false;
    this.Menu = this.menuStyle;
  }
  toTop(_Where: number, ..._ID: Array<any>) {
    switch (_Where) {
      case 0:
        scroll(0, 0);
        this.infor.pageLink = ['AboutTop', 'MessTop', 'SerTop', 'ConTop'];
        break;
      default:
        document.getElementById(_ID[0]).scrollIntoView({ behavior: 'smooth' });
        break;
    }
  }
  ScrollToElement(_Item: number, $element: string) {
    let route = (el: string) => { return '/Valleys_Awesome/' + el; };
    this.openMenu('close');
    this.infor.pageLink[_Item] = $element;
    switch (_Item) {
      case 0:
        this.infor.Page == route('About') ? this.toTop($element == 'AboutTop' ? 0 : 1, $element) : this.router.navigate([route('About')]);
        break;
      case 1:
        this.infor.Page == route('Message') ? this.toTop($element == 'MessTop' ? 0 : 1, $element) : this.router.navigate([route('Message')]);
        break;
      case 2:
        this.infor.Page == route('Service') ? this.toTop($element == 'SerTop' ? 0 : 1, $element) : this.router.navigate([route('Service')]);
        break;
      case 3:
        this.infor.Page == route('Contact') ? this.toTop($element == 'ConTop' ? 0 : 1, $element) : this.router.navigate([route('Contact')]);
        break;
    }
  }
  ngOnInit() {
    this.api.postApi('header').subscribe((el: any) => { this.data = el; });
  }

}
