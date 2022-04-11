export interface Crew {
  id: number;
  credit_id: number;
  job: string;
}

export interface MovieCrew extends Crew {
  profile_path: string;
  name: string;
}
export interface PersonCrew extends Crew {
  poster_path: string;
  title: string;
}
