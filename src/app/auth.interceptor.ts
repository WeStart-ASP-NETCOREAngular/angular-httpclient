import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthServiceInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // request.headers.append()

    const modifiedRequest = request.clone({
      headers: new HttpHeaders({ 'AUTH-X': '3i2734069348709t8340923850' }),
    });
    return next.handle(modifiedRequest).pipe(
      tap((data) => {
        console.log('Request is on the way');
        if (data.type == HttpEventType.Sent) {
          console.log(data);
        } else if (data.type == HttpEventType.Response) {
          console.log(data.body);
        }
      })
    );
  }
}
