import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class Information {
    private Language: string = 'zh-tw';
    filter: boolean = false;
    Message: boolean = false;
    private messItem: any = {};
    private SubMessItem = new BehaviorSubject(this.messItem);
    messItem$: Observable<any> = this.SubMessItem.asObservable();
    Page: string;
    pageLink: Array<string> = ['AboutTop', 'MessTop', 'SerTop', 'ConTop'];
    bodyWidth: number = document.body.clientWidth;
    constructor(private router: Router) {
        this.router.events.subscribe(el => {
            if (el instanceof NavigationEnd) {
                console.clear();
                this.Page = el['url'];
                console.log(this.Page);
            }
        })
    }
    changeItem(_Item: any) {
        this.messItem = _Item;
        this.SubMessItem.next(this.messItem);
    }
    get lang(): string {
        return this.Language;
    }
    set lang(lang: string) {
        this.Language = lang;
    }
}
