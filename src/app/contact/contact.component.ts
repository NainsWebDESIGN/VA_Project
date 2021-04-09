import { Component, OnInit } from '@angular/core';
import { ApiService } from '@service/api.service';
import { Information } from '@service/information.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  name: string;
  email: string;
  message: string;
  constructor(private api: ApiService, private infor: Information) { }
  Test() {
    const data = { "entry.2002706790": this.name, "entry.1995154974": this.email, "entry.2137997242": this.message }
    let Observer = { next: el => { console.log(el.ok); }, error: err => { console.log(err); }, complete: () => { console.log('OK'); } }
    let myreg = /^[^\[\]\(\)\\<>:;,@.]+[^\[\]\(\)\\<>:;,@]*@[a-z0-9A-Z]+(([.]?[a-z0-9A-Z]+)*[-]*)*[.]([a-z0-9A-Z]+[-]*)+$/g; // 信箱驗證格式

    if (this.name.trim() == '' || this.email.trim() == '' || this.message.trim() == '') { alert('請務必填寫完整'); }
    else if (!myreg.test(this.email)) { alert('信箱格式錯誤') }
    else { this.api.postApi('contact', data).subscribe(Observer); }
  }
  copy(_Text: HTMLElement) {
    var TextRange = document.createRange();
    let sel = window.getSelection();
    TextRange.selectNode(_Text);
    sel.removeAllRanges();
    sel.addRange(TextRange);
    document.execCommand("copy");
    alert("已成功複製到剪貼簿");
  }
  ngOnInit() {
    console.log(this.infor.pageLink);
    let link = this.infor.pageLink[3];
    (link == 'ConTop') ? scroll(0, 0) : document.getElementById(link).scrollIntoView({ behavior: 'smooth' });
  }

}
