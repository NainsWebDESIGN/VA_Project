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
      let finalTop = (el: any) => { return el.getBoundingClientRect().top - window.screen.availHeight; }
      for (let i = 0; i < this.data[1].length; i++) {
        let itemLine = document.getElementById('Scroll_line_' + i);
        let lineHeight = itemLine.clientHeight * 0.8;
        this.scrollLineL[i] = (finalTop(itemLine) + lineHeight) < 0 ? true : false;
      }
      for (let i = 0; i < this.data[2].length; i++) {
        let itemPlace = document.getElementById('Scroll_Place_' + i);
        let placeHeight = itemPlace.clientHeight * 0.6;
        this.scrollPlace[i] = (finalTop(itemPlace) + placeHeight) < 0 ? true : false;
      }
    }
  }
  /** data存放資料 */
  data: Array<any> = [];
  /** 團隊介紹樣式 */
  scrollTeam: Array<boolean> = [false, false];
  /** 品牌故事樣式 */
  scrollLineL: Array<boolean> = [];
  /** 相關單位樣式 */
  scrollPlace: Array<boolean> = [];
  constructor(private infor: Information, private api: ApiService) { }
  /**
   * 滾動樣式由監聽完成陣列布林，HTML則透過這個函式完成對應樣式
   * @param _Need HTML DOM位置
   * @param _Position 對應的陣列位置
   */
  ScrollBl(_Need: string, _Position: number) {
    switch (_Need) {
      case 'line':
        return this.scrollLineL[_Position];
      case 'place':
        return this.scrollPlace[_Position];
      case 'team':
        return this.scrollTeam[_Position];
    }
  }
  ngOnInit() {
    this.api.postApi('about').subscribe((el: any) => {
      this.scrollTeam = [];
      el[1].forEach(res => { this.scrollLineL.push(false) });
      el[2].forEach(res => { this.scrollPlace.push(false) });
      this.data = el;
      setTimeout(() => {
        el[0].forEach(res => { this.scrollTeam.push(true) });
        let link = this.infor.pageLink[0];
        (link == 'AboutTop') ? scroll(0, 0) : document.getElementById(link).scrollIntoView({ behavior: 'smooth' });
      }, 500);

    })
  }


}
