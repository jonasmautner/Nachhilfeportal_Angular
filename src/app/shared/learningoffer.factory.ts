import { Learningoffer, Subject, User } from "./learningoffer";

export class LearningofferFactory {

  static empty():Learningoffer {
    return new Learningoffer(
      "0",
      new User('', '', '', false),
      new User('', '', '', false),
      new Subject(1, '', '', ''),
      new Date(),
      new Date(),
      '',
      []
    );
  }

  static fromObject(rawBook:any):Learningoffer {
    return new Learningoffer(
      rawBook.id,
      rawBook.owner,
      rawBook.learner,
      rawBook.subject,
      typeof(rawBook.accepted_at) === "string" ? new Date(rawBook.accepted_at) : rawBook.accepted_at,
      typeof(rawBook.created_at) === "string" ? new Date(rawBook.created_at) : rawBook.created_at,
      rawBook.description,
      rawBook.meetingdates
    );
  }
}
