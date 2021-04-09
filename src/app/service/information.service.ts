import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable()
export class Information {
    filter: boolean = false;
    Page: string;
    pageLink: Array<string> = ['AboutTop', 'MessTop', 'SerTop', 'ConTop'];
    constructor(private router: Router) {
        this.router.events.subscribe(el => {
            if (el instanceof NavigationEnd) {
                this.Page = el['url'];
                console.log(this.Page);
            }
        })
    }

}
