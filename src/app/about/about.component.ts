import { Component, OnInit } from '@angular/core';
import { Information } from '@service/information.service';
import { ApiService } from '@service/api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  data: any = [];
  team: boolean;
  constructor(private infor: Information, private api: ApiService) { }
  ngOnInit() {
    this.api.postApi('about').subscribe(el => {
      this.data = el;
      let link = this.infor.pageLink[0];
      (link == 'AboutTop') ? scroll(0, 0) : document.getElementById(link).scrollIntoView({ behavior: 'smooth' });
    })
  }

}
