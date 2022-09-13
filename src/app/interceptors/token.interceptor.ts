import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginService } from '../services/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.loginService.isLoggedIn) return next.handle(request);

    const newHeader = new HttpHeaders({
      AUTHOR_ID: `${environment.authorId}`,
    });

    const modifiedRequest = request.clone({
      headers: newHeader,
    });
    return next.handle(modifiedRequest);
  }
}
