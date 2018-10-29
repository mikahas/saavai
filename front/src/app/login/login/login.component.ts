import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/api/services';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenResponseDto } from 'src/app/api/models/token-response-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'saa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.checkLogin();
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  checkLogin() {
    console.log('checkLogin');
    if (!!this.authService.isLoggedIn()) {
      console.log('user is logged in');
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    this.authService
      .login(this.loginForm.value)
      .subscribe((authentication: TokenResponseDto) => {
        console.log('login: authentication', authentication);
        this.router.navigate(['/dashboard']);
      });
  }

}
