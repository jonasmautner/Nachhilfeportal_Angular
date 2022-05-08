import { Learningoffer, Subject, User } from "./learningoffer";

export class LearningofferFactory {

  static empty():Learningoffer {
    return new Learningoffer(
      "0",
      new User('', '', '', false),
      new User('', '', '', false),
      new Subject("1", '', '', ''),
      null,
      new Date(),
      '',
      []
    );
  }

  static fromObject(rawOffer:any):Learningoffer {
    return new Learningoffer(
      rawOffer.id,
      rawOffer.owner,
      rawOffer.learner,
      rawOffer.subject,
      typeof(rawOffer.accepted_at) === "string" ? new Date(rawOffer.accepted_at) : rawOffer.accepted_at,
      typeof(rawOffer.created_at) === "string" ? new Date(rawOffer.created_at) : rawOffer.created_at,
      rawOffer.description,
      rawOffer.meetingdates
    );
  }
}
