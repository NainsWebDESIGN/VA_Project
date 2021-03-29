import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class InformationService {
    Menu: boolean = false;
    private SubMenu = new BehaviorSubject(this.Menu);
    Menu$ = this.SubMenu.asObservable();
    constructor() { }
    MenuEffect(_Effect) {
        this.Menu = _Effect;
        this.SubMenu.next(this.Menu)
    }
}
