import { Component } from '@angular/core';
import { AuthenticationService } from "./shared/authentication.service";

@Component({
  selector: 'kwm-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  title = 'KWM-Nachhilfeportal';

  constructor(private authService: AuthenticationService) {}

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  logout() {
    return this.authService.logout();
  }

}
