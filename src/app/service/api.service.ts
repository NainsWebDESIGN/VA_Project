import { Information } from '@service/information.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, ResponseOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

    constructor(private http: HttpClient, private post: Http, private router: Router, private infor: Information) { }
    postApi(_Gatewey: string, ..._Obj: Array<any>) {
        let data = new FormData();
        let postData = (el: any) => {
            Object.keys(el).forEach(value => { data.append(value, el[value]); })
            return data;
        }
        let Jurl = 'assets/json/' + _Gatewey + '.json';
        let Purl = 'assets/php/' + _Gatewey + '.php';
        switch (_Gatewey) {
            case 'formdata':
                let $submit = postData(_Obj[0]);
                let url = '/forms/u/0/d/e/1FAIpQLSdWJlLDYntz5U423tsDTrXMa4hkfxc7sw3J0-f2f59wbRjaEA/formResponse';
                let headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
                let options = new ResponseOptions({ headers: headers });
                return this.post.post(url, $submit, options).map(el => { return el; });
            case 'member':
                // let $login = postData(_Obj[0]);
                // this.http.post(Purl, $login).subscribe((el: any) => {
                //     if (el.login) { localStorage.setItem('login', _Obj[0].username); }
                //     else { localStorage.removeItem('login'); }
                //     return this.router.navigate(['/Member']);
                // })
                this.http.get(Jurl).subscribe((el: any) => {
                    let username = el.map(res => { return res.username }).indexOf(_Obj[0].username) !== -1;
                    let password = el.map(res => { return res.password }).indexOf(_Obj[0].password) !== -1;
                    if (username && password) { localStorage.setItem('login', _Obj[0].username); }
                    else { localStorage.removeItem('login'); }
                    return this.router.navigate(['/Member']);
                })
            // case 'header':
            // case 'index':
            // case 'contact':
            // case 'about':
            // case 'message':
            //     return this.http.post(Purl, data).map(el => { return el; });
            default:
                return this.http.get(Jurl).map(el => { return el; });
        }
    }
}
