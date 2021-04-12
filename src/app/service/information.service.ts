import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class Information {
    filter: boolean = false;
    Message: boolean = false;
    private messItem: any = {};
    private SubMessItem = new BehaviorSubject(this.messItem);
    messItem$ = this.SubMessItem.asObservable();
    Page: string;
    pageLink: Array<string> = ['AboutTop', 'MessTop', 'SerTop', 'ConTop'];
    bodyWidth: number = document.body.clientWidth;
    constructor(private router: Router) {
        this.router.events.subscribe(el => {
            if (el instanceof NavigationEnd) {
                this.Page = el['url'];
                console.log(this.Page);
            }
        })
    }
    changeItem(_Item: any) {
        this.messItem = _Item;
        this.SubMessItem.next(this.messItem);
    }
}
