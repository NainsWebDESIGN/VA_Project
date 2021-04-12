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
  Total: any = [];
  constructor(private api: ApiService, private infor: Information) { }
  news(_Position: number) {
    return "url(./" + this.data[_Position].small_p + ")";
  }
  openPopup(_Item: any) {
    this.infor.filter = true;
    this.infor.changeItem(_Item);
  }
  ngOnInit() {
    this.api.postApi('message').subscribe((el: Array<any>) => {
      let news = 3;
      this.Total = el.reverse();
      for (let i = 0; i < news; i++) { this.data.push(this.Total[i]); };
      let link = this.infor.pageLink[1];
      (link == 'MessTop') ? scroll(0, 0) : document.getElementById(link).scrollIntoView({ behavior: 'smooth' });
    });
  }

}
