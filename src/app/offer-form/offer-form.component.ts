import { Component, OnInit } from '@angular/core';
import { Learningoffer, Subject } from "../shared/learningoffer";
import { LearningofferFactory } from "../shared/learningoffer.factory";
import { LearningofferService } from "../shared/learningoffer.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'kwm-offer-form',
  templateUrl: './offer-form.component.html',
  styles: [
  ]
})
export class OfferFormComponent implements OnInit {

  offer:Learningoffer = LearningofferFactory.empty();
  subjects:Subject[] = [];

  constructor(
    private ls:LearningofferService,
    private route:ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit():void {
    const params = this.route.snapshot.params;
    this.ls.getSingle(params["id"])
      .subscribe(result => this.offer = result);
    this.ls.getAllSubjects()
      .subscribe(result => this.subjects = result);
  }
}
