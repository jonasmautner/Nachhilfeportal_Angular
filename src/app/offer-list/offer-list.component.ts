import {Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Learningoffer } from "../shared/learningoffer";
import { LearningofferService } from "../shared/learningoffer.service";
import { AuthenticationService } from "../shared/authentication.service";
import {LearningofferObservable} from "../shared/learningoffer-observable";

@Component({
  selector: 'div.LearningOffer_List',
  templateUrl: './offer-list.component.html',
  styles: [
  ]
})

export class OfferListComponent implements OnInit {

  offers:Learningoffer[] = [];
  authenticatedUser:any;
  isUserlist:boolean;

  @Output() showDetailsEvent = new EventEmitter<Learningoffer>();

  constructor(
    private ls:LearningofferService,
    private route:ActivatedRoute,
    private router:Router,
    public authService: AuthenticationService
  ) {
    this.isUserlist = false;
  }

  ngOnInit():void {
    this.ls.getAll().subscribe(result => this.offers = result);
    let id = this.authService.getCurrentUserId();
    if(id){
      this.ls.getUserById(id).subscribe(result => {
        this.authenticatedUser = result;
      });
    }
    for(let i=0; i < this.route.snapshot.url.length; i++){
      if(this.route.snapshot.url[i].path == "area")
        this.isUserlist = true;
    }
  }

  isUserlistFunc():boolean {
    for(let i=0; i < this.route.snapshot.url.length; i++){
      if(this.route.snapshot.url[i].path == "area")
        return true;
    }
    return false;
  }

  showDetails(offer:Learningoffer) {
    this.showDetailsEvent.emit(offer);
  }

  acceptOffer(offer:Learningoffer) {
    this.ls.accept(offer, {"learner_id": this.authenticatedUser.id})
      .subscribe(result => window.location.reload()
    );
  }

  removeOffer(offer:Learningoffer) {
    if(confirm("Das Lernangebot wirklich löschen?")) {
      this.ls.remove(offer.id)
        .subscribe(result => window.location.reload());
    }
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }
}
