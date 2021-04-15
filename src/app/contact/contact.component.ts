import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from '@service/api.service';
import { Information } from '@service/information.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @HostListener('window:scroll', ['$event'])
  SetWidth(_Event) {
    if (this.data) {
      let finalTop = (el: any) => { return el.getBoundingClientRect().top - window.screen.availHeight; }
      for (let i = 0; i < this.data.length; i++) {
        let itemPlace = document.getElementById('Feeback');
        let placeHeight = itemPlace.clientHeight * 0.49;
        this.Feeback = (finalTop(itemPlace) + placeHeight) < 0 ? true : false;
      }
    }
  }
  data: any = [];
  name: string;
  email: string;
  message: string;
  bodyWidth: boolean = true;
  Scroll_Media: any = [];
  Feeback: boolean = false;
  constructor(private api: ApiService, public infor: Information) { }
  Submit() {
    const data = { "entry.2002706790": this.name, "entry.1995154974": this.email, "entry.2137997242": this.message }
    let Observer = {
      next: el => {
        if (el.ok) { alert(el.ok == true ? '建議已送出，我們將盡快與您聯繫!' : "未能成功送出意見"); }
        this.name = "";
        this.email = "";
        this.message = "";
      },
      error: err => { alert("失敗囉!") }, complete: () => { console.log('OK'); }
    }
    let myreg = /^[^\[\]\(\)\\<>:;,@.]+[^\[\]\(\)\\<>:;,@]*@[a-z0-9A-Z]+(([.]?[a-z0-9A-Z]+)*[-]*)*[.]([a-z0-9A-Z]+[-]*)+$/g; // 信箱驗證格式

    if (this.name.trim() == '' || this.email.trim() == '' || this.message.trim() == '') { alert('請務必填寫完整'); }
    else if (!myreg.test(this.email)) { alert('信箱格式錯誤'); }
    else { this.api.postApi('formdata', data).subscribe(Observer); }
  }
  ScrollFunction(_Position: number) {
    return this.Scroll_Media[_Position];
  }
  copy(_Text: string) {
    var TextRange = document.createRange();
    let sel = window.getSelection();
    TextRange.selectNode(document.getElementById(_Text));
    sel.removeAllRanges();
    sel.addRange(TextRange);
    document.execCommand("copy");
    alert("已成功複製到剪貼簿");
  }
  ngOnInit() {
    this.api.postApi('contact').subscribe(el => {
      this.data = el;

      setTimeout(() => {
        this.data.forEach(el => {
          this.Scroll_Media.push(true);
          let link = this.infor.pageLink[3];
          (link == 'ConTop') ? scroll(0, 0) : document.getElementById(link).scrollIntoView({ behavior: 'smooth' });
        });
      }, 500);
    })
    this.bodyWidth = this.infor.bodyWidth < 768 ? false : true;
  }

}
