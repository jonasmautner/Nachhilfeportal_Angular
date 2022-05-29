import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../shared/authentication.service";
import { LearningofferService } from "../shared/learningoffer.service";
import {User} from "../shared/user";

@Component({
  selector: 'kwm-login-area',
  templateUrl: './login-area.component.html',
  styles: [
  ]
})
export class LoginAreaComponent implements OnInit {

  authenticatedUser:any;

  constructor(
    private authService:AuthenticationService,
    private ls:LearningofferService
  ) {}

  ngOnInit():void {
    let id = this.authService.getCurrentUserId();
    this.ls.getUserById(id).subscribe(result => {
      this.authenticatedUser = result;
    });
  }
}
