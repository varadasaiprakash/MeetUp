import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

import { AuthService } from './services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map(user => {

       const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        else {
          alert("sorry, You're not authourized")
          return this.router.createUrlTree(['/register']);

        }

      })
      // ,tap(isAuth => {
      //   if (!isAuth) {
      //     this.router.navigate(['/register']);
      //   }
      // })
    );
  }
}
