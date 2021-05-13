import { Component, OnInit } from '@angular/core';
import { ApiService } from '@service/api.service';
import { Information } from '@service/information.service';
import { AboutForm, ServiceForm } from '@ts/interface';

@Component({
  selector: 'loginabout',
  templateUrl: './loginAbout.html',
  styleUrls: ['./loginchild.component.css']
})
export class LoginAbout implements OnInit {
  /** data存放原始資料 */
  data: Array<any> = [];
  /** HTML 的 ngModel */
  formData: AboutForm = {
    Team: { page: 'aboutTeam', name: '', type: '', pic: '', content: '', original: '' },
    Place: { page: 'aboutPlace', name: '', style: '', content: '', original: '' }
  };
  /** 點擊狀態 */
  check: any = {
    Team: [],
    Place: []
  };
  /** 修正選項的選擇欄 */
  change: boolean = false;
  /** Observable 要處理的事情 */
  private req = {
    next: el => this.getData(),
    error: err => console.log(err)
  }
  constructor(private api: ApiService, public infor: Information) { }
  /** 點擊後更改check內布林值 */
  Check(_Position: number, _Item: string) {
    this.check[_Item][_Position] = !this.check[_Item][_Position];
  }
  /** 展開update選項 */
  dropMenu() {
    this.change = !this.change;
  }
  /**
   * 傳送要更改哪組項目(避免單一判斷會影響更改)
   * @param _Obj 哪一組需求
   * @param _Ori 原始資料的位置
   * @param _Item 原始資料位置裡的哪一組
   */
  upDate(_Obj: string, _Ori: number, _Item: number) {
    this.formData[_Obj].original = this.data[_Ori][_Item]["name"];
    this.Submit("Update", _Obj);
  }
  /**
   * 發送資料給後端做新增或更改
   * @param _Need 要做的事件名稱
   * @param _Item 變數內對應的位置
   */
  Submit(_Need: string, _Item: string) {
    let data = this.formData[_Item];
    data.getway = _Need;
    switch (_Need) {
      case 'Add':
        return this.api.postApi("INSERT", data).subscribe(this.req);
      case 'Update':
        return this.api.postApi("UPDATE", data).subscribe(this.req);
    }
  }
  /**
   * 勾選刪除的狀態
   * @param _Item 刪除的大項目名稱
   * @param _Data 勾選的小項目位置
   */
  Delete(_Item: string, _Data: number) {
    let data = [];
    for (let i = 0; i < this.check[_Item].length; i++) {
      if (!this.check[_Item][i]) { data.push(this.data[_Data][i].name); }
    }
    let req = { page: 'about' + _Item, delete: data };
    this.api.postApi("DELETE", req).subscribe(this.req);
  }
  getData() {
    this.api.postApi('about').subscribe((el: Array<any>) => {
      this.data = el;
      this.data[0].forEach(el => { this.check['Team'].push(true); });
      this.data[2].forEach(el => { this.check['Place'].push(true); });
    })
  }
  ngOnInit() {
    this.getData();
  }

}

@Component({
  selector: 'loginMessage',
  templateUrl: './loginMessage.html',
  styleUrls: ['./loginchild.component.css']
})
export class LoginMessage implements OnInit {
  /** data存放原始資料 */
  data: Array<any> = [];
  /** check存放勾選樣式 */
  check: Array<boolean> = [];
  constructor(private api: ApiService, public infor: Information) { }
  /**
   * 寬度設置
   * @param _Position 第幾組項目
   */
  Content(_Position: number) {
    if (_Position == 8) { return '100%'; }
    else { return; }
  }
  /**
   * 更改勾選樣式
   * @param _Position 第幾個位置
   */
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
  selector: 'loginContact',
  templateUrl: './loginContact.html',
  styleUrls: ['./loginchild.component.css']
})
export class LoginContact implements OnInit {
  /** data存放原始資料 */
  data: Array<any> = [];
  /** check存放勾選樣式 */
  check: Array<boolean> = [];
  constructor(private api: ApiService, public infor: Information) { }
  /**
   * 更改勾選樣式
   * @param _Position 第幾個位置
   */
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

@Component({
  selector: 'loginService',
  templateUrl: './loginService.html',
  styleUrls: ['./loginchild.component.css']
})
export class LoginService implements OnInit {
  /** data存放原始資料 */
  data: Array<any> = [];
  /** check存放各大項目樣式 */
  check: ServiceForm = {
    Do: [],
    Skill: [],
    Labor: [],
    Portofio: [],
    month: [],
    year: []
  }
  constructor(private api: ApiService, public infor: Information) { }
  /**
   * 寬度設置
   * @param _Position 第幾組小項目
   * @param _Item 哪一個大項目
   */
  Content(_Position: number, _Item: string) {
    switch (_Item) {
      case 'Do':
        return _Position == 2 ? '100%' : '';
      case 'Po':
        return _Position == 3 ? '100%' : '';
    }
  }
  /**
   * 更改勾選樣式
   * @param _Position 第幾個位置
   */
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