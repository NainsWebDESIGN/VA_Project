import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, ResponseOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

    constructor(private http: HttpClient, private post: Http, private router: Router) { }
    postApi(_Gatewey: number, ..._Obj: Array<any>) {
        let postData = (el: any) => {
            let keys = Object.keys(el);
            let data = new FormData();
            for (let i = 0; i < keys.length; i++) {
                data.append(keys[i], el[keys[i]]);
            }
            return data;
        }
        switch (_Gatewey) {
            case 113:
                return this.http.get('assets/json/header.json').map(el => { return el; });
            case 127:
                return this.http.get('assets/json/index.json').map(el => { return el; });
            case 131:
                let $obj = postData(_Obj[0]);
                let url = '/forms/u/0/d/e/1FAIpQLSdWJlLDYntz5U423tsDTrXMa4hkfxc7sw3J0-f2f59wbRjaEA/formResponse';
                let headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
                let options = new ResponseOptions({ headers: headers });
                return this.post.post(url, $obj, options).map(el => { return el; });
            case 1491:
                this.http.get('assets/json/member.json').subscribe((el: any) => {
                    let username = el.map(res => { return res.username }).indexOf(_Obj[0].username) !== -1;
                    let password = el.map(res => { return res.password }).indexOf(_Obj[0].password) !== -1;
                    if (username && password) { localStorage.setItem('login', 'OK'); }
                    else { localStorage.removeItem('login'); }
                    return this.router.navigate(['/Member']);
                })
        }
    }
}
