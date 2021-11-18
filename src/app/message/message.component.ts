import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService, Information } from '@service';
import { MessItem } from '@ts/interface';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @HostListener('window:scroll', ['$event'])
  SetWidth(_Event) {
    if (this.Total) {
      let finalTop = (el: any) => { return el.getBoundingClientRect().top - window.screen.availHeight; }
      for (let i = 0; i < this.Total.length; i++) {
        let itemPlace = document.getElementById('Scroll_Total_' + i);
        let placeHeight = itemPlace.clientHeight * 0.2;
        this.Scroll_Total[i] = (finalTop(itemPlace) + placeHeight) < 0 ? true : false;
      }
    }
  }
  data: Array<MessItem> = [];
  Total: Array<MessItem> = [];
  News: boolean = false;
  Scroll_Total: Array<boolean> = [];
  constructor(private api: ApiService, public infor: Information) { }
  news(_Position: number) {
    return "url(./" + this.data[_Position].small_p + ")";
  }
  scrollFunction(_Position: number) {
    return this.Scroll_Total[_Position];
  }
  openPopup(_Item: any) {
    this.infor.filter = true;
    this.infor.changeItem(_Item);
  }
  ngOnInit() {
    this.api.postApi('message').subscribe((el: any) => {
      let news = 3;
      this.Total = el.reverse();
      this.Scroll_Total = this.Total.map(() => false);
      for (let i = 0; i < news; i++) { this.data.push(this.Total[i]); };

      setTimeout(() => {
        this.News = true;
        let link = this.infor.pageLink[1];
        (link == 'MessTop') ? scroll(0, 0) : document.getElementById(link).scrollIntoView({ behavior: 'smooth' });
      }, 500);
    });
  }

}
