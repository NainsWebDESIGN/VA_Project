import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@service/api.service';
import { Information } from '@service/information.service';

@Component({
  selector: 'app-Console',
  templateUrl: './Console.component.html',
  styleUrls: ['./Console.component.css']
})
export class ConsoleComponent implements OnInit, OnDestroy {
  Menu: boolean = true;
  Language: boolean = false;
  time: any = new Date();
  User: string = '';
  constructor(private router: Router, private api: ApiService, public infor: Information) { }
  Effect(_Popup: string) {
    switch (_Popup) {
      case 'menu':
        this.Menu = !this.Menu;
        break;
      case 'lang':
        this.Language = !this.Language;
        break;
    }
  }
  ChangeLang(_Lang: string) {
    this.infor.Language = _Lang;
  }
  childRoute(_Route: string) {
    let route = '/Member/';
    this.router.navigate([route + _Route]);
  }
  logout() {
    localStorage.removeItem('login');
    this.router.navigate(['/Valleys_Awesome']);
  }
  ngOnInit() {
    this.User = localStorage.getItem('login');
  }
  ngOnDestroy() {
    localStorage.removeItem('login');
  }

}
