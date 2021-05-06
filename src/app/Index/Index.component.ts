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
  data: Array<MessItem> = [];
  sliderPage: Array<boolean>;
  arrow: boolean = false;
  Choice: Array<any> = [];
  IndexChoice: boolean = false;
  banner: any;
  constructor(private api: ApiService, public infor: Information, private Acrouter: ActivatedRoute) { }
  openArrow() {
    this.arrow = true;
  }
  closeArrow() {
    this.arrow = false;
  }
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
    this.api.postApi('index')
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
