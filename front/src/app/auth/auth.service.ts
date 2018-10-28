import { Injectable } from '@angular/core';
import { UserService } from '../api/services';
import { UserCredentialsDto, TokenResponseDto, User } from '../api/models';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StrictHttpResponse } from '../api/strict-http-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token') || null;
  }

  login(credentials: UserCredentialsDto) {
    this.userService.postApiUserLogin({
      email: credentials.email, password: credentials.password
    }).subscribe((response: TokenResponseDto) => {
      this.setToken(response.token);
      this.router.navigate(['/dashboard']);
    }, (error: Error) => {
      // TODO: show snack
    });
  }

  logout() {
    localStorage.removeItem('token');
  }

  getCurrentUser(): Observable<User> {
    return this.userService.getApiUserMe();
  }

}
