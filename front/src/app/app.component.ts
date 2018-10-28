import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { User } from './api/models';
import { StrictHttpResponse } from './api/strict-http-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  currentUser: User;
  constructor(
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user: User) => {
      console.log('current user', user);
    });
  }
}
