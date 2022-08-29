import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, RouterStateSnapshot, UrlTree, Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {

  loginUrl = this.router.parseUrl('login');

  constructor(
    private readonly router: Router,
    private readonly toastrService: ToastrService,
    private readonly authService: AuthService
  ) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    const promise = new Promise<boolean | UrlTree>(resolve => {
      this.authService.validate().subscribe(res => {
        if (res) {
          this.authService.user$.next(true);
          resolve(true);
        } else {
          this.authService.user$.next(false);
          this.toastrService.error('You need to be logged for accessing to this resource!');
          resolve(this.loginUrl);
        }
      });
    });
    return promise;
  }
}
