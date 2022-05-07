export class User {
  constructor(
    public firstname:string,
    public lastname:string,
    public email:string,
    public is_learner:boolean,
    public telephone?:number,
    public imagepath?:string,
    public user_semester?:number
  ) {}
}
