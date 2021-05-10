import { Component, OnInit } from '@angular/core';
import { Information } from '@service/information.service';
import { ApiService } from '@service/api.service';
import { MessItem } from '@ts/interface';

@Component({
  selector: 'message_popup',
  templateUrl: './messagePopup.html',
  styleUrls: ['./popup.component.css']
})
export class messagePopup implements OnInit {
  data: MessItem;
  Total: Array<any> = [];
  constructor(public infor: Information, private api: ApiService) { }
  closePopup() {
    this.infor.filter = false;
  }
  next() {
    let index = this.Total.map(el => { return el.title + el.content }).indexOf(this.data.title + this.data.content);
    this.data = this.Total[(index >= (this.Total.length - 1)) ? 0 : (index + 1)];
  }
  ngOnInit() {
    this.api.postApi('message')
      .subscribe((el: any) => { this.Total = el.reverse(); })
    this.infor.messItem$
      .subscribe((el: MessItem) => { this.data = el; })
  }

}