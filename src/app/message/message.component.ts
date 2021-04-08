import { Component, OnInit } from '@angular/core';
import { ApiService } from '@service/api.service';
import { Information } from '@service/information.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  data: any;
  constructor(private api: ApiService, private infor: Information) { }
  news(_Position: number) {
    return "url(./" + this.data[_Position].small_p + ")";
  }
  openPopup() {
    this.infor.filter = true;
  }
  ngOnInit() {
    this.api.postApi(127).subscribe(el => {
      this.data = el;
    });
  }

}
