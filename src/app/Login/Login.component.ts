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
  Login(_Need: number) {
    switch (_Need) {
      case 113:
        const req = { username: this.username, password: this.password };
        this.api.postApi(1491, req);
    }
  }
  toggleForm() {
    this.changeSign = !this.changeSign;
  }
  ngOnInit() {


  }

}
