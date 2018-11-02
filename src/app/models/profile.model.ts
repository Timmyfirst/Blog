import { Right } from './right.model';

export class Profile {
  constructor(
    public profileId: number,
    public profileName: string,
    public rights: Right[]
  ) {}
}
