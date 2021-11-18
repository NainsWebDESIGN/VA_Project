import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiService } from '@service';

@Injectable()
export class Preload implements Resolve<any> {

    constructor(private api: ApiService) { }
    resolve() {
        return this.api.postApi('message');
    }
}
