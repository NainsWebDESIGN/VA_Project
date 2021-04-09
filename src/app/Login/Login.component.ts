import { Component, OnInit } from '@angular/core';

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
  constructor() { }
  Login(_Need: number) {
  }
  toggleForm() {
    this.changeSign = !this.changeSign;
  }
  ngOnInit() {


  }

}
