import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "./auth/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Apply the headers
    const token = this.authService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
 
    // Also handle errors globally
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
      }
      
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));

  }
}
