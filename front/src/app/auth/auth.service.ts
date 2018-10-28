import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setToken(token: string): void {
    console.log('set token', token);
    localStorage.setItem('token', token);
  }

  getToken() {
    console.log('get token', localStorage.getItem('token'));
    return localStorage.getItem('token') || null;
  }
}
