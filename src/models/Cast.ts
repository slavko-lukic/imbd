export interface Cast {
  id: number;
  credit_id: number;
  character: string;
}

export interface MovieCast extends Cast {
  profile_path: string;
  name: string;
}
export interface PersonCast extends Cast {
  poster_path: string;
  title: string;
}
