import {Crew, DetailedMovie, Movie, Video} from '../models';
import {axiosGet} from './api';

const params = {
  api_key: 'e0966f5c25707b5d4f4f5a1670429967',
};

export const composeDetailedMovie = async (movie: Movie) => {
  try {
    const creditsResponse = await axiosGet(
      `/movie/${movie.id}/credits`,
      params,
    );
    const detailsResponse = await axiosGet(`/movie/${movie.id}`, params);
    const videosResponse = await axiosGet(`/movie/${movie.id}/videos`, params);

    const movieCrew: Crew[] = creditsResponse.data.crew;

    const directorsIndex = movieCrew.findIndex(cast => cast.job === 'Director');
    movieCrew.unshift(...movieCrew.splice(directorsIndex, 1));

    const videos: Video[] = videosResponse.data.results;

    const youtubeTrailer = videos.find(video => {
      return (
        video.site === 'YouTube' &&
        video.type === 'Trailer' &&
        video.official == true
      );
    });

    let detailedMovie: DetailedMovie = {
      ...movie,
      backdrop_path: detailsResponse.data.backdrop_path,
      trailer_id: youtubeTrailer?.key,
      runtime: detailsResponse.data.runtime,
      genres: detailsResponse.data.genres,
      cast: creditsResponse.data.cast,
      crew: movieCrew,
    };
    return detailedMovie;
  } catch (e: any) {
    console.log('Failed to fetch movie details.', e.message);
  }
};
