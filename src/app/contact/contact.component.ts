import { Component, OnInit } from '@angular/core';
import { ApiService } from '@service/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  name: string;
  email: string;
  message: string;
  constructor(private api: ApiService) { }
  Test() {
    const data = { "entry.2002706790": this.name, "entry.1995154974": this.email, "entry.2137997242": this.message }
    let Observer = { next: el => { console.log(el.ok); }, error: err => { console.log(err); }, complete: () => { console.log('OK'); } }
    let myreg = /^[^\[\]\(\)\\<>:;,@.]+[^\[\]\(\)\\<>:;,@]*@[a-z0-9A-Z]+(([.]?[a-z0-9A-Z]+)*[-]*)*[.]([a-z0-9A-Z]+[-]*)+$/g; // 信箱驗證格式

    if (this.name.trim() == '' || this.email.trim() == '' || this.message.trim() == '') { alert('請務必填寫完整'); }
    else if (!myreg.test(this.email)) { alert('信箱格式錯誤') }
    else { this.api.postApi(131, data).subscribe(Observer); }
  }
  copy() {

  }
  ngOnInit() {
    scroll(0, 0);
  }

}
