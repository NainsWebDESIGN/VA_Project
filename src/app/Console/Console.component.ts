import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Information } from '@service/information.service';

@Component({
  selector: 'app-Console',
  templateUrl: './Console.component.html',
  styleUrls: ['./Console.component.css']
})
export class ConsoleComponent implements OnInit, OnDestroy {
  /** 菜單展開樣式 */
  Menu: boolean = true;
  /** 語系展開樣式 */
  Language: boolean = false;
  /** 登入時間 */
  time: Date = new Date();
  /** 登入用戶 */
  User: string = '';
  constructor(private router: Router, private infor: Information) { }
  /**
   * 展開菜單或語系
   * @param _Popup 菜單或語系(Menu, Language)
   */
  Effect(_Popup: string) {
    this[_Popup] = !this[_Popup];
  }
  /**
   * 更改語系
   * @param _Lang 語系
   */
  ChangeLang(_Lang: string) {
    this.infor.lang = _Lang;
  }
  /**
   * 跳轉路由
   * @param _Route 分頁名稱
   */
  childRoute(_Route: string) {
    let route = '/Member/';
    this.router.navigate([route + _Route]);
  }
  /**
   * 登出
   */
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
