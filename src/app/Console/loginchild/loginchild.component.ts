import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiService, Information } from '@service';
import { AboutForm, ServiceData, MessForm, ContactForm, ServiceForm } from '@ts/interface';

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
    next: data => {
      // if (data == 'Server Error') {
      //   alert('Server Error');
      // } else {
      this.getData();
      // }
    },
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
    this.change = false;
  }
  /**
   * 發送資料給後端做新增或更改
   * @param _Need 要做的事件名稱
   * @param _Item 變數內對應的位置
   */
  Submit(_Need: string, _Item: string) {
    this.api.postApi(_Need == "Add" ? "INSERT" : "UPDATE", this.formData[_Item])
      .subscribe(this.req);
    Object.keys(this.formData[_Item]).forEach(el => { this.formData[_Item][el] = el == 'page' ? 'about' + _Item : "" });
  }
  /**
   * 勾選刪除的狀態
   * @param _Item 刪除的大項目名稱
   * @param _Data 勾選的小項目位置
   */
  Delete(_Item: string, _Data: number) {
    let Delete = [], check = this.check[_Item];
    check.forEach((value, arr) => {
      if (!value) { Delete.push(this.data[_Data][arr].name); }
    });
    let req = { page: 'about' + _Item, delete: Delete };
    this.api.postApi("DELETE", req).subscribe(this.req);
    check = check.map(el => el = true)
  }
  getData() {
    this.api.postApi('about').subscribe((el: Array<any>) => {
      this.data = el;
      this.data[0].forEach(() => { this.check['Team'].push(true); });
      this.data[2].forEach(() => { this.check['Place'].push(true); });
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
  /** HTML 的 ngModel */
  formData: MessForm = {
    page: "Message",
    original: "",
    type: "網頁",
    date: "",
    big_p: "",
    small_p: "",
    main_p: "",
    text: "Web Design",
    readStyle: "",
    title: "",
    content: ""
  };
  /** 修正選項的選擇欄 */
  change: boolean = false;
  /** Observable 要處理的事情 */
  private req = {
    next: () => { this.getData() },
    error: err => console.log(err)
  }
  constructor(private api: ApiService, public infor: Information, private datePipe: DatePipe) { }
  /**
   * 寬度設置
   * @param _Position 第幾組項目
   */
  Content(_Position: number) {
    if (_Position == 8) { return '100%'; }
    else { return; }
  }
  /** 展開update選項 */
  dropMenu() {
    this.change = !this.change;
  }
  upDate(_Item: number) {
    this.formData.original = this.data[_Item].title;
    this.Submit("Update");
    this.change = false;
  }
  Submit(_Getway: string) {
    let Text = {
      網頁: "Web Design",
      優惠: "Discount",
      系統: "Announcement"
    },
      data = {
        page: "Message",
        type: "網頁",
        text: "Web Design",
      }

    this.formData.text = Text[this.formData.type];
    this.formData.date = this.datePipe.transform(new Date(), "d MMM y");
    this.formData.readStyle = this.data[this.data.length - 1].readStyle == "fill" ? "fill fill-dark" : "fill";
    this.api.postApi(_Getway == "Add" ? "INSERT" : "UPDATE", this.formData).subscribe(this.req);
    Object.keys(this.formData).forEach(el => this.formData[el] = data[el]);
  }
  Delete() {
    let Delete = [];
    this.check.forEach((value, item) => {
      if (!value) { Delete.push(this.data[item].title) }
    })
    let req = { page: this.formData.page, delete: Delete };
    this.api.postApi("DELETE", req).subscribe(this.req);
    this.check = this.check.map(el => el = true);
  }
  /**
   * 更改勾選樣式
   * @param _Position 第幾個位置
   */
  Check(_Position: number) {
    this.check[_Position] = !this.check[_Position];
  }
  getData() {
    this.api.postApi('message').subscribe((el: Array<any>) => {
      this.data = el;
      this.data.forEach(() => { this.check.push(true); });
    })
  }
  ngOnInit() {
    this.getData();
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
  /** HTML 的 ngModel */
  formData: ContactForm = {
    page: "Contact",
    original: "",
    media: "",
    href: "",
    style: ""
  };
  /** 修正選項的選擇欄 */
  change: boolean = false;
  /** Observable 要處理的事情 */
  private req = {
    next: () => { this.getData() },
    error: err => console.log(err)
  }
  constructor(private api: ApiService, public infor: Information) { }
  /**
   * 更改勾選樣式
   * @param _Position 第幾個位置
   */
  Check(_Position: number) {
    this.check[_Position] = !this.check[_Position];
  }
  /** 展開update選項 */
  dropMenu() {
    this.change = !this.change;
  }
  upDate(_Item: number) {
    this.formData.original = this.data[_Item].media;
    this.Submit("Update");
    this.change = false;
  }
  Submit(_Getway: string) {
    this.api.postApi(_Getway == "Add" ? "INSERT" : "UPDATE", this.formData)
      .subscribe(this.req);
    Object.keys(this.formData).forEach(el => { this.formData[el] = el == 'page' ? "Contact" : "" });
  }
  Delete() {
    let Delete = [];
    this.check.forEach((value, item) => {
      if (!value) { Delete.push(this.data[item].media) }
    })
    this.api.postApi("DELETE", { page: this.formData.page, delete: Delete }).subscribe(this.req);
    this.check = this.check.map(el => el = true);
  }
  getData() {
    this.api.postApi('contact').subscribe((el: Array<any>) => {
      this.data = el;
      this.data.forEach(() => { this.check.push(true); });
    })
  }
  ngOnInit() {
    this.getData();
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
  check: ServiceData = {
    Do: [],
    Left: [],
    Right: [],
    Portofio: [],
    Month: [],
    Year: []
  }
  formData: ServiceForm = {
    Do: { page: "ServiceDo", original: "", title: "", style: "", content: "" },
    Left: { page: "ServiceLeft", original: "", title: "", percentage: 0 },
    Right: { page: "ServiceRight", original: "", title: "", percentage: 0 },
    Portofio: { page: "ServicePortofio", original: "", title: "", type: "", image: "", content: "" },
    Month: { page: "ServiceMonth", original: "", type: "", title: "", price: "", content: [] },
    Year: { page: "ServiceYear", original: "", type: "", title: "", price: "", content: [] }
  }
  /** 修正選項的選擇欄 */
  change: boolean = false;
  /** Observable 要處理的事情 */
  private req = {
    next: () => { this.getData() },
    error: err => console.log(err)
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
    let po = el => { return _Obj == el; };
    this.formData[_Obj].original = po("Left") ? this.data[1].left[_Item]["title"]
      : po("Right") ? this.data[1].right[_Item]["title"]
        : po("Month") ? this.data[3].month[_Item]["title"]
          : po("Year") ? this.data[3].year[_Item]["title"]
            : this.data[_Ori][_Item]["title"];
    this.Submit("Update", _Obj);
    this.change = false;
  }
  /**
   * 發送資料給後端做新增或更改
   * @param _Need 要做的事件名稱
   * @param _Item 變數內對應的位置
   */
  Submit(_Need: string, _Item: string) {
    let form = this.formData[_Item], data = item => { return _Item == item; };
    this.api.postApi(_Need == "Add" ? "INSERT" : "UPDATE", form)
      .subscribe(this.req);
    Object.keys(form).forEach((el, arr) => {
      form[el] = (data('Left') || data('Right')) ?
        (arr == 3 ? 0 : "") : (data('Month') || data('Year')) ?
          (arr == 5 ? [] : "") : "";
      form[el].page = 'Service' + _Item;
    })
  }
  /**
   * 勾選刪除的狀態
   * @param _Item 刪除的大項目名稱
   * @param _Data 勾選的小項目位置
   */
  Delete(_Item: string, _Data: number) {
    let Delete = [];
    this.check[_Item].forEach((value, arr) => {
      if (!value) {
        Delete.push(
          _Data == 11 ? this.data[1]["left"][arr].title
            : _Data == 12 ? this.data[1]["right"][arr].title
              : _Data == 31 ? this.data[3]["month"][arr].title
                : _Data == 32 ? this.data[3]["year"][arr].title
                  : this.data[_Data][arr].title
        )
      }
    });
    this.api.postApi("DELETE", { page: 'Service' + _Item, delete: Delete }).subscribe(this.req);
    this.check[_Item] = this.check[_Item].map(el => el = true);
  }
  /**
   * 更改勾選樣式
   * @param _Position 第幾個位置
   */
  Check(_Position: number, _Item: string) {
    this.check[_Item][_Position] = !this.check[_Item][_Position];
  }
  getData() {
    this.api.postApi('service').subscribe((el: Array<any>) => {
      this.data = el;
      this.data[0].forEach(() => { this.check.Do.push(true); });
      this.data[1].left.forEach(() => { this.check.Left.push(true); });
      this.data[1].right.forEach(() => { this.check.Right.push(true); });
      this.data[2].forEach(() => { this.check.Portofio.push(true); });
      this.data[3].month.forEach(() => { this.check.Month.push(true); });
      this.data[3].year.forEach(() => { this.check.Year.push(true); });
    })
  }
  ngOnInit() {
    this.getData();
  }

}