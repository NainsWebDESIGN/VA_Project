import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@service/api.service';
import { Information } from '@service/information.service';
import { MessItem } from '@ts/interface';

@Component({
  selector: 'app-Index',
  templateUrl: './Index.component.html',
  styleUrls: ['./Index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {
  @HostListener('window:scroll', ['$event'])
  SetWidth(_Event) {
    if (this.Choice) {
      let finalTop = (el: any) => { return el.getBoundingClientRect().top - window.screen.availHeight; }
      let item = document.getElementById('ChoiecID');
      let placeHeight = item.clientHeight * 0.4;
      this.IndexChoice = (finalTop(item) + placeHeight) < 0 ? true : false;
    }
  }
  /** 裝 banner 資料 */
  data: Array<MessItem> = [];
  /** 控制 banner 第幾個顯示即消失 */
  sliderPage: Array<boolean>;
  /** 左右箭頭 hover 樣式 */
  arrow: boolean = false;
  /** 裝為何選擇我們資料 */
  Choice: Array<any> = [];
  /** 為何選擇我們滾動樣式 */
  IndexChoice: boolean = false;
  /** banner 每五秒下一則 */
  banner: any;
  constructor(private api: ApiService, public infor: Information, private Acrouter: ActivatedRoute) { }
  /**
   * 控制箭頭的 hover
   * @param _Boolin 關閉或開啟的布林
   */
  hoverArrow(_Boolin: boolean) {
    this.arrow = _Boolin;
  }
  /**
   * 處理下一則或上一則的 banner 並重新計算5秒的 setInterval
   * @param _Move 第幾筆資料(要判斷下一筆是哪一個必須知道現在哪一筆)
   * @param dir 下一筆或上一筆(1, -1)
   */
  changePage(_Move: number, dir: number) {
    clearInterval(this.banner);
    let position = (el: number) => {
      switch (el) {
        case 0:
          return (index - 1 < 0) ? 2 : index - 1;
        case 1:
          return (index + 1 > 2) ? 0 : index + 1;
      }
    }
    let main = { rotation: 45, duration: 750, easing: "easeInOutCirc" };
    let back = { rotation: 45, duration: 1850, elasticity: (el, i, l) => { return 200 + i * 200; } };
    let front = { rotation: 45, duration: 2250, elasticity: (el, i, l) => { return 200 + i * 200; } };
    let title = { rotation: 45, duration: 1750, elasticity: (el, i, l) => { return 200 + i * 200; } };
    let index = this.sliderPage.indexOf(true);
    let data = Array.from(document.querySelectorAll('.slider-list__item'));
    anime(
      Object.assign({}, main, {
        targets: data[position(_Move)],
        rotate: [90 * dir + "deg", 0],
        translateX: [90 * dir + "%", 0]
      })
    );
    anime(
      Object.assign({}, back, {
        targets: data[position(_Move)].querySelectorAll('.back__element'),
        rotate: [90 * dir + "deg", 0],
        translateX: [90 * dir + "%", 0]
      })
    );
    anime(
      Object.assign({}, front, {
        targets: data[position(_Move)].querySelectorAll('.front__element'),
        rotate: [90 * dir + "deg", 0],
        translateX: [90 * dir + "%", 0]
      })
    );
    anime(
      Object.assign({}, title, {
        targets: data[position(_Move)].querySelectorAll('.title__element'),
        rotate: [90 * dir + "deg", 0],
        translateX: [90 * dir + "%", 0]
      })
    );
    this.sliderPage[position(_Move)] = true;
    anime(
      Object.assign({}, main, {
        targets: data[index],
        rotate: [0, -90 * dir + "deg"],
        translateX: [0, -100 * dir + "%"],
        complete: anim => { this.sliderPage[index] = false; }
      })
    );
    anime(
      Object.assign({}, back, {
        targets: data[index].querySelectorAll('.back__element'),
        rotate: [0, -90 * dir + "deg"],
        translateX: [0, -100 * dir + "%"]
      })
    );
    anime(
      Object.assign({}, front, {
        targets: data[index].querySelectorAll('.front__element'),
        rotate: [0, -90 * dir + "deg"],
        translateX: [0, -100 * dir + "%"]
      })
    );
    anime(
      Object.assign({}, title, {
        targets: data[index].querySelectorAll('.title__element'),
        rotate: [0, -90 * dir + "deg"],
        translateX: [0, -100 * dir + "%"]
      })
    );
    this.banner = setInterval(() => { this.changePage(1, 1); }, 5000);
  }
  openPopup(_Item: any) {
    this.infor.filter = true;
    this.infor.changeItem(_Item);
  }
  ngOnInit() {
    this.api.postApi('init')
      .subscribe((el: Array<any>) => { this.Choice = el; })
    this.Acrouter.data.subscribe((el: any) => {
      let news = -4;
      for (let i = -1; i > news; i--) { this.data.push(el.data[el.data.length + i]); }
      this.sliderPage = [true, false, false];
    })
    this.banner = setInterval(() => { this.changePage(1, 1); }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.banner);
  }
}
