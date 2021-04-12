import { Component, OnInit, HostListener } from '@angular/core';
import { Information } from '@service/information.service';
import { ApiService } from '@service/api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  @HostListener('window:scroll', ['$event'])
  SetWidth(_Event) {
    if (this.data[1]) {
      for (let i = 0; i < this.data[1].length; i++) {
        let item = document.getElementById('Scroll_1_line_' + i);
        let itemHeight = item.clientHeight * 0.8;
        let toTop = item.getBoundingClientRect().top - window.screen.availHeight;
        this.scrollBL[i] = (toTop + itemHeight) < 0 ? true : false;
      }
    }
  }
  data: any = [];
  team: boolean;
  scrollBL: any = [];
  constructor(private infor: Information, private api: ApiService) { }
  ScrollBl(_Need: string, _Position: number) {
    switch (_Need) {
      case 'line':
        return this.scrollBL[_Position];
    }
  }
  ngOnInit() {
    this.api.postApi('about').subscribe((el: any) => {
      el.forEach(res => { this.scrollBL.push(false) });
      this.data = el;

      let link = this.infor.pageLink[0];
      (link == 'AboutTop') ? scroll(0, 0) : document.getElementById(link).scrollIntoView({ behavior: 'smooth' });
    })
  }


}
