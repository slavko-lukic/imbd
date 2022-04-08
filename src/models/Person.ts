import {PersonCast, PersonCrew} from '.';

export interface Person {
  biography: string;
  birthday: string;
  id: number;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  cast: PersonCast[];
  crew: PersonCrew[];
}
