import { Component, OnInit } from '@angular/core';
import { ApiService } from '@service/api.service';

@Component({
  selector: 'loginabout',
  templateUrl: './loginAbout.html',
  styleUrls: ['./loginchild.component.css']
})
export class LoginAbout implements OnInit {
  data: Array<any> = [];
  constructor(private api: ApiService) { }
  ngOnInit() {
    this.api.postApi('about').subscribe((el: Array<any>) => {
      this.data = el;
    })
  }

}

@Component({
  selector: 'loginMessage',
  templateUrl: './loginMessage.html',
  styleUrls: ['./loginchild.component.css']
})
export class LoginMessage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'loginService',
  templateUrl: './loginService.html',
  styleUrls: ['./loginchild.component.css']
})
export class LoginService implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'loginContact',
  templateUrl: './loginContact.html',
  styleUrls: ['./loginchild.component.css']
})
export class LoginContact implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}