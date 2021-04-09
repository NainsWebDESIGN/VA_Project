import { Component, OnInit } from '@angular/core';
import { ApiService } from '@service/api.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  changeSign = false;
  username: string = '';
  password: string = '';
  signname: string = "";
  signpass: string = "";
  signpass_2: string = "";
  email: string = "";
  constructor(private api: ApiService) { }
  Login(_Need: string) {
    switch (_Need) {
      case 'login':
        let username = this.username.trim();
        let password = this.password.trim();
        if (username == '' || password == '') { return alert("帳號及密碼不得為空"); }
        else if (password.length < 4 || password.length > 12) { return alert('密碼於4-12字之間'); }
        else { return this.api.postApi(1491, { username: this.username, password: this.password }); };
      case 'signup':
        break;
    }
  }
  toggleForm() {
    this.changeSign = !this.changeSign;
  }
  ngOnInit() {


  }

}
