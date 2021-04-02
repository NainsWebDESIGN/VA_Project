import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Http, Headers, ResponseOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

    constructor(private http: HttpClient, private post: Http) { }
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
        }
    }
}
