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
  filterWorks: Array<any> = ["totle", "one", "two", "three"];
  finalWork: Array<string> = ["one", "two", "three"];
  Choice: boolean = false;
  constructor(private infor: Information, private api: ApiService) { }
  Price() {
    this.Choice = !this.Choice;
  }
  filterWork(_Type: string) {
    this.finalWork = [];
    switch (_Type) {
      case 'totle':
        this.finalWork = ["one", "two", "three"];
      default:
        for (let i = 0; i < this.data[2].length; i++) {
          let type = this.data[2][i].type
          if (type == _Type) { this.finalWork.push(type) }
        }
    }
  }
  test() {
    let animate = this.data[1].right;
    for (let i = 0; i < animate.length; i++) {
      $('#circle_' + i).circleProgress({
        value: (Number(animate[i].percentage) / 100),
        size: 72,
        fill: { gradient: ["#667eea"] }
      })
    }
  }
  ngOnInit() {
    this.api.postApi('service').subscribe((el: Array<any>) => {
      this.data = el;

      let link = this.infor.pageLink[2];
      (link == 'SerTop') ? scroll(0, 0) : document.getElementById(link).scrollIntoView({ behavior: 'smooth' });

      this.test();
    })
  }

}
