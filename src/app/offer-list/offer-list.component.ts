import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Learningoffer } from "../shared/learningoffer";
import { LearningofferService } from "../shared/learningoffer.service";
import { AuthenticationService } from "../shared/authentication.service";

@Component({
  selector: 'div.LearningOffer_List',
  templateUrl: './offer-list.component.html',
  styles: [
  ]
})

export class OfferListComponent implements OnInit {

  offers:Learningoffer[] = [];

  @Output() showDetailsEvent = new EventEmitter<Learningoffer>();

  constructor(
    private ls:LearningofferService,
    private route:ActivatedRoute,
    private router:Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit():void {
    this.ls.getAll().subscribe(result => this.offers = result);
  }

  showDetails(offer:Learningoffer) {
    this.showDetailsEvent.emit(offer);
  }

  removeOffer(offer:Learningoffer) {
    if(confirm("Das Lernangebot von "+offer.owner.firstname+" "+offer.owner.lastname+" wirklich löschen?")) {
      this.ls.remove(offer.id)
        .subscribe(result => window.location.reload());
    }
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }
}
