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

  constructor(
    private ls:LearningofferService,
    private route:ActivatedRoute,
    private router:Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit():void {
    const params = this.route.snapshot.params;
    this.ls.getSingle(params["id"])
      .subscribe(result => this.offer = result);
  }

  removeOffer() {
    if(confirm("Das Lernangebot von "+this.offer.owner.firstname+" "+this.offer.owner.lastname+" wirklich löschen?")) {
      this.ls.remove(this.offer.id)
        .subscribe(result => this.router.navigate(['../../home'],{relativeTo: this.route}));
    }
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }
}
