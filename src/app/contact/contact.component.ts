import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService, Information } from '@service';
import { Suggest } from '@ts/interface';
import { Translate } from '@ts/translation';

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
  /** data存放原始資料 */
  data: Array<any> = [];
  /** Suggest為發送意見表單 */
  Suggest: Suggest = {
    "entry.2002706790": '',
    "entry.1995154974": '',
    "entry.2137997242": ''
  }
  /** 依據螢幕寬度切換表單樣式 */
  bodyWidth: boolean = true;
  /** 聯繫方式動畫 */
  Scroll_Media: any = [];
  /** 滾動至建議表單動畫 */
  Feeback: boolean = false;
  constructor(private api: ApiService, public infor: Information) { }
  /** 發送建議 */
  Submit() {
    let name = this.Suggest["entry.2002706790"], email = this.Suggest["entry.1995154974"],
      message = this.Suggest["entry.2137997242"], lang = Translate[this.infor.lang],
      myreg = /^[^\[\]\(\)\\<>:;,@.]+[^\[\]\(\)\\<>:;,@]*@[a-z0-9A-Z]+(([.]?[a-z0-9A-Z]+)*[-]*)*[.]([a-z0-9A-Z]+[-]*)+$/g, // 信箱驗證格式
      Observer = {
        next: el => {
          if (el.ok) { alert(el.ok == true ? lang["建議已送出，我們將盡快與您聯繫!"] : lang["未能成功送出意見"]); }
          name = ""; email = ""; message = "";
        },
        error: err => { alert(err); }, complete: () => { console.log('OK'); }
      };

    if (name.trim() == '' || email.trim() == '' || message.trim() == '') { alert(lang['請務必填寫完整']); }
    else if (!myreg.test(email)) { alert(lang['信箱格式錯誤']); }
    else { this.api.postApi('formdata', this.Suggest).subscribe(Observer); }
  }
  /**
   * 聯繫我們動畫class
   * @param _Position 對應樣式位置
   */
  ScrollFunction(_Position: number) {
    return this.Scroll_Media[_Position];
  }
  /**
   * 一鍵複製
   * @param _Text 需複製的區塊ID
   */
  copy(_Text: string) {
    var TextRange = document.createRange(), sel = window.getSelection(), lang = Translate[this.infor.lang];
    TextRange.selectNode(document.getElementById(_Text));
    sel.removeAllRanges();
    sel.addRange(TextRange);
    document.execCommand("copy");
    alert(lang["已成功複製到剪貼簿"]);
  }
  ngOnInit() {
    this.api.postApi('contact').subscribe((el: any) => {
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
