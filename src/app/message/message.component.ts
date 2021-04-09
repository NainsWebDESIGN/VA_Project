import { Component, OnInit } from '@angular/core';
import { ApiService } from '@service/api.service';
import { Information } from '@service/information.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  data: any = [];
  constructor(private api: ApiService, private infor: Information) { }
  news(_Position: number) {
    return "url(./" + this.data[_Position].small_p + ")";
  }
  openPopup(_Item: number) {
    this.infor.filter = true;
    this.infor.changeItem(_Item);
  }
  ngOnInit() {
    this.api.postApi('message').subscribe(el => {
      this.data = el;
      let link = this.infor.pageLink[1];
      (link == 'MessTop') ? scroll(0, 0) : document.getElementById(link).scrollIntoView({ behavior: 'smooth' });
    });
  }

}
