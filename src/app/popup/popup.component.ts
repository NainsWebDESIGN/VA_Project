import { Component, OnInit } from '@angular/core';
import { Information } from '@service/information.service';

@Component({
  selector: 'popup',
  templateUrl: './messagePopup.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor(public infor: Information) { }
  closePopup() {
    this.infor.filter = false;
  }
  ngOnInit() {
  }

}
