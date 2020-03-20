import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let email = localStorage.getItem("email");
    let password = localStorage.getItem("password");

    return this.authService.isAuthenticated(email, password).pipe(map(p => {
      if (p.status == true) {
        return true;
      }
      else {
        this.router.navigate(["/login"]);
        return false;
      }
    }))
  }

}
