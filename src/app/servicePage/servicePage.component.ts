import { Component, OnInit } from '@angular/core';
import { Information } from '@service/information.service';
import { ApiService } from '@service/api.service';

@Component({
  selector: 'app-servicePage',
  templateUrl: './servicePage.component.html',
  styleUrls: ['./servicePage.component.css']
})
export class ServicePageComponent implements OnInit {
  data: Array<any> = [];
  constructor(private infor: Information, private api: ApiService) { }
  test() {
    let animate = this.data[1].right;
    for (let i = 0; i < animate.length; i++) {
      $('#circle_' + i).circleProgress({
        value: (Number(animate[i].percentage) / 100),
        size: 72,
        fill: { gradient: ["#3bb78f", "#0bab64"] }
      })
    }
  }
  ngOnInit() {
    this.api.postApi('service').subscribe((el: Array<any>) => {
      this.data = el;

      let link = this.infor.pageLink[2];
      (link == 'SerTop') ? scroll(0, 0) : document.getElementById(link).scrollIntoView({ behavior: 'smooth' });

    })
  }

}
