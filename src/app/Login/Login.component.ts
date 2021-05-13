import { Component, OnInit } from '@angular/core';
import { ApiService } from '@service/api.service';
import { Information } from '@service/information.service';
import { Translate } from '@ts/translation';
import { Member, SignUp } from '@ts/interface';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  /** 登入或註冊頁面切換 */
  changeSign: boolean = false;
  /** 會員帳號及密碼 */
  member: Member = {
    username: '',
    password: ''
  }
  /** 註冊帳號信箱密碼 */
  SignUp: SignUp = {
    signname: "",
    signpass: "",
    signpass_2: "",
    email: ""
  }
  constructor(private api: ApiService, public infor: Information) { }
  /**
   * 處理登入或註冊
   * @param _Need 判斷登入或註冊
   */
  Login(_Need: string) {
    localStorage.removeItem('login')
    switch (_Need) {
      case 'login':
        let username = this.member.username.trim();
        let password = this.member.password.trim();
        if (username == '' || password == '') { return alert("帳號及密碼不得為空"); }
        else if (password.length < 4 || password.length > 12) { return alert('密碼於4-12字之間'); }
        else { return this.api.postApi('member', this.member); };
      case 'signup':
        break;
    }
  }
  /**
   * 處理 input 語系
   * @param _Str input 內的字串
   */
  transLate(_Str: string) {
    return Translate[this.infor.lang][_Str];
  }
  /** 處理登入或註冊轉換樣式 */
  toggleForm() {
    this.changeSign = !this.changeSign;
  }
  ngOnInit() {
  }

}
