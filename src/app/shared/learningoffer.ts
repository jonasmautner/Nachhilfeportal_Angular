import { Meetingdate } from "./meetingdate";
export { Meetingdate } from "./meetingdate";
import { Subject } from "./subject";
export { Subject } from "./subject";
import { User } from "./user";
export { User } from "./user";

export class Learningoffer {
  constructor(
    public id:string,
    public owner:User,
    public learner:User,
    public subject:Subject,
    public accepted_at:Date,
    public created_at:Date,
    public description?:string,
    public meetingdates?:Meetingdate[]
  ) {}
}
