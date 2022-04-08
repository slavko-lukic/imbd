import {DetailedMovie, MovieCrew, Video} from '../models';
import {axiosGet} from './api';

const params = {
  api_key: 'e0966f5c25707b5d4f4f5a1670429967',
};

export const composeDetailedMovie = async (movieId: number) => {
  try {
    const creditsResponse = await axiosGet(`/movie/${movieId}/credits`, params);
    const detailsResponse = await axiosGet(`/movie/${movieId}`, params);
    const videosResponse = await axiosGet(`/movie/${movieId}/videos`, params);

    const movieCrew: MovieCrew[] = creditsResponse.data.crew;

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
      id: detailsResponse.data.id,
      title: detailsResponse.data.title,
      release_date: detailsResponse.data.release_date,
      overview: detailsResponse.data.overview,
      poster_path: detailsResponse.data.poster_path,
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
