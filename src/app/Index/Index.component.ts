import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-Index',
  templateUrl: './Index.component.html',
  styleUrls: ['./Index.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {
  sliderPage: number = 0;
  Previous: number;
  data: any = [
    {
      "big_p": "assets/image/html2.png",
      "small_p": "assets/image/htmlimage.png",
      "main_p": "assets/image/htmlfront.png",
      "text": "HTMLWEB",
      "readStyle": "fill",
      "title": "HTML",
      "content": "About Nains' HTML writing ability is very outstanding, he is a very good talent, he is a web designer full of wisdom, technology and beauty."
    },
    {
      "big_p": "assets/image/css2.png",
      "small_p": "assets/image/cssimage.png",
      "main_p": "assets/image/cssfront.png",
      "text": "CSSWEB",
      "readStyle": "fill fill-dark",
      "title": "CSS",
      "content": "About Nains' CSS writing ability is very outstanding, he is a very good talent, he is a web designer full of wisdom, technology and beauty."
    },
    {
      "big_p": "assets/image/js2.png",
      "small_p": "assets/image/jsimage.png",
      "main_p": "assets/image/jsfront.png",
      "text": "Javascript",
      "readStyle": "fill",
      "title": "Javascript",
      "content": "About Nains' Javascript writing ability is very outstanding, he is a very good talent, he is a web designer full of wisdom, technology and beauty."
    }
  ];
  constructor() { }
  slider(_Position: number, _Need: string) {
    switch (_Need) {
      case 'need':
        return _Position == this.sliderPage ? true : false;
      case 'not':
        return _Position == this.Previous ? true : false;
    }
  }
  changePage(_Move: number, dir: number) {
    let main = { rotation: 45, duration: 750, easing: "easeInOutCirc" };
    let back = { rotation: 45, duration: 1850, elasticity: function (el, i, l) { return 200 + i * 200; } };
    let front = { rotation: 45, duration: 2250, elasticity: function (el, i, l) { return 200 + i * 200; } };
    let title = { rotation: 45, duration: 1750, elasticity: function (el, i, l) { return 200 + i * 200; } };
    let nextSlide = '.slider-list__item.slider-list__item_active';
    let prevSlide = '.slider-list__item.slider-list_item_display';
    anime(
      Object.assign({}, main, {
        targets: nextSlide,
        rotate: [90 * dir + "deg", 0],
        translateX: [90 * dir + "%", 0]
      })
    );
    anime(
      Object.assign({}, back, {
        targets: nextSlide + " .back__element",
        rotate: [90 * dir + "deg", 0],
        translateX: [90 * dir + "%", 0]
      })
    );
    anime(
      Object.assign({}, front, {
        targets: nextSlide + " .front__element",
        rotate: [90 * dir + "deg", 0],
        translateX: [90 * dir + "%", 0]
      })
    );
    anime(
      Object.assign({}, title, {
        targets: nextSlide + " .title__element",
        rotate: [90 * dir + "deg", 0],
        translateX: [90 * dir + "%", 0]
      })
    );
    anime(
      Object.assign({}, main, {
        targets: prevSlide,
        rotate: [0, -90 * dir + "deg"],
        translateX: [0, -100 * dir + "%"],
        // complete: anim => {
        // }
      })
    );
    anime(
      Object.assign({}, back, {
        targets: prevSlide + " .back__element",
        rotate: [0, -90 * dir + "deg"],
        translateX: [0, -100 * dir + "%"]
      })
    );
    anime(
      Object.assign({}, front, {
        targets: prevSlide + " .front__element",
        rotate: [0, -90 * dir + "deg"],
        translateX: [0, -100 * dir + "%"]
      })
    );
    anime(
      Object.assign({}, title, {
        targets: prevSlide + " .title__element",
        rotate: [0, -90 * dir + "deg"],
        translateX: [0, -100 * dir + "%"]
      })
    );

    switch (_Move) {
      case 0:
        this.sliderPage = (this.sliderPage - 1 < 0) ? 2 : this.sliderPage - 1;
        this.Previous = this.Previous == undefined ? 0 :
          (this.sliderPage + 1 > 2) ? 0 : this.sliderPage + 1;
        break;
      case 1:
        this.sliderPage = (this.sliderPage + 1 > 2) ? 0 : this.sliderPage + 1;
        this.Previous = this.Previous == undefined ? 0 :
          (this.sliderPage - 1 < 0) ? 2 : this.sliderPage - 1;
        break;
    }
  }
  ngOnInit() {
  }

}
