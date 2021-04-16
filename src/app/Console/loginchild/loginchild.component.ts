import { Component, OnInit } from '@angular/core';
import { ApiService } from '@service/api.service';

@Component({
  selector: 'loginabout',
  templateUrl: './loginAbout.html',
  styleUrls: ['./loginchild.component.css']
})
export class LoginAbout implements OnInit {
  data: Array<any> = [];
  check: any = {
    Team: [],
    Place: []
  }
  constructor(private api: ApiService) { }
  Check(_Position: number, _Item: string) {
    this.check[_Item][_Position] = !this.check[_Item][_Position];
  }
  ngOnInit() {
    this.api.postApi('about').subscribe((el: Array<any>) => {
      this.data = el;
      this.data[0].forEach(el => { this.check['Team'].push(true); });
      this.data[2].forEach(el => { this.check['Place'].push(true); });
    })
  }

}

@Component({
  selector: 'loginMessage',
  templateUrl: './loginMessage.html',
  styleUrls: ['./loginchild.component.css']
})
export class LoginMessage implements OnInit {
  data: any = [];
  check: Array<boolean> = [];
  constructor(private api: ApiService) { }
  Content(_Position: number) {
    if (_Position == 8) { return '100%'; }
    else { return; }
  }
  Check(_Position: number) {
    this.check[_Position] = !this.check[_Position];
  }
  ngOnInit() {
    this.api.postApi('message').subscribe((el: Array<any>) => {
      this.data = el;
      this.data.forEach(el => { this.check.push(true); });
    })
  }

}

@Component({
  selector: 'loginService',
  templateUrl: './loginService.html',
  styleUrls: ['./loginchild.component.css']
})
export class LoginService implements OnInit {
  data: any = [];
  check: any = {
    Do: [],
    Skill: [],
    Labor: [],
    Portofio: [],
    month: [],
    year: []
  }
  constructor(private api: ApiService) { }
  Content(_Position: number, _Item: string) {
    switch (_Item) {
      case 'Do':
        return _Position == 2 ? '100%' : '';
      case 'Po':
        return _Position == 3 ? '100%' : '';
    }
  }
  Check(_Position: number, _Item: string) {
    this.check[_Item][_Position] = !this.check[_Item][_Position];
  }
  ngOnInit() {
    this.api.postApi('service').subscribe((el: Array<any>) => {
      this.data = el;
      this.data[0].forEach(el => { this.check.Do.push(true); });
      this.data[1].left.forEach(el => { this.check.Skill.push(true); });
      this.data[1].right.forEach(el => { this.check.Labor.push(true); });
      this.data[2].forEach(el => { this.check.Portofio.push(true); });
      this.data[3].month.forEach(el => { this.check.month.push(true); });
      this.data[3].year.forEach(el => { this.check.year.push(true); });
    })
  }

}

@Component({
  selector: 'loginContact',
  templateUrl: './loginContact.html',
  styleUrls: ['./loginchild.component.css']
})
export class LoginContact implements OnInit {
  data: any = [];
  check: Array<boolean> = [];
  constructor(private api: ApiService) { }
  Check(_Position: number) {
    this.check[_Position] = !this.check[_Position];
  }
  ngOnInit() {
    this.api.postApi('contact').subscribe((el: Array<any>) => {
      this.data = el;
      this.data.forEach(el => { this.check.push(true); });
    })
  }

}