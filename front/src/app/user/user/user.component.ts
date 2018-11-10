import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/api/models';
import { UserService } from 'src/app/api/services';

@Component({
  selector: 'saa-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User;
  isLoading: boolean = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { user: User }) => {
      this.user = data.user;
    });
  }

  generateApiKey() {
    this.isLoading = true;
    this.userService
      .postApiUserGenerateApiKey()
      .subscribe((apiKey: string) => {
        this.user.apiKey = apiKey;
        this.isLoading = false;
      });
  }

}
