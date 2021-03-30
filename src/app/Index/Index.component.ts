import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { InformationService } from '@service/Information.service';

@Component({
  selector: 'app-Index',
  templateUrl: './Index.component.html',
  styleUrls: ['./Index.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {
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
  constructor(private menu: InformationService) { }
  ngOnInit() {
  }

}
