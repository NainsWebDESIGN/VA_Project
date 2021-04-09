import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let local = localStorage.getItem('login');
        if (local) { return true; }
        else {
            alert('請通知管理員並先註冊完成')
            this.router.navigate(['/Login'])
            return false;
        }
    }
}
