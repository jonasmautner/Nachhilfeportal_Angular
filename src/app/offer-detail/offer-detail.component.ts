import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { LearningofferFactory } from "../shared/learningoffer.factory";
import { LearningofferService } from "../shared/learningoffer.service";
import { Learningoffer } from "../shared/learningoffer";

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
    private router:Router
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.ls.getSingle(params["id"])
      .subscribe(result => this.offer = result);
  }
}
