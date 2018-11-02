import { Profile } from './profile.model';

export class User {
  constructor(
    public uid: string,
    public displayName: string,
    public password: string,
    public email: string,
    public emailVerified: boolean,
    public photoURL: string,
    public profile: Profile
  ) {}
}
