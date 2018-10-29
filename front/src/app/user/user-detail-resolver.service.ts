import { Injectable } from '@angular/core';
import { User } from 'src/app/api/models';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/api/services';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDetailResolverService implements Resolve<User> {

  constructor(private readonly userService: UserService) { }

  resolve(): Observable<User> | Observable<never> {
    // use take(1) to ensure that the Observable completes after retrieving the first value
    return this.userService.getApiUserMe().pipe(take(1));
  };

}
