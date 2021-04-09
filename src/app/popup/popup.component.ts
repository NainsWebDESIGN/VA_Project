import { Component, OnInit } from '@angular/core';
import { Information } from '@service/information.service';
import { ApiService } from '@service/api.service';

@Component({
  selector: 'message_popup',
  templateUrl: './messagePopup.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  data: any = {};
  constructor(public infor: Information, private api: ApiService) { }
  closePopup() {
    this.infor.filter = false;
  }
  ngOnInit() {
    this.api.postApi(127).subscribe(el => {
      this.infor.messItem$.subscribe(arr => {
        this.data = el[arr];
      })
    });
  }

}
