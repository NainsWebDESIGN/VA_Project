import { Component, OnInit } from '@angular/core';
import { ApiService } from '@service/api.service';
import { Information } from '@service/information.service';
import { Translate } from '@ts/translation';
import { Member } from '@ts/interface';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  changeSign: boolean = false;
  member: Member = {
    username: '',
    password: ''
  }
  signname: string = "";
  signpass: string = "";
  signpass_2: string = "";
  email: string = "";
  constructor(private api: ApiService, public infor: Information) { }
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
  transLate(_Str: string) {
    return Translate[this.infor.lang][_Str];
  }
  toggleForm() {
    this.changeSign = !this.changeSign;
  }
  ngOnInit() {
  }

}
