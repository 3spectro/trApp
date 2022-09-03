import { ToastrService } from 'ngx-toastr';
import { LoadingBarService } from './../services/loading-bar.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError,  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResponseInterceptorService implements HttpInterceptor {

  constructor(
    private readonly loadingBarService: LoadingBarService,
    private readonly toastrService: ToastrService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      map(res => {
        if (res instanceof HttpResponse) {
          this.loadingBarService.hidde();
          if (res.body?.statusOk) {
            let newRes = res.clone();
            newRes.body.status = res.body.status === res.body.statusOk
            newRes.body.message = res.body.status === res.body.statusOk ? undefined : res.body.message
            newRes.body.value = res.body.value
            return newRes;
          }
        }
        return res;
      }),
        catchError((err) => {
          this.loadingBarService.hidde();
          return this.manejaError(err, next)
        })
    );
  }

  manejaError = (error: any, next: HttpHandler) => {
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 401:
          this.toastrService.error(error.status.toString());
          break;
        case 500:
          this.toastrService.error(error.status.toString());
          break;
        default:
          this.toastrService.error(error.status.toString());
          break;
      }
    }
    return throwError(error);
  }
}
