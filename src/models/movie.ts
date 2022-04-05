import {Cast, Crew, Genre} from '.';

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
}

export interface DetailedMovie extends Movie {
  backdrop_path: string;
  runtime: number;
  trailer_id?: string;
  cast: Cast[];
  crew: Crew[];
  genres: Genre[];
}
