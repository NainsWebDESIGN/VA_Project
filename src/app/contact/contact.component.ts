import { Component, OnInit } from '@angular/core';
import { ApiService } from '@service/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  name: string;
  email: string;
  message: string;
  constructor(private api: ApiService) { }
  Test() {
    const data = {
      "entry.2002706790": this.name,
      "entry.1995154974": this.email,
      "entry.2137997242": this.message
    }
    this.api.postApi(131, data).subscribe(el => {
      console.log(el);
    });
  }
  ngOnInit() {
  }

}
