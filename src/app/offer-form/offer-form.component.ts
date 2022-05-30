import {Component, Input, OnInit} from '@angular/core';
import { Learningoffer, Subject } from "../shared/learningoffer";
import { LearningofferFactory } from "../shared/learningoffer.factory";
import { LearningofferService } from "../shared/learningoffer.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../shared/authentication.service";

@Component({
  selector: 'kwm-offer-form',
  templateUrl: './offer-form.component.html',
  styles: [
  ]
})
export class OfferFormComponent implements OnInit {

  offer = LearningofferFactory.empty();
  subjects:Subject[] = [];
  offerForm:FormGroup;
  meetingdates:FormArray;
  isUpdate = false;
  option: any;

  constructor(
    private fb:FormBuilder,
    private ls:LearningofferService,
    private route:ActivatedRoute,
    private router:Router,
    public authService:AuthenticationService,
  ) {
    this.offerForm = this.fb.group({});
    this.meetingdates = this.fb.array([]);
  }

  ngOnInit():void {
    this.ls.getAllSubjects()
      .subscribe(result => this.subjects = result);
    const id = this.route.snapshot.params["id"];
    if(id){
      this.isUpdate = true;
      this.ls.getSingle(id)
        .subscribe(result => {
          this.offer = result;
          this.initOffer();
        });
    }
    this.initOffer();
  }

  initOffer() {
    this.buildDatesArray();
    this.offerForm = this.fb.group({
      id: this.offer.id,
      subject_id: this.offer.subject.id,
      description: this.offer.description,
      meetingdates: this.meetingdates
    });
    console.log(this.offerForm);
    //this.offerForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  buildDatesArray() {
    if(this.offer.meetingdates) {
      this.meetingdates = this.fb.array([]);
      for (let m of this.offer.meetingdates) {
        let sFromHour = m.from.toString().substring(11,13);
        let sFromMin = m.from.toString().substring(13,16);
        let sFrom = sFromHour+sFromMin;
        let sToHour = m.to.toString().substring(11,13);
        let sToMin = m.to.toString().substring(13,16);
        let sTo = sToHour+sToMin;
        let fg = this.fb.group({
          id: new FormControl(m.id),
          day: new FormControl(m.day, [Validators.required]),
          from: new FormControl(sFrom, [Validators.required]),
          to: new FormControl(sTo, [Validators.required])
        });
        this.meetingdates.push(fg);
      }
    }
  }

  submitForm(){
    const offer = LearningofferFactory.fromObject(this.offerForm.value);
    offer.owner_id = this.authService.getCurrentUserId();
    offer.meetingdates = offer.meetingdates?.filter(function(md:any){
      return md.day != null || md.from != null || md.to != null;
    });
    //return null;
    if(this.isUpdate) {
      this.ls.update(offer).subscribe(result => {
        this.router.navigate(['../../../offers', offer.id], {relativeTo: this.route});
      });
    }
    // else {
    //   this.ls.create(offer).subscribe(result => {
    //     this.offer = LearningofferFactory.empty(); // Formular zurücksetzen
    //     this.offerForm.reset(LearningofferFactory.empty());
    //     this.router.navigate(['../books'], {relativeTo: this.route});
    //   });
    // }
  }

  addThumbnailControl() {
    this.meetingdates.push(this.fb.group({id:0, day:null, from:null, to:null}));
  }
}
