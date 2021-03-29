import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-Index',
  templateUrl: './Index.component.html',
  styleUrls: ['./Index.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {
  data: any = [];
  constructor() { }
  ngOnInit() {
  }

}
