import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService, Information } from '@service';

@Component({
  selector: 'app-servicePage',
  templateUrl: './servicePage.component.html',
  styleUrls: ['./servicePage.component.css']
})
export class ServicePageComponent implements OnInit {
  @HostListener('window:scroll', ['$event'])
  SetWidth(_Event) {
    if (this.data[1]) {
      let finalTop = (el: any) => { return el.getBoundingClientRect().top - window.screen.availHeight; };
      let Name = (el: string) => { return document.getElementById(el); };
      let leftHeight = Name('Scroll_skill_left').clientHeight * 0.68;
      let rightHeight = Name('Scroll_skill_right').clientHeight * 0.68;
      let protofioHeight = Name('Scroll_Protofio').clientHeight * 0.13;
      let oneHeight = Name('worksleft').clientHeight;
      let twoHeight = Name('worksbet').clientHeight;
      let threeHeight = Name('worksright').clientHeight;
      this.Scroll_skill.titleLine[0] = (finalTop(Name('worksleft')) + oneHeight) < 0 ? true : false;
      this.Scroll_skill.titleLine[1] = (finalTop(Name('worksbet')) + twoHeight) < 0 ? true : false;
      this.Scroll_skill.titleLine[2] = (finalTop(Name('worksright')) + threeHeight) < 0 ? true : false;
      this.Scroll_Protofio = (finalTop(Name('Scroll_Protofio')) + protofioHeight) < 0 ? true : false;
      this.ScrollSkill('left', (finalTop(Name('Scroll_skill_left')) + leftHeight) < 0 ? 1 : 0)
      this.ScrollSkill('right', (finalTop(Name('Scroll_skill_right')) + rightHeight) < 0 ? 1 : 0)
    }
  }
  data: Array<any> = [];
  filterWorks: Array<any> = [
    { filtername: "全部", filter: "totle" },
    { filtername: "第一種", filter: "one" },
    { filtername: "第二種", filter: "two" },
    { filtername: "第三種", filter: "three" }
  ];
  finalWork: Array<string> = ["one", "two", "three"];
  Choice: boolean = false;
  Scroll_Do: any = [];
  Scroll_Protofio: boolean = false;
  Scroll_skill: any = {
    left: [],
    right: false,
    rightAgain: false,
    titleLine: [false, false, false]
  };
  constructor(public infor: Information, private api: ApiService) { }
  Price(_Boolin: boolean) {
    this.Choice = _Boolin;
  }
  filterStyle(_Type: string) {
    if (_Type == 'totle') { return this.finalWork.length == 3 ? true : false; }
    else { return this.finalWork.indexOf(_Type) !== -1 && this.finalWork.length !== 3 ? true : false; }
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
  Scroll_Effect(_Where: string, _Position: number) {
    switch (_Where) {
      case 'Do':
        return this.Scroll_Do[_Position];
    }
  }
  scrollItem(_Where: string, _Position: number) {
    let Do = 'xl:w-1/3 md:w-1/2 p-4 ';
    switch (_Where) {
      case 'Do':
        return _Position == 0 || _Position == 3 ? Do + 'Do-left'
          : _Position == 1 || _Position == 4 ? Do + 'Do-bet'
            : Do + 'Do-right'
    }
  }
  ScrollSkill(_Position: string, _Num: number) {
    switch (_Position) {
      case 'left':
        this.Scroll_skill.left = [];
        for (let i = 0; i < this.data[1].left.length; i++) {
          if (_Num == 0) { this.Scroll_skill.left.push(0); }
          else { this.Scroll_skill.left.push(this.data[1].left[i].percentage); }
        }
        break;
      case 'right':
        if (_Num == 0) {
          this.Scroll_skill.right = false;
          this.Scroll_skill.rightAgain = false;
        }
        else {
          this.Scroll_skill.right = true;
          if (this.Scroll_skill.right !== this.Scroll_skill.rightAgain) {
            let animate = this.data[1].right;
            for (let i = 0; i < animate.length; i++) {
              $('#circle_' + i).circleProgress({
                value: (Number(animate[i].percentage) / 100),
                size: 72,
                fill: { gradient: ["#b1bae2", "#667eea"] }
              })
            }
            this.Scroll_skill.rightAgain = true;
          }
        }
        break;
    }
  }
  Right_Skill() {

  }
  ngOnInit() {
    this.api.postApi('service').subscribe((el: Array<any>) => {

      el[3].month.forEach(element => {
        for (let i = 0; i < element.content.length; i++) {
          let index = element.content.indexOf('');
          if (index !== -1) { element.content.splice(index, 1); };
        }
      });
      el[3].year.forEach(element => {
        for (let i = 0; i < element.content.length; i++) {
          let index = element.content.indexOf('');
          if (index !== -1) { element.content.splice(index, 1); };
        }
      });
      el[0].forEach(json => { this.Scroll_Do.push(false) });
      if (el[1]) { el[1].left.forEach(json => { this.Scroll_skill.left.push(0) }); }
      this.data = el;
      this.Scroll_Do = [];
      setTimeout(() => {
        this.data[0].forEach(json => { this.Scroll_Do.push(true); });
        let link = this.infor.pageLink[2];
        (link == 'SerTop') ? scroll(0, 0) : document.getElementById(link).scrollIntoView({ behavior: 'smooth' });
      }, 500);

    })
  }

}
