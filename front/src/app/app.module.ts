import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider, APP_INITIALIZER, forwardRef } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { ApiConfiguration } from './api/api-configuration';
import { environment } from './../environments/environment';
import { ApiModule } from './api/api.module';
import { ApiInterceptor } from './api.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserModule } from './user/user.module';

export function initApiConfiguration(config: ApiConfiguration): Function {
  return () => {
    config.rootUrl = environment.apiEndpoint;
  };
}

export const INIT_API_CONFIGURATION: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initApiConfiguration,
  deps: [ApiConfiguration],
  multi: true
};

export const API_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: forwardRef(() => ApiInterceptor),
  multi: true
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    DashboardModule,
    UserModule,
    LoginModule,
    ApiModule,

    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,

    AppRoutingModule
  ],
  providers: [
    INIT_API_CONFIGURATION,
    ApiInterceptor,
    API_INTERCEPTOR_PROVIDER,
    AuthService
  ],
  exports: [SharedModule, ApiModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
