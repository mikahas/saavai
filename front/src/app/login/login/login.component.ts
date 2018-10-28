import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/api/services';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenResponseDto } from 'src/app/api/models';

@Component({
  selector: 'saa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  async onSubmit() {
    console.log('this.loginForm.value', this.loginForm.value);
    const values = this.loginForm.value;
    console.log('email, password', values.email, values.password);
    this.userService.postApiUserLogin({
      email: values.email, password: values.password
    }).subscribe((response: TokenResponseDto) => {
      this.authService.setToken(response.token);
      // TODO: redirect to dashboard
    }, (error: Error) => {
      // TODO: show snack
    });
    
  }

}
