import { Learningoffer, Subject, User } from "./learningoffer";
import { LearningofferObservable } from "./learningoffer-observable";

export class LearningofferFactory {

  static empty():Learningoffer {
    return new Learningoffer(
      "0",
      new User(1,'', '', '', false),
      new User(1,'', '', '', false),
      new Subject("1", '', '', ''),
      null,
      new Date(),
      '',
      []
    );
  }

  static fromObject(rawOffer:any):LearningofferObservable {
    return new LearningofferObservable(
      rawOffer.id,
      rawOffer.owner_id,
      rawOffer.learner_id,
      rawOffer.subject_id,
      typeof(rawOffer.accepted_at) === "string" ? new Date(rawOffer.accepted_at) : rawOffer.accepted_at,
      typeof(rawOffer.created_at) === "string" ? new Date(rawOffer.created_at) : rawOffer.created_at,
      rawOffer.description,
      rawOffer.meetingdates
    );
  }
}
