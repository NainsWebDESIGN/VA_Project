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
  Year: any = new Date().getFullYear();
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
  toTop() {
    scroll(0, 0);
  }
  ScrollToElement(_Item: number, $element: string) {
    let local = '/Valleys_Awesome/';
    this.openMenu('close');
    switch (_Item) {
      case 0:
        if (this.infor.Page == (local + 'About')) {
          if ($element == 'team') { return scroll(0, 0); }
          else {
            let el = document.getElementById($element);
            return el.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          this.infor.AboutLink = $element;
          return this.router.navigate(['/Valleys_Awesome/About']);
        }
    }
  }
  ngOnInit() {
    this.api.postApi(113).subscribe(el => { this.data = el; })
  }

}
