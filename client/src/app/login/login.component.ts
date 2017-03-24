import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { SharedService } from '../services/shared.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private AuthenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    // reset login status
    this.AuthenticationService.logout();
  }

  login() {
    this.loading = true;
    this.AuthenticationService.login(this.model.username, this.model.password)
      .subscribe(result => {
          if (result === true) {
            this.router.navigate(['/']);
          } else {
            this.error = 'Username or password is incorrect';
            this.loading = false;
          }
      });
  }
}
