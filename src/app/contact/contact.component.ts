import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  name: string;
  email: string;
  message: string;
  constructor(private http: HttpClient) { }
  Test() {
    const data = {
      "entry.2002706790": this.name,
      "entry.1995154974": this.email,
      "entry.2137997242": this.message
    }
    let req = new FormData();
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      req.append(keys[i], data[keys[i]]);
    }
    let url = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdWJlLDYntz5U423tsDTrXMa4hkfxc7sw3J0-f2f59wbRjaEA/formResponse';
    this.http.post(url, req).subscribe();
  }
  ngOnInit() {
  }

}
