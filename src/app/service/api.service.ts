import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Http, Headers, ResponseOptions } from '@angular/http';
import { Local } from '@ts/translation';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class ApiService {

    constructor(
        private http: HttpClient,
        // private post: Http, 
        private router: Router
    ) { }
    private formData(obj$: any) {
        let data = new FormData();
        if (obj$) { Object.keys(obj$).forEach(value => data.append(value, obj$[value])) }
        return data;
    }
    /**
   * 序列化 postServer 請求的 body
   * @param data 序列化值
   */
    private formatPostBody(_data: any) {
        let formatData = '',
            count = 0;
        for (const i in _data) {
            if (_data) {
                if (count === 0) {
                    formatData += i + '=' + _data[i];
                } else {
                    formatData += '&' + i + '=' + _data[i];
                }
                count++;
            }
        }
        return formatData;
    }
    postApi(_Gatewey: string, ..._Obj: Array<any>) {
        let data = new FormData(),
            Jurl = 'json/' + _Gatewey + '.json',
            Purl = 'php/' + _Gatewey + '.php',
            local = location.href.includes(Local);

        switch (_Gatewey) {
            case 'formdata':
                // if (local) {
                // let headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
                // let options = new ResponseOptions({ headers: headers });
                let $submit = this.formData(_Obj[0]),
                    url = '/forms/u/0/d/e/1FAIpQLSdWJlLDYntz5U423tsDTrXMa4hkfxc7sw3J0-f2f59wbRjaEA/formResponse',
                    options = {
                        headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }),
                        observe: 'response' as 'response',
                        responseType: 'text' as 'text'
                    }
                return this.http.post(url, $submit, options).map(el => el);
            // return this.post.post(url, $submit, options).map(el => el);
            // } else {
            //     return Observable.throw('Server Error');
            // }
            case 'member':
                if (local) {
                    let $login = this.formData(_Obj[0]);
                    this.http.post(Purl, $login).subscribe((el: any) => {
                        el.login ? localStorage.setItem('login', _Obj[0].username) : localStorage.removeItem('login');
                        return this.router.navigate(['/Member']);
                    })
                } else {
                    this.http.get(Jurl).subscribe((el: any) => {
                        let Status = need => (el.map(res => res[need]).indexOf(_Obj[0][need]) !== -1);
                        if (Status("username") && Status("password")) { localStorage.setItem('login', _Obj[0].username); }
                        else { localStorage.removeItem('login'); }
                        return this.router.navigate(['/Member']);
                    })
                }
            case 'INSERT':
            case 'UPDATE':
            case 'DELETE':
                // if (local) {
                let add = this.formData(_Obj[0]);
                return this.http.post(Purl, add).map(el => el);
            // } else {
            //     return Observable.throw('Server Error');
            // }
            default:
                if (local) {
                    return this.http.post(Purl, data).map(el => el);
                } else {
                    return this.http.get(Jurl).map(el => el);
                }
        }
    }
}
