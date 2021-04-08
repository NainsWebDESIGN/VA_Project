import { Component, OnInit } from '@angular/core';
import { ApiService } from '@service/api.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  data: any;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.postApi(127).subscribe(el => {
      this.data = el;
    });
  }

}
