import { Injectable } from '@angular/core';
import { UserService } from '../api/services';
import { TokenResponseDto } from '../api/models/token-response-dto';
import { UserCredentialsDto } from '../api/models/user-credentials-dto';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly userService: UserService,
  ) {}

  setSession(auth: TokenResponseDto): void {
    const expiresAt = moment().add(auth.expiresIn, 'second');
    localStorage.setItem('token', auth.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
}   

  getToken() {
    if (!this.isLoggedIn()) return null;
    return localStorage.getItem('token') || null;
  }

  login(credentials: UserCredentialsDto): Observable<TokenResponseDto> {
    return this.userService.postApiUserLogin(credentials).pipe(
      tap(this.setSession)
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

}
