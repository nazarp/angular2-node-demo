import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent implements OnInit {
  logged_in: boolean;
  constructor(auth : AuthenticationService) {
    this.logged_in = auth.token ? true : false;
  }

  ngOnInit() {
  }

}
