import {CastMember} from './CastMember';
import {CrewMember} from './CrewMember';

export interface Movie {
  id: number;
  original_title: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

export interface DetailedMovie extends Movie {
  cast: CastMember[];
  crew: CrewMember[];
}
