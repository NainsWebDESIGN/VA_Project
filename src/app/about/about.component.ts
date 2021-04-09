import { Component, OnInit } from '@angular/core';
import { Information } from '@service/information.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  team: boolean;
  constructor(private infor: Information) { }
  ngOnInit() {
    let link = this.infor.pageLink[0];
    (link == 'AboutTop') ? scroll(0, 0) : document.getElementById(link).scrollIntoView({ behavior: 'smooth' });
  }

}
