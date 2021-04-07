import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable()
export class Information {
    Page: string;
    AboutLink: string = 'team';
    constructor(private router: Router) {
        this.router.events.subscribe(el => {
            if (el instanceof NavigationEnd) {
                console.log(el['url']);
                this.Page = el['url']
            }
        })
    }

}
