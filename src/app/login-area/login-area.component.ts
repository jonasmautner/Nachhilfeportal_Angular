import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../shared/authentication.service";
import { LearningofferService } from "../shared/learningoffer.service";
import {Learningoffer, Meetingdate} from "../shared/learningoffer";
import {LearningofferFactory} from "../shared/learningoffer.factory";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'kwm-login-area',
  templateUrl: './login-area.component.html',
  styles: [
  ]
})
export class LoginAreaComponent implements OnInit {

  authenticatedUser:any;
  emptyOffer:Learningoffer = LearningofferFactory.empty();

  constructor(
    public authService:AuthenticationService,
    public ls:LearningofferService,
    private fb:FormBuilder,
  ) {}

  ngOnInit():void {
    let id = this.authService.getCurrentUserId();
    if(id){
      this.ls.getUserById(id).subscribe(result => {
        this.authenticatedUser = result;
      });
    }
    console.log(this.emptyOffer);
    //this.emptyOffer.meetingdates?.push(this.fb.group({id:0, day:null, from:null, to:null}));
    this.emptyOffer.meetingdates?.push(new Meetingdate(0, new Date, new Date, new Date));
  }
}
