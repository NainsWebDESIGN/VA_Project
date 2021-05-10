import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, ResponseOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

    constructor(private http: HttpClient, private post: Http, private router: Router) { }
    private formData(obj$: any) {
        let data = new FormData();
        if (obj$) { Object.keys(obj$).forEach(value => { data.append(value, obj$[value]); }) }
        return data;
    }
    postApi(_Gatewey: string, ..._Obj: Array<any>) {
        let data = new FormData();
        let Jurl = 'json/' + _Gatewey + '.json';
        let Purl = 'php/' + _Gatewey + '.php';

        switch (_Gatewey) {
            case 'formdata':
                let $submit = this.formData(_Obj[0]);
                let url = '/forms/u/0/d/e/1FAIpQLSdWJlLDYntz5U423tsDTrXMa4hkfxc7sw3J0-f2f59wbRjaEA/formResponse';
                let headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
                let options = new ResponseOptions({ headers: headers });
                return this.post.post(url, $submit, options).map(el => el);
            case 'member':
                // let $login = this.formData(_Obj[0]);
                // this.http.post(Purl, $login).subscribe((el: any) => {
                //     el.login ? localStorage.setItem('login', _Obj[0].username) : localStorage.removeItem('login');
                //     return this.router.navigate(['/Member']);
                // })
                this.http.get(Jurl).subscribe((el: any) => {
                    let Status = need => { return (el.map(res => { return res[need] }).indexOf(_Obj[0][need]) !== -1); };
                    if (Status("username") && Status("password")) { localStorage.setItem('login', _Obj[0].username); }
                    else { localStorage.removeItem('login'); }
                    return this.router.navigate(['/Member']);
                })
                break;
            // case 'INSERT':
            // case 'UPDATE':
            //     let add = this.formData(_Obj[0]);
            //     return this.http.post(Purl, add).map(el => el);
            default:
                return this.http.get(Jurl).map(el => el);
            // return this.http.post(Purl, data).map(el => el);
        }
    }
}
