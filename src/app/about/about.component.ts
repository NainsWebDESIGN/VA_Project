import { Component, OnInit, OnDestroy } from '@angular/core';
import { Information } from '@service/information.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  team: boolean;
  constructor(private infor: Information) { }
  ScrollToElemenet($element: string) {
    if ($element == 'team') { scroll(0, 0); }
    else {
      let el = document.getElementById($element);
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
  ngOnInit() {
    this.ScrollToElemenet(this.infor.AboutLink);
  }
  ngOnDestroy() {
    this.infor.AboutLink = 'team';
  }

}
