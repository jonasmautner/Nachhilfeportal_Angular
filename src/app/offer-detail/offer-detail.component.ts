import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { LearningofferFactory } from "../shared/learningoffer.factory";
import { LearningofferService } from "../shared/learningoffer.service";
import { Learningoffer } from "../shared/learningoffer";
import { DatePipe } from "@angular/common";
import { AuthenticationService } from "../shared/authentication.service";

@Component({
  selector: 'kwm-offer-detail',
  templateUrl: './offer-detail.component.html',
  styles: [
  ]
})

export class OfferDetailComponent implements OnInit {

  offer:Learningoffer = LearningofferFactory.empty();
  authenticatedUser:any;

  constructor(
    private ls:LearningofferService,
    private route:ActivatedRoute,
    private router:Router,
    public authService: AuthenticationService
  ) {}

  ngOnInit():void {
    const params = this.route.snapshot.params;
    this.ls.getSingle(params["id"])
      .subscribe(result => this.offer = result);
    let id = this.authService.getCurrentUserId();
    if(id){
      this.ls.getUserById(id).subscribe(result => {
        this.authenticatedUser = result;
      });
    }
  }

  acceptOffer(offer:Learningoffer) {
    this.ls.accept(offer, {"learner_id": this.authenticatedUser.id})
      .subscribe(result => window.location.reload()
      );
  }

  removeOffer() {
    if(confirm("Das Lernangebot wirklich löschen?")) {
      this.ls.remove(this.offer.id)
        .subscribe(result => this.router.navigate(['../../home'],{relativeTo: this.route}));
    }
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }
}
