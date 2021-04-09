import { Component, OnInit } from '@angular/core';
import { Information } from '@service/information.service';

@Component({
  selector: 'app-servicePage',
  templateUrl: './servicePage.component.html',
  styleUrls: ['./servicePage.component.css']
})
export class ServicePageComponent implements OnInit {

  constructor(private infor: Information) { }

  ngOnInit() {
    let link = this.infor.pageLink[0];
    (link == 'SerTop') ? scroll(0, 0) : document.getElementById(link).scrollIntoView({ behavior: 'smooth' });
  }

}
