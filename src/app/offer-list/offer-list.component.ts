import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Learningoffer } from "../shared/learningoffer";
import { LearningofferService } from "../shared/learningoffer.service";

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
    private ls:LearningofferService
  ) {}

  ngOnInit():void {
    this.ls.getAll().subscribe(result => this.offers = result);
  }

  showDetails(offer:Learningoffer) {
    this.showDetailsEvent.emit(offer);
  }
}
