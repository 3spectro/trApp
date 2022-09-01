import { AuthService } from './../services/auth.service';
import { LoadingBarService } from './../services/loading-bar.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor {

  constructor(
    private readonly loadingBarService: LoadingBarService,
    private readonly authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingBarService.show();
    const authToken = this.authService.user ? this.authService.user.token : '';
    const authReq = req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json,charset=utf-8'
      }
    });
    return next.handle(authReq);
  }
}
