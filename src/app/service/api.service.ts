import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

    constructor(private http: HttpClient) { }
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
                let url = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdWJlLDYntz5U423tsDTrXMa4hkfxc7sw3J0-f2f59wbRjaEA/formResponse';
                return this.http.post(url, $obj).map(el => { return el; });
        }
    }
}
