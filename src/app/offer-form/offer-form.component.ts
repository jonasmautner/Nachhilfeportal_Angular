import { Component, OnInit } from '@angular/core';
import { Learningoffer, Subject } from "../shared/learningoffer";
import { LearningofferFactory } from "../shared/learningoffer.factory";
import { LearningofferService } from "../shared/learningoffer.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'kwm-offer-form',
  templateUrl: './offer-form.component.html',
  styles: [
  ]
})
export class OfferFormComponent implements OnInit {

  offer:Learningoffer = LearningofferFactory.empty();
  subjects:Subject[] = [];
  offerForm:FormGroup;
  meetingdates:FormArray;
  isUpdate:boolean = false;

  constructor(
    private fb:FormBuilder,
    private ls:LearningofferService,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.offerForm = this.fb.group({}); // Objekt
    this.meetingdates = this.fb.array([]); // Array
  }

  ngOnInit():void {
    const params = this.route.snapshot.params;
    this.ls.getAllSubjects()
      .subscribe(result => this.subjects = result);
    const id = params["id"];
    if(id){
      this.isUpdate = true;
      this.ls.getSingle(id)
        .subscribe(result => {
          this.offer = result;
          this.initOffer();
        });
    }
  }

  initOffer() {
    this.buildDatesArray();
    this.offerForm = this.fb.group({
      id: this.offer.id,
      description: this.offer.description
    });
    this.offerForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  buildDatesArray() {
    if(this.offer.meetingdates) {
      this.meetingdates = this.fb.array([]);
      for (let d of this.offer.meetingdates) {
        let fg = this.fb.group({
          id: new FormControl(d.id),
          day: new FormControl(d.day, [Validators.required]),
          from: new FormControl(d.from, [Validators.required]),
          to: new FormControl(d.to, [Validators.required])
        });
        this.meetingdates.push(fg);
      }
    }
  }

  updateErrorMessages() {

  }

  submitForm(){
    this.offerForm.value.meetingdates = this.offerForm.value.meetingdates.filter(
      (meetingdate: {id:string;}) => meetingdate.id // todo ??
    )
    const offer:Learningoffer = LearningofferFactory.fromObject(this.offerForm.value);
    if(this.isUpdate) {
      this.ls.update(offer).subscribe(result => {
        this.router.navigate(['../../home', offer.id], {relativeTo: this.route});
      });
    } else {
      offer.owner = {firstname:"Tom", lastname:"Muster", email:"tom@gmail.com", is_learner:false}; // todo wird noch geändert auf eingeloggten User
      this.ls.create(offer).subscribe(result => {
        this.offer = LearningofferFactory.empty(); // Formular zurücksetzen
        this.offerForm.reset(LearningofferFactory.empty());
        this.router.navigate(['../books'], {relativeTo: this.route});
      });
    }
  }

  addThumbnailControl() {
    this.meetingdates.push(this.fb.group({id:0, day:null, from:null, to:null}));
  }
}
