import {Meetingdate} from "./meetingdate";

export class LearningofferObservable {
  constructor(
    public id:string,
    public owner_id:number,
    public learner_id:string,
    public subject_id:string,
    public accepted_at:Date|null,
    public created_at:Date,
    public description?:string,
    public meetingdates?:Meetingdate[]
  ) {}
}
